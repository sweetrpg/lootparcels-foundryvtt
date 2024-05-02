'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

export async function handleIotum(actor, args) {
    Logging.debug('handleIotum', args);
}

export async function handleParts(actor, args) {
    Logging.debug('handleParts', args);

    let quantity = 1;

    if (args.length > 0) {
        // get number of parts
        quantity = await Utils.determineQuantity(args[0]);
        // quantity = parseInt(components[0]);
    }
    Logging.debug('quantity', quantity);

    // lookup parts item in actor sheet
    let foundParts = false;
    actor.collections.items.forEach(item => {
        Logging.debug("item", item);

        if (item.type == 'material' && item.name.toLowerCase() == 'parts') {
            const currentAmount = item.system.basic.quantity;
            Logging.debug("currentAmount", currentAmount);

            const newAmount = currentAmount + quantity;
            Logging.debug("newAmount", newAmount);

            item.update({ 'system.basic.quantity': newAmount });

            foundParts = true;
        }
    });

    Logging.debug("foundParts", foundParts);
    if (!foundParts) {
        // add an entry
        const data = [{ name: "Parts", type: 'material', quantity: quantity }];
        const plan = await Item.create(data, { actor: actor.id });
        Logging.debug("plan", plan);
    }
}
