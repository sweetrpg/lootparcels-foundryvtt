'use strict';

import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

export async function handleCurrency(actor, args) {
    Logging.debug('handleCurrency', args);

    let name = args.name;
    let quantity = 1;

    if (parseInt(name) == NaN) {
        Logging.debug("name is a name");
        quantity = parseInt(await Utils.determineQuantity(args.quantity));
    }
    else {
        Logging.debug("name is a number", name);
        quantity = parseInt(await Utils.determineQuantity(name));
        name = 'default';
    }

    Logging.debug('name', name);
    Logging.debug('quantity', quantity);

    if (quantity === undefined || quantity == 0) {
        ui.notifications.warn(game.i18n.format('LOOTPARCELS.InvalidArgument',
            { name: "quantity", value: args }));
        return;
    }

    // handle special cases
    switch (game.system.id) {
        case 'cyphersystem':
            handleCypherCurrency(actor, name, quantity);
            break;
        case 'weirdwizard':
            handleWWCurrency(actor, name, quantity);
            break;
        default:
            handleDefaultCurrency(actor, name, quantity);
            break;
    }
}


function handleDefaultCurrency(actor, name, quantity) {
    Logging.debug('handleDefaultCurrency', actor, quantity);

    // TODO
}
