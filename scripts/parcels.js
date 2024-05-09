import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";
import { Registry } from "./registry.js";

const prefix = '$';
const allowedJournalTypes = [
    `${prefix}parcel`,
];

export async function handleParcelDrop(actor, html, droppedEntity) {
    Logging.debug("handleParcelDrop", actor, html, droppedEntity);

    let jpage = await fromUuid(droppedEntity.uuid);
    Logging.debug(jpage);
    if (jpage instanceof JournalEntry) { jpage = jpage.pages.contents[0]; }
    Logging.debug(jpage);

    html = html._element;
    Logging.debug(html);

    const journalContent = Utils.getLinesFromHtml(jpage.text.content);
    Logging.debug('journalContent', journalContent);
    const journalType = journalContent.shift().replace(/ .*/, '').toLowerCase();
    Logging.debug('journalType', journalType);

    if (!allowedJournalTypes.includes(journalType)) {
        ui.notifications.warn(game.i18n.format('LOOTPARCELS.UnsupportedJournalType',
            { name: `${jpage.name}`, type: journalType }));
        return;
    };

    journalContent.forEach(async (jc) => {
        // parse line
        let line = jc.trim();
        let fn = null;

        // determine type of entry
        const parts = line.split(/\s+/, 1);
        Logging.debug('parts', parts);
        if (parts.length == 0) {
            // line is empty
            return;
        }

        const firstSpace = line.search(/\s/);
        let remainingLine = line;
        let args = {
            quantity: 1,
            level: 1,
        };

        const entryType = parts[0];
        if (entryType.startsWith(prefix)) {
            // directive
            const fnType = entryType.substring(1);
            fn = Registry.getDirectiveHandler(fnType);
            Logging.debug("fn", fn);

            if (fn === undefined || fn === "") {
                ui.notifications.warn(game.i18n.format('LOOTPARCELS.UnsupportedDirective',
                    { name: `${fnType}` }));
                return;
            }

            // remove directive from line
            remainingLine = line.substring(firstSpace).trim();
            Logging.debug("remainingLine", remainingLine);
        }
        else if (entryType.startsWith('@')) {
            // link
            const linkInfo = Utils.parseLink(line);
            Logging.debug('linkInfo', linkInfo);

            if (linkInfo === null) {
                // no match, treat the line as text
                fn = Registry.getTextEntryHandler();
                Logging.debug("fn", fn);
            }
            else {
                args['text'] = linkInfo.name;
                args['link'] = linkInfo;

                // remove link from line
                remainingLine = line.replace(linkInfo.link, "");
                fn = Registry.getLinkEntryHandler();
                Logging.debug("fn", fn);
            }
        }
        else {
            // text?
            fn = Registry.getTextEntryHandler();
            Logging.debug("fn", fn);
        }

        // find modifiers or die specs
        for (let m of remainingLine.split(/\s+/)) {
            Logging.debug("modifier", m);

            // check if it's a die spec
            const qty = await Utils.determineQuantity(m);
            Logging.debug("qty", qty);
            if (qty !== undefined && qty !== null) {
                args['q'] = parseInt(qty);
                Logging.debug('args (parsing)', args);
                remainingLine = remainingLine.replace(m, "");
                continue;
            }

            // check if it's a key/value pair
            const kv = m.split('=');
            Logging.debug("kv", kv);
            if (kv.length != 2) continue;

            switch (kv[0]) {
                // handle special cases
                case 'level':
                case 'l':
                    args['level'] = parseInt(kv[1]);
                    Logging.debug('args (parsing)', args);
                    remainingLine = remainingLine.replace(m, "");
                    break;
                case 'quantity':
                case 'q':
                    args['quantity'] = await Utils.determineQuantity(kv[1]);
                    Logging.debug('args (parsing)', args);
                    remainingLine = remainingLine.replace(m, "");
                    break;
                default:
                    args[kv[0]] = kv[1];
                    Logging.debug('args (parsing)', args);
                    remainingLine = remainingLine.replace(m, "");
                    break;
            }
        }
        Logging.debug("remainingLine", remainingLine);

        // if there's anything left, treat it as free text that goes in 'args.text'
        if (remainingLine.trim().length > 0) {
            args['text'] = remainingLine.trim();
        }

        Logging.debug('args (before call)', args);

        // make sure we have a function to call
        if (fn === null) {
            ui.notifications.warn(game.i18n.localize('LOOTPARCELS.NoFunction'));
            return;
        }

        await fn(actor, args);
    });
}
