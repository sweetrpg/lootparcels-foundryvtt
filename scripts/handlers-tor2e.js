'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

async function _handleTOR2Item(actor, type, args) {
    Logging.debug('_handleTOR2Item', actor, type, args);

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

    if(itemData !== null) {
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

export async function handleTOR2Misc(actor, args) {
    Logging.debug('handleTOR2Misc', actor, args);

    await _handleTOR2Item(actor, 'miscellaneous', args);
}

export async function handleTOR2Armor(actor, args) {
    Logging.debug('handleTOR2Armor', actor, args);

    await _handleTOR2Item(actor, 'armor', args);
}

export async function handleTOR2Weapon(actor, args) {
    Logging.debug('handleTOR2Weapon', actor, args);

    await _handleTOR2Item(actor, 'weapon', args);
}

export async function handleTOR2Currency(actor, args) {
    Logging.debug('handleTOR2Currency', actor, args);

    let quantity = args.quantity;

    const currentAmount = actor.system.treasure.value;
    Logging.debug("currentAmount", currentAmount);
    const amount = parseInt(currentAmount) + parseInt(quantity);
    Logging.debug('amount', amount);
    await actor.update({ 'system.treasure.value': amount });
}

export function isTOR2ActorPC(actor) {
    Logging.debug('[weirdwizard] isTOR2ActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
