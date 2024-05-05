'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

async function _handleDLItem(actor, type, args) {
    Logging.debug('_handleDLItem', actor, type, args);

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

    const data = { name: itemName, type: type, quantity: quantity, description: { value: itemDesc } };
    if (itemData !== null) {
        data.system = itemData;
    }
    Logging.debug("data", data);
    const item = await Item.create([data], { parent: actor });
    Logging.debug("item", item);
}

export async function handleDLEquipment(actor, args) {
    Logging.debug('handleDLEquipment', actor, args);

    await _handleDLItem(actor, 'item', args);
}

export async function handleDLArmor(actor, args) {
    Logging.debug('handleDLArmor', actor, args);

    await _handleDLItem(actor, 'armor', args);
}

export async function handleDLWeapon(actor, args) {
    Logging.debug('handleDLWeapon', actor, args);

    await _handleDLItem(actor, 'weapon', args);
}

export async function handleDLAmmo(actor, args) {
    Logging.debug('handleDLAmmo', actor, args);

    await _handleDLItem(actor, 'ammo', args);
}

export async function handleDLCurrency(actor, args) {
    Logging.debug('handleDLCurrency', actor, args);

    let name = args.name;
    let quantity = args.quantity;

    if (name == "" || name == "default") {
        Logging.debug("No name specified");
        name = 'gp';
    }

    const currentAmount = actor.system.wealth[name];
    Logging.debug("currentAmount", currentAmount);
    const amount = parseInt(currentAmount) + parseInt(quantity);
    Logging.debug('amount', amount);
    const updateAttr = `system.wealth.${name}`;
    Logging.debug("updateAttr", updateAttr);
    const data = {}
    data[updateAttr] = amount;
    Logging.debug("data", data);
    await actor.update(data);
}

export function isDLActorPC(actor) {
    Logging.debug('[weirdwizard] isDLActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
