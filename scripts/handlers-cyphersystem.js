'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

async function _handleCSItem(actor, type, args) {
    Logging.debug('_handleCSItem', actor, type, args);

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

    Logging.debug("actor items", actor.collections.items);
    for (let item of actor.collections.items) {
        Logging.debug("item", item);

        if (item.type == type && item.name.toLowerCase() == itemName.toLowerCase()) {
            const currentAmount = parseInt(item.system.basic.quantity || 1);
            Logging.debug("currentAmount", typeof(currentAmount), currentAmount);
            Logging.debug("quantity", typeof(quantity), quantity);

            const newAmount = parseInt(currentAmount) + parseInt(quantity);
            Logging.debug("newAmount", newAmount);

            item.update({ 'system.basic.quantity': newAmount });

            return;
        }
    }

    const data = [{ name: itemName, type: type, basic: { quantity: quantity, level: itemLevel }, description: itemDesc }];
    Logging.debug("data", data);
    const item = await Item.create(data, { parent: actor });
    Logging.debug("item", item);
}

export async function handleCSEquipment(actor, args) {
    Logging.debug('handleCSEquipment', actor, args);

    await _handleCSItem(actor, 'equipment', args);
}

export async function handleCSArmor(actor, args) {
    Logging.debug('handleCSArmor', actor, args);

    await _handleCSItem(actor, 'armor', args);
}

export async function handleCSWeapon(actor, args) {
    Logging.debug('handleCSWeapon', actor, args);

    await _handleCSItem(actor, 'attack', args);
}

export async function handleCSIotum(actor, args) {
    Logging.debug('handleCSIotum', actor, args);

    await _handleCSItem(actor, 'material', args);
}

export async function handleCSCypher(actor, args) {
    Logging.debug('handleCSCypher', actor, args);

    await _handleCSItem(actor, 'cypher', args);
}

export async function handleCSArtifact(actor, args) {
    Logging.debug('handleCSArtifact', actor, args);

    await _handleCSItem(actor, 'artifact', args);
}

export async function handleCSParts(actor, args) {
    Logging.debug('handleCSParts', actor, args);

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
