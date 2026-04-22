import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Registry } from '../scripts/registry.js';

vi.mock('../scripts/logging.js', () => ({
    Logging: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Reset all static state before each test
beforeEach(() => {
    Registry.directiveHandlers = {};
    Registry.linkEntryHandler = null;
    Registry.textEntryHandler = null;
    Registry.actorTypes = [];
    Registry.stackedItemTypes = [];
    Registry.stackedItemCallback = null;
    Registry.stackedItemQuantityPath = 'system.quantity';
});

// ────────────────────────────────────────────────────────────
// Directive handlers
// ────────────────────────────────────────────────────────────
describe('Registry directive handlers', () => {
    it('registers and retrieves a directive handler', () => {
        const fn = vi.fn();
        Registry.registerDirectiveHandler('gold', fn);
        expect(Registry.getDirectiveHandler('gold')).toBe(fn);
    });

    it('returns undefined for an unregistered directive', () => {
        expect(Registry.getDirectiveHandler('unknown')).toBeUndefined();
    });

    it('overwrites a previously registered handler', () => {
        const fn1 = vi.fn();
        const fn2 = vi.fn();
        Registry.registerDirectiveHandler('gold', fn1);
        Registry.registerDirectiveHandler('gold', fn2);
        expect(Registry.getDirectiveHandler('gold')).toBe(fn2);
    });

    it('registers multiple handlers independently', () => {
        const fnA = vi.fn();
        const fnB = vi.fn();
        Registry.registerDirectiveHandler('gold', fnA);
        Registry.registerDirectiveHandler('xp', fnB);
        expect(Registry.getDirectiveHandler('gold')).toBe(fnA);
        expect(Registry.getDirectiveHandler('xp')).toBe(fnB);
    });
});

// ────────────────────────────────────────────────────────────
// Link and text entry handlers
// ────────────────────────────────────────────────────────────
describe('Registry link/text entry handlers', () => {
    it('registers and retrieves a link entry handler', () => {
        const fn = vi.fn();
        Registry.registerLinkEntryHandler(fn);
        expect(Registry.getLinkEntryHandler()).toBe(fn);
    });

    it('registers and retrieves a text entry handler', () => {
        const fn = vi.fn();
        Registry.registerTextEntryHandler(fn);
        expect(Registry.getTextEntryHandler()).toBe(fn);
    });

    it('link handler starts as null', () => {
        expect(Registry.getLinkEntryHandler()).toBeNull();
    });

    it('text handler starts as null', () => {
        expect(Registry.getTextEntryHandler()).toBeNull();
    });
});

// ────────────────────────────────────────────────────────────
// Actor types
// ────────────────────────────────────────────────────────────
describe('Registry.isActorPC', () => {
    it('returns false when no actor types are registered', () => {
        expect(Registry.isActorPC({ type: 'character' })).toBe(false);
    });

    it('returns true when the actor type matches', () => {
        Registry.registerAcceptableActorTypes(['character']);
        expect(Registry.isActorPC({ type: 'character' })).toBe(true);
    });

    it('matching is case-insensitive', () => {
        Registry.registerAcceptableActorTypes(['Character']);
        expect(Registry.isActorPC({ type: 'character' })).toBe(true);
    });

    it('returns false when the actor type does not match', () => {
        Registry.registerAcceptableActorTypes(['npc']);
        expect(Registry.isActorPC({ type: 'character' })).toBe(false);
    });

    it('accumulates types across multiple calls', () => {
        Registry.registerAcceptableActorTypes(['character']);
        Registry.registerAcceptableActorTypes(['vehicle']);
        expect(Registry.isActorPC({ type: 'vehicle' })).toBe(true);
    });

    it('handles null/undefined actor gracefully', () => {
        Registry.registerAcceptableActorTypes(['character']);
        expect(Registry.isActorPC(null)).toBe(false);
        expect(Registry.isActorPC(undefined)).toBe(false);
        expect(Registry.isActorPC({})).toBe(false);
    });
});

// ────────────────────────────────────────────────────────────
// Stacked item types
// ────────────────────────────────────────────────────────────
describe('Registry stacked item types', () => {
    it('registers stacked item types in lowercase', () => {
        Registry.registerStackedItemTypes(['Weapon', 'Consumable'], null);
        expect(Registry.getStackedItemTypes()).toEqual(['weapon', 'consumable']);
    });

    it('sets a custom quantity path', () => {
        Registry.registerStackedItemTypes([], 'system.qty');
        expect(Registry.stackedItemQuantityPath).toBe('system.qty');
    });

    it('defaults quantity path to system.quantity when not provided', () => {
        Registry.registerStackedItemTypes([]);
        expect(Registry.stackedItemQuantityPath).toBe('system.quantity');
    });

    it('accumulates types across multiple calls', () => {
        Registry.registerStackedItemTypes(['weapon'], null);
        Registry.registerStackedItemTypes(['armor'], null);
        expect(Registry.getStackedItemTypes()).toContain('weapon');
        expect(Registry.getStackedItemTypes()).toContain('armor');
    });

    it('handles null types without throwing', () => {
        expect(() => Registry.registerStackedItemTypes(null)).not.toThrow();
    });
});

// ────────────────────────────────────────────────────────────
// Stacked item callback
// ────────────────────────────────────────────────────────────
describe('Registry stacked item callback', () => {
    it('registers and retrieves a stacked item callback', () => {
        const fn = vi.fn();
        Registry.registerStackedItemCallback(fn);
        expect(Registry.getStackedItemCallback()).toBe(fn);
    });

    it('starts as null', () => {
        expect(Registry.getStackedItemCallback()).toBeNull();
    });
});
