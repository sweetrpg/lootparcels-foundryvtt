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

    // Logging.debug("actor items", actor.collections.items);
    // for (let item of actor.collections.items) {
    //     Logging.debug("item", item);

    //     if (item.type == type && item.name.toLowerCase() == itemName.toLowerCase()) {
    //         const currentAmount = parseInt(item.system.quantity || 1);
    //         Logging.debug("currentAmount", typeof (currentAmount), currentAmount);
    //         Logging.debug("quantity", typeof (quantity), quantity);

    //         const newAmount = parseInt(currentAmount) + parseInt(quantity);
    //         Logging.debug("newAmount", newAmount);

    //         item.update({ 'system.basic.quantity': newAmount });

    //         return;
    //     }
    // }

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
    const updateAttr = `currency.${name}`;
    actor.update({ updateAttr: amount });
}

export function isWWActorPC(actor) {
    Logging.debug('[weirdwizard] isWWActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
