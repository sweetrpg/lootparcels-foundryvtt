'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";
import { Registry } from "./registry.js";

const prefix = '$';
const allowedJournalTypes = [
    `${prefix}loot`,
];
// const allowedContents = [
//     `${prefix}iotum`,    // name|link quantity|die-spec -- Numenera Destiny, p. 110
//     `${prefix}currency`,    // [type] quantity|die-spec
//     `${prefix}parts`,    // quantity|die-spec
//     `${prefix}item`,     // link
//     `${prefix}cypher`,   // link
//     `${prefix}artifact`, // link
//     `${prefix}plan`,     // name|link
// ];

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

        // get marker
        const parts = line.split(/\s+/, 1);
        Logging.debug('parts', parts);
        if (parts.length == 0) {
            return;
        }

        const fnType = parts[0].substring(1);
        const fn = Registry.lootHandlers[fnType];
        Logging.debug("lootHandler", fn);

        if (fn === undefined || fn === "") {
            ui.notifications.warn(game.i18n.format('LOOTPARCELS.UnsupportedLootType',
                { name: `${fnType}` }));
            return;
        }

        let args = {
            quantity: 1,
        };

        // remove marker
        const firstSpace = line.search(/\s/);
        let remainingLine = line.substring(firstSpace).trim();
        Logging.debug("remainingLine", remainingLine);

        // find quantifiers
        remainingLine.split(/\s+/).forEach(async (q) => {
            const kv = q.split('=');
            if (kv.length != 2) return;

            switch (kv[0]) {
                case 'l':
                    args['level'] = parseInt(kv[1]);
                    remainingLine = remainingLine.replace(q, "");
                    break;
                case 'q':
                    args['quantity'] = await Utils.determineQuantity(kv[1]);
                    remainingLine = remainingLine.replace(q, "");
                    break;
            }
        });

        // determine if there's a link present
        const linkExpr = /@UUID\[(\S+)\]\{(.+?)\}/;
        const matchResult = remainingLine.match(linkExpr);
        Logging.debug('matchResult', matchResult);
        if (matchResult === undefined || matchResult === null) {
            // no match
            args['name'] = remainingLine.trim();
            // const lastIndex = remainingLine.lastIndexOf(' ');
            // let quantity = "";
            // if (lastIndex >= 0) {
            //     quantity = remainingLine.substring(lastIndex);
            //     Logging.debug('quantity', quantity);
            //     remainingLine = remainingLine.substring(0, lastIndex);
            //     Logging.debug('remainingLine', remainingLine);
            // }

            // args.push(remainingLine);
            // if (quantity.trim().length > 0) {
            //     args.push(quantity.trim());
            // }
        }
        else {
            const link = matchResult[0];
            Logging.debug('link', link);
            const linkLength = link.length;
            const linkStart = matchResult.index;
            const linkInfo = Utils.parseLink(link);

            args['name'] = linkInfo.name;
            args['link'] = {
                source: link,
                ...linkInfo
            };

            // args.push(matchResult[0]);

            // // remove link to find the rest
            // remainingLine = remainingLine.replace(link, "");
            // Logging.debug('remainingLine', remainingLine);

            // const whatsLeft = remainingLine.trim();
            // Logging.debug('whatsLeft', whatsLeft);
            // if (whatsLeft.length > 0) {
            //     args.push(whatsLeft);
            // }
        }

        Logging.debug('args', args);

        await fn(actor, args);
    });
}
