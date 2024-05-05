'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

async function _handleDnD5eItem(actor, type, args) {
    Logging.debug('_handleDnD5eItem', actor, type, args);

    let itemName = args.name;
    let itemDesc = "";
    let itemLevel = args.level;
    let quantity = parseInt(args.quantity);
    let itemData = null;

    const linkInfo = args.link;
    Logging.debug("linkInfo", linkInfo);
    // if a link is provided and valid, get name and level from it
    if (linkInfo?.id !== undefined) {
        const item = await fromUuid(linkInfo.id);
        Logging.debug("(link) item", item);

        if (item !== undefined && item !== null) {
            itemName = item.name;
            Logging.debug('itemName', itemName);
            itemDesc = item.system.description || "";

            itemData = item;
        }
        else {
            itemName = linkInfo.name;
        }
        itemLevel = 1;
    }

    if (itemData !== null) {
        const item = await Item.create([itemData], { parent: actor });
        Logging.debug("item", item);
        return;
    }

    const data = { name: itemName, type: type, system: { quantity: quantity }, description: { value: itemDesc } };
    if (itemData !== null) {
        data.system = {
            quantity: quantity,
            ...itemData
        }
    }
    Logging.debug("data", data);
    const item = await Item.create([data], { parent: actor });
    Logging.debug("item", item);
}

export async function handleDnD5eEquipment(actor, args) {
    Logging.debug('handleDnD5eEquipment', actor, args);

    await _handleDnD5eItem(actor, 'equipment', args);
}

export async function handleDnD5eArmor(actor, args) {
    Logging.debug('handleDnD5eArmor', actor, args);

    await _handleDnD5eItem(actor, 'armor', args);
}

export async function handleDnD5eWeapon(actor, args) {
    Logging.debug('handleDnD5eWeapon', actor, args);

    await _handleDnD5eItem(actor, 'weapon', args);
}

export async function handleDnD5eLoot(actor, args) {
    Logging.debug('handleDnD5eLoot', actor, args);

    await _handleDnD5eItem(actor, 'loot', args);
}

export async function handleDnD5eTool(actor, args) {
    Logging.debug('handleDnD5eTool', actor, args);

    await _handleDnD5eItem(actor, 'tool', args);
}

export async function handleDnD5eContainer(actor, args) {
    Logging.debug('handleDnD5eContainer', actor, args);

    await _handleDnD5eItem(actor, 'container', args);
}

export async function handleDnD5eConsumable(actor, args) {
    Logging.debug('handleDnD5eConsumable', actor, args);

    await _handleDnD5eItem(actor, 'consumable', args);
}

export async function handleDnD5eCurrency(actor, args) {
    Logging.debug('handleDnD5eCurrency', actor, args);

    let name = args.name;
    let quantity = args.quantity;

    const currentAmount = actor.system.currency[name];
    Logging.debug("currentAmount", currentAmount);
    const amount = parseInt(currentAmount) + parseInt(quantity);
    Logging.debug('amount', amount);
    const updateAttr = `system.currency.${name}`;
    const data = {
        [updateAttr]: amount,
    };
    await actor.update(data);
}

export function isDnD5eActorPC(actor) {
    Logging.debug('[weirdwizard] isDnD5eActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
