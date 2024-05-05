'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";
import { _handleGenericItem } from "./handlers-generic.js";

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
    Logging.debug('[demonlord] isDLActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
