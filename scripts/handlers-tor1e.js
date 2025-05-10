/**
 * The One Ring, 1st Edition
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

/**
 *
 */
export class TOR1eSystem {
    static stackedItemTypes = ['miscellaneous'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(TOR1eSystem.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', TOR1eSystem._handleCurrency);
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('_handleCurrency', actor, args);

        let quantity = args.quantity;

        const currentAmount = actor.system.treasure.value;
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        await actor.update({ ['system.treasure.value']: amount });
    }
}
