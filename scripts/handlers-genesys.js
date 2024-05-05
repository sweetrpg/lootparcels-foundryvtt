'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";
import { _handleGenericItem } from "./handlers-generic.js";

export async function handleGenEquipment(actor, args) {
    Logging.debug('handleGenEquipment', actor, args);

    await _handleGenericItem(actor, 'gear', args);
}

export async function handleGenArmor(actor, args) {
    Logging.debug('handleGenArmor', actor, args);

    await _handleGenericItem(actor, 'armor', args);
}

export async function handleGenWeapon(actor, args) {
    Logging.debug('handleGenWeapon', actor, args);

    await _handleGenericItem(actor, 'weapon', args);
}

export async function handleGenVehicleWeapon(actor, args) {
    Logging.debug('handleGenVehicleWeapon', actor, args);

    await _handleGenericItem(actor, 'vehicleWeapon', args);
}

export async function handleGenContainer(actor, args) {
    Logging.debug('handleGenContainer', actor, args);

    await _handleGenericItem(actor, 'container', args);
}

export async function handleGenConsumable(actor, args) {
    Logging.debug('handleGenConsumable', actor, args);

    await _handleGenericItem(actor, 'consumable', args);
}

export async function handleGenCurrency(actor, args) {
    Logging.debug('handleGenCurrency', actor, args);

    let quantity = args.quantity;

    const currentAmount = actor.system.currency;
    Logging.debug("currentAmount", currentAmount);
    const amount = parseInt(currentAmount) + parseInt(quantity);
    Logging.debug('amount', amount);
    await actor.update({ 'system.currency': amount });
}

export function isGenActorPC(actor) {
    Logging.debug('[genesys] isGenActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
