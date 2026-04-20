import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Utils } from '../scripts/utilities.js';

// Silence Logging output during tests
vi.mock('../scripts/logging.js', () => ({
    Logging: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// ────────────────────────────────────────────────────────────
// getLinesFromHtml
// ────────────────────────────────────────────────────────────
describe('Utils.getLinesFromHtml', () => {
    it('strips basic HTML tags', () => {
        const result = Utils.getLinesFromHtml('<p>Hello world</p>');
        expect(result).toContain('Hello world');
    });

    it('splits on </p> boundaries', () => {
        const result = Utils.getLinesFromHtml('<p>Line one</p><p>Line two</p>');
        expect(result.length).toBe(2);
        expect(result[0]).toBe('Line one');
        expect(result[1]).toBe('Line two');
    });

    it('strips script tags and their content', () => {
        const result = Utils.getLinesFromHtml('<p>Safe</p><script>evil()</script>');
        const joined = result.join('');
        expect(joined).not.toContain('evil');
        expect(joined).toContain('Safe');
    });

    it('strips style tags and their content', () => {
        const result = Utils.getLinesFromHtml('<p>Text</p><style>body{color:red}</style>');
        const joined = result.join('');
        expect(joined).not.toContain('body');
        expect(joined).toContain('Text');
    });

    it('escapes remaining angle brackets', () => {
        const result = Utils.getLinesFromHtml('<p>a &lt; b</p>');
        expect(result[0]).toContain('&lt;');
    });

    it('filters out empty lines', () => {
        const result = Utils.getLinesFromHtml('<p>Only</p>');
        expect(result.every(l => l.length > 0)).toBe(true);
    });

    it('returns an array', () => {
        expect(Array.isArray(Utils.getLinesFromHtml('<p>x</p>'))).toBe(true);
    });
});

// ────────────────────────────────────────────────────────────
// sanitizeString
// ────────────────────────────────────────────────────────────
describe('Utils.sanitizeString', () => {
    it('keeps alphanumeric characters', () => {
        expect(Utils.sanitizeString('abc123')).toBe('abc123');
    });

    it('keeps allowed special characters', () => {
        expect(Utils.sanitizeString('hello, world.')).toBe('hello, world.');
    });

    it('keeps accented letters', () => {
        expect(Utils.sanitizeString('áéíóúñü')).toBe('áéíóúñü');
    });

    it('removes disallowed characters', () => {
        expect(Utils.sanitizeString('hello!@#$%^&*()')).toBe('hello');
    });

    it('trims leading and trailing whitespace', () => {
        expect(Utils.sanitizeString('  hello  ')).toBe('hello');
    });

    it('returns empty string for all-disallowed input', () => {
        expect(Utils.sanitizeString('!@#$%')).toBe('');
    });
});

// ────────────────────────────────────────────────────────────
// parseLink
// ────────────────────────────────────────────────────────────
describe('Utils.parseLink', () => {
    it('parses a valid @UUID link', () => {
        const result = Utils.parseLink('@UUID[Actor.abc123]{My Item}');
        expect(result).toEqual({
            source: '@UUID[Actor.abc123]{My Item}',
            id: 'Actor.abc123',
            name: 'My Item',
        });
    });

    it('parses a UUID with dots and segments', () => {
        const result = Utils.parseLink('@UUID[Compendium.module.items.Item.xyz789]{Sword}');
        expect(result?.id).toBe('Compendium.module.items.Item.xyz789');
        expect(result?.name).toBe('Sword');
    });

    it('returns null for plain text', () => {
        expect(Utils.parseLink('just plain text')).toBeNull();
    });

    it('returns null for empty string', () => {
        expect(Utils.parseLink('')).toBeNull();
    });

    it('returns null for malformed link (no name)', () => {
        expect(Utils.parseLink('@UUID[Actor.abc123]')).toBeNull();
    });

    it('returns null for malformed link (no UUID)', () => {
        expect(Utils.parseLink('@UUID[]{Name}')).toBeNull();
    });
});

// ────────────────────────────────────────────────────────────
// shouldStackItem
// ────────────────────────────────────────────────────────────
describe('Utils.shouldStackItem', () => {
    const makeItem = (type, subtype = null) => ({
        type,
        system: { subtype },
    });

    it('uses callback when provided and returns its result', () => {
        const item = makeItem('weapon');
        expect(Utils.shouldStackItem(item, [], () => true)).toBe(true);
        expect(Utils.shouldStackItem(item, [], () => false)).toBe(false);
    });

    it('passes the item to the callback', () => {
        const item = makeItem('weapon');
        const cb = vi.fn(() => true);
        Utils.shouldStackItem(item, ['weapon'], cb);
        expect(cb).toHaveBeenCalledWith(item);
    });

    it('matches by type alone when no subtype is registered', () => {
        const item = makeItem('consumable');
        expect(Utils.shouldStackItem(item, ['consumable'], null)).toBe(true);
    });

    it('matching is case-insensitive', () => {
        const item = makeItem('Weapon');
        expect(Utils.shouldStackItem(item, ['weapon'], null)).toBe(true);
    });

    it('returns false when type does not match', () => {
        const item = makeItem('armor');
        expect(Utils.shouldStackItem(item, ['weapon'], null)).toBe(false);
    });

    it('returns true when type and subtype both match', () => {
        const item = makeItem('consumable', 'potion');
        expect(Utils.shouldStackItem(item, ['consumable:potion'], null)).toBe(true);
    });

    it('returns false when subtype is required but does not match', () => {
        const item = makeItem('consumable', 'scroll');
        expect(Utils.shouldStackItem(item, ['consumable:potion'], null)).toBe(false);
    });

    it('returns false when subtype is required but item has none', () => {
        const item = makeItem('consumable', null);
        expect(Utils.shouldStackItem(item, ['consumable:potion'], null)).toBe(false);
    });

    it('returns false for empty types array', () => {
        const item = makeItem('weapon');
        expect(Utils.shouldStackItem(item, [], null)).toBe(false);
    });

    it('checks multiple types and matches the correct one', () => {
        const item = makeItem('armor');
        expect(Utils.shouldStackItem(item, ['weapon', 'armor', 'consumable'], null)).toBe(true);
    });
});

// ────────────────────────────────────────────────────────────
// determineQuantity
// ────────────────────────────────────────────────────────────
describe('Utils.determineQuantity', () => {
    beforeEach(() => {
        // Provide a minimal Roll mock that handles numeric strings
        globalThis.Roll = class {
            constructor(spec) { this._spec = spec; }
            async evaluate() {
                const n = Number(this._spec);
                this.total = isNaN(n) ? null : n;
                if (isNaN(n)) throw new Error('Invalid spec');
            }
        };
    });

    it('returns the numeric value for a plain number string', async () => {
        expect(await Utils.determineQuantity('5')).toBe(5);
    });

    it('returns null for an invalid spec', async () => {
        expect(await Utils.determineQuantity('not-a-roll')).toBeNull();
    });

    it('returns null when Roll throws', async () => {
        globalThis.Roll = class {
            constructor() {}
            async evaluate() { throw new Error('roll failed'); }
        };
        expect(await Utils.determineQuantity('broken')).toBeNull();
    });
});
