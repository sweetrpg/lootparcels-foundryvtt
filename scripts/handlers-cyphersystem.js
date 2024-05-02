'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

export async function handleIotum(actor, args) {
    Logging.debug('handleIotum', actor, args);

    let itemName = args.name;
    let itemDesc = "";
    let itemLevel = args.level;
    let quantity = parseInt(args.quantity);

    const linkInfo = args.link;
    // if a link is provided and valid, get name and level from it
    if (linkInfo?.id?.startsWith('@UUID[')) {
        const item = await fromUuid(linkInfo.id);
        Logging.debug("item", item);

        itemName = item.name;
        Logging.debug('itemName', itemName);
        itemDesc = item.system.description || "";

        itemLevel = item.system.basic.level || args.level || 1;
    }

    let foundItem = false;
    Logging.debug("actor items", actor.collections.items);
    for (let item of actor.collections.items) {
        Logging.debug("item", item);

        if (item.type == 'material' && item.name.toLowerCase() == itemName.toLowerCase()) {
            const currentAmount = parseInt(item.system.basic.quantity || 1);
            Logging.debug("currentAmount", typeof(currentAmount), currentAmount);
            Logging.debug("quantity", typeof(quantity), quantity);

            const newAmount = parseInt(currentAmount) + parseInt(quantity);
            Logging.debug("newAmount", newAmount);

            item.update({ 'system.basic.quantity': newAmount });

            // foundItem = true;
            return;
        }
    }

    // Logging.debug("foundItem", foundItem);
    // if (!foundItem) {
    // add an entry
    const data = [{ name: itemName, type: 'material', basic: { quantity: quantity, level: itemLevel }, description: itemDesc }];
    Logging.debug("data", data);
    const iotum = await Item.create(data, { parent: actor });
    Logging.debug("iotum", iotum);
    // }

}

export async function handleParts(actor, args) {
    Logging.debug('handleParts', actor, args);

    let quantity = parseInt(args.quantity);
    Logging.debug('quantity', quantity);

    // lookup parts item in actor sheet
    let foundParts = false;
    for (let item of actor.collections.items) {
        Logging.debug("item", item);

        if (item.type == 'material' && item.name.toLowerCase() == 'parts') {
            const currentAmount = parseInt(item.system.basic.quantity || 1);
            Logging.debug("currentAmount", currentAmount);

            const newAmount = currentAmount + quantity;
            Logging.debug("newAmount", newAmount);

            item.update({ 'system.basic.quantity': newAmount });

            // foundParts = true;
            return;
        }
    }

    // Logging.debug("foundParts", foundParts);
    // if (!foundParts) {
    // add an entry
    const data = [{ name: "Parts", type: 'material', 'basic.quantity': quantity }];
    const plan = await Item.create(data, { parent: actor });
    Logging.debug("plan", plan);
    // }
}
