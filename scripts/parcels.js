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

    journalContent.forEach(jc => {
        // parse line
        const parts = jc.trim().split(/\s+/);
        Logging.debug('parts', parts);

        if (parts.length == 0) {
            return;
        }

        // if (!allowedAnnotations.includes(parts[0])) {
        //     Logging.warn("Unrecognized parcel annotation in journal", parts[0], droppedEntity);
        //     return;
        // }

        const fnType = parts[0].substring(1);
        const fn = Registry.lootHandlers[fnType];
        Logging.debug("lootHandler", fn);

        if (fn === undefined || fn === "") {
            ui.notifications.warn(game.i18n.format('LOOTPARCELS.UnsupportedLootType',
                { name: `${fnType}` }));
            return;
        }

        fn(actor, parts.slice(1));
    });
}
