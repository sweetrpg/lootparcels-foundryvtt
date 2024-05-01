'use strict';

import { Logging } from "./logging.js";

export function handleCurrency(actor, components) {
    Logging.debug('handleCurrency', components);

    if (components.length == 0) {
        ui.notifications.warn(game.i18n.format('LOOTPARCELS.MissingArguments',
            { name: "handleCurrency" }));
        return;
    }

    let name = "";
    let quantity = 0;

    if(components.length == 1) {
        // only amount is specified
        quantity = parseInt(components[0]);
    }
    else if(components.length >= 2) {
        name = components[0].trim().toLowerCase();
        quantity = parseInt(components[1]);
    }
    Logging.debug('name', name);
    Logging.debug('quantity', quantity);

    if (quantity === undefined || quantity == 0) {
        ui.notifications.warn(game.i18n.format('LOOTPARCELS.InvalidArgument',
            { name: "quantity", value: components[1] }));
        return;
    }

    // handle special cases
    switch (game.system.id) {
        case 'cyphersystem':
            handleCypherCurrency(actor, name, quantity);
            break;
    }
}

function handleCypherCurrency(actor, name, quantity) {
    Logging.debug('handleCypherCurrency', actor, quantity);

    const currencyCount = parseInt(actor.system.settings.equipment.currency.numberCategories);
    Logging.debug('currencyCount', currencyCount);

    if(name == "") {
        // no name specified, so use default
        const amount = parseInt(actor.system.settings.equipment.currency.quantity1) + parseInt(quantity);
        Logging.debug('amount', amount);
        actor.update({'system.settings.equipment.currency.quantity1': amount});
    return;
    }

    for (let i = 1; i <= currencyCount; i++) {
        const nameAttr = `labelCategory${i}`;
        const qtyAttr = `quantity${i}`;
        const currencyName = actor.system.settings.equipment.currency[nameAttr].trim().toLowerCase();
        Logging.debug('currencyName', currencyName);
        if (currencyName == name) {
            const amount = parseInt(actor.system.settings.equipment.currency[qtyAttr]) + parseInt(quantity);
            Logging.debug('amount', amount);
            const updateAttr = `system.settings.equipment.currency.quantity${i}`;
            actor.update({updateAttr: amount});
            return;
        }
    }
}
