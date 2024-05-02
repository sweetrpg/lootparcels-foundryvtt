'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

export async function handleIotum(actor, args) {
    Logging.debug('handleIotum', actor, args);

    // if (args.length < 1) {
    //     ui.notifications.warn(game.i18n.format('LOOTPARCELS.MissingArguments',
    //         { name: 'iotum', args: args.join() }));
    //     return;
    // }

    let itemName = args.name;
    let itemDesc = "";
    let itemLevel = args.level;
    let quantity = args.quantity;

    // if (args.length > 2) {
    //     quantity = await Utils.determineQuantity(args[2]);
    // }

    const itemInfo = args.link;
    if (itemInfo.startsWith('@UUID[')) {
        const linkInfo = Utils.parseLink(itemInfo);
        Logging.debug('linkInfo', linkInfo);
        const item = await fromUuid(linkInfo.id);
        Logging.debug("item", item);

        itemName = item.name;
        Logging.debug('itemName', itemName);
        // itemDesc = item.system.description;

        // const qValue = args.shift();
        // if(qValue !== undefined) {
        // quantity = await Utils.determineQuantity(qValue);
        // }

        const lValue = item.system.basic.level;
        if (lValue !== undefined) {
            itemLevel = lValue;
        }
    }
    else {
        itemName = itemInfo;
        Logging.debug('itemName', itemName);

        const lValue = args.shift();
        Logging.debug('lValue', lValue);
        if (lValue !== undefined) {
            itemLevel = parseInt(lValue);
            Logging.debug("itemLevel", itemLevel);
        }
    }

    const qValue = args.shift();
    Logging.debug("qValue", qValue);
    if (qValue !== undefined) {
        quantity = await Utils.determineQuantity(qValue);
        Logging.debug("quantity", quantity);
    }

    let foundItem = false;
    Logging.debug("actor items", actor.collections.items);
    actor.collections.items.forEach(item => {
        Logging.debug("item", item);

        if (item.type == 'material' && item.name.toLowerCase() == itemName.toLowerCase()) {
            const currentAmount = item.system.basic.quantity;
            Logging.debug("currentAmount", currentAmount);

            const newAmount = currentAmount + quantity;
            Logging.debug("newAmount", newAmount);

            item.update({ 'system.basic.quantity': newAmount });

            foundItem = true;
        }
    });

    Logging.debug("foundItem", foundItem);
    if (!foundItem) {
        // add an entry
        const data = [{ name: itemName, type: 'material', basic: { quantity: quantity, level: itemLevel }, description: itemDesc }];
        Logging.debug("data", data);
        const iotum = await Item.create(data, { parent: actor });
        Logging.debug("iotum", iotum);
    }

}

export async function handleParts(actor, args) {
    Logging.debug('handleParts', actor, args);

    let quantity = 1;

    if (args.length > 0) {
        // get number of parts
        quantity = await Utils.determineQuantity(args[0]);
        // quantity = parseInt(components[0]);
    }
    Logging.debug('quantity', quantity);

    // lookup parts item in actor sheet
    let foundParts = false;
    actor.collections.items.forEach(item => {
        Logging.debug("item", item);

        if (item.type == 'material' && item.name.toLowerCase() == 'parts') {
            const currentAmount = item.system.basic.quantity;
            Logging.debug("currentAmount", currentAmount);

            const newAmount = currentAmount + quantity;
            Logging.debug("newAmount", newAmount);

            item.update({ 'system.basic.quantity': newAmount });

            foundParts = true;
        }
    });

    Logging.debug("foundParts", foundParts);
    if (!foundParts) {
        // add an entry
        const data = [{ name: "Parts", type: 'material', 'basic.quantity': quantity }];
        const plan = await Item.create(data, { parent: actor });
        Logging.debug("plan", plan);
    }
}
