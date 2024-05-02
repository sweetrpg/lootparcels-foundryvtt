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
        default:
            handleDefaultCurrency(actor, name, quantity);
            break;
    }
}

function handleDefaultCurrency(actor, name, quantity) {
    // TODO
}

function handleCypherCurrency(actor, name, quantity) {
    Logging.debug('handleCypherCurrency', actor, quantity);

    const currencyCount = parseInt(actor.system.settings.equipment.currency.numberCategories);
    Logging.debug('currencyCount', currencyCount);

    if (name == "" || name == "default") {
        Logging.debug("No name specified");
        // no name specified, so use default
        const amount = parseInt(actor.system.settings.equipment.currency.quantity1) + parseInt(quantity);
        Logging.debug('amount', amount);
        actor.update({ 'system.settings.equipment.currency.quantity1': amount });
        return;
    }

    Logging.debug("Looking for currency by name:", name);
    for (let i = 1; i <= currencyCount; i++) {
        const nameAttr = `labelCategory${i}`;
        const qtyAttr = `quantity${i}`;
        const currencyName = actor.system.settings.equipment.currency[nameAttr].trim().toLowerCase();
        Logging.debug('currencyName', currencyName);
        if (currencyName == name) {
            const amount = parseInt(actor.system.settings.equipment.currency[qtyAttr]) + parseInt(quantity);
            Logging.debug('amount', amount);
            const updateAttr = `system.settings.equipment.currency.quantity${i}`;
            actor.update({ updateAttr: amount });
            return;
        }
    }
}
