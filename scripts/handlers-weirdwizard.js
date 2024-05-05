'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

async function _handleWWItem(actor, type, args) {
    Logging.debug('_handleWWItem', actor, type, args);

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

    const data = { name: itemName, type: 'Equipment', system: { subtype: type }, quantity: quantity, description: { value: itemDesc } };
    if (itemData !== null) {
        data.system = {
            subtype: type,
            ...itemData
        }
    }
    Logging.debug("data", data);
    const item = await Item.create([data], { parent: actor });
    Logging.debug("item", item);
}

export async function handleWWEquipment(actor, args) {
    Logging.debug('handleWWEquipment', actor, args);

    await _handleWWItem(actor, 'equipment', args);
}

export async function handleWWArmor(actor, args) {
    Logging.debug('handleWWArmor', actor, args);

    await _handleWWItem(actor, 'armor', args);
}

export async function handleWWWeapon(actor, args) {
    Logging.debug('handleWWWeapon', actor, args);

    await _handleWWItem(actor, 'weapon', args);
}

export async function handleWWCurrency(actor, args) {
    Logging.debug('handleWWCurrency', actor, args);

    let name = args.name;
    let quantity = args.quantity;

    if (name == "" || name == "default") {
        Logging.debug("No name specified");
        name = 'gp';
    }

    const currentAmount = actor.system.currency[name];
    Logging.debug("currentAmount", currentAmount);
    const amount = parseInt(currentAmount) + parseInt(quantity);
    Logging.debug('amount', amount);
    const updateAttr = `system.currency.${name}`;
    Logging.debug("updateAttr", updateAttr);
    const data = {};
    data[updateAttr] = amount;
    Logging.debug("data", data);
    await actor.update(data);
    Logging.debug("actor (after update)", actor);
}

export function isWWActorPC(actor) {
    Logging.debug('[weirdwizard] isWWActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
