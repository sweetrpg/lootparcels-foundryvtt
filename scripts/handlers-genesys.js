'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class GenesysSystem {
    static stackedItemTypes = ['consumable', 'gear'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', GenesysSystem._handleCurrency);
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let quantity = args.quantity;

        const currentAmount = actor.system.currency;
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        await actor.update({ 'system.currency': amount });
    }
}
