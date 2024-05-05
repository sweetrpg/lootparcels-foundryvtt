'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";
import { _handleGenericItem } from "./handlers-generic.js";

export async function handleTOR2Misc(actor, args) {
    Logging.debug('handleTOR2Misc', actor, args);

    await _handleGenericItem(actor, 'miscellaneous', args);
}

export async function handleTOR2Armor(actor, args) {
    Logging.debug('handleTOR2Armor', actor, args);

    await _handleGenericItem(actor, 'armor', args);
}

export async function handleTOR2Weapon(actor, args) {
    Logging.debug('handleTOR2Weapon', actor, args);

    await _handleGenericItem(actor, 'weapon', args);
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
    Logging.debug('[tor2e] isTOR2ActorPC', actor);

    return actor?.type?.toLowerCase() === 'character';
}
