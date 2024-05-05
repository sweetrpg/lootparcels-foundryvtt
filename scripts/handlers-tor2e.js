'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

export async function handleTOR2Currency(actor, args) {
    Logging.debug('handleTOR2Currency', actor, args);

    // let name = args.name;
    let quantity = args.quantity;

    // if (name == "" || name == "default") {
    //     Logging.debug("No name specified");
    //     name = 'gp';
    // }

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
