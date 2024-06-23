/**
 * Savage Worlds, Adventure Edition
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class SWADESystem {
    static stackedItemTypes = ['consumable'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', SWADESystem._handleCurrency);
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let quantity = args.quantity;

        const currentAmount = actor.system.currency;
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        await actor.update({ 'system.details.currency': amount });
    }
}
