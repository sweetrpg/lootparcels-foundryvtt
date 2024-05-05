'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";
import { _handleGenericItem } from "./handlers-generic.js";

export async function handleDnD5eEquipment(actor, args) {
    Logging.debug('handleDnD5eEquipment', actor, args);

    await _handleGenericItem(actor, 'equipment', args);
}

export async function handleDnD5eArmor(actor, args) {
    Logging.debug('handleDnD5eArmor', actor, args);

    await _handleGenericItem(actor, 'equipment', args);
}

export async function handleDnD5eWeapon(actor, args) {
    Logging.debug('handleDnD5eWeapon', actor, args);

    await _handleGenericItem(actor, 'weapon', args);
}

export async function handleDnD5eLoot(actor, args) {
    Logging.debug('handleDnD5eLoot', actor, args);

    await _handleGenericItem(actor, 'loot', args);
}

export async function handleDnD5eTool(actor, args) {
    Logging.debug('handleDnD5eTool', actor, args);

    await _handleGenericItem(actor, 'tool', args);
}

export async function handleDnD5eContainer(actor, args) {
    Logging.debug('handleDnD5eContainer', actor, args);

    await _handleGenericItem(actor, 'container', args);
}

export async function handleDnD5eConsumable(actor, args) {
    Logging.debug('handleDnD5eConsumable', actor, args);

    await _handleGenericItem(actor, 'consumable', args);
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
    Logging.debug('[dnd5e] isDnD5eActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
