/**
 * The One Ring, 2nd Edition
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

/**
 *
 */
export class TOR2eSystem {
    static stackedItemTypes = ['miscellaneous'];

    /**
     *
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', TOR2eSystem._handleCurrency);
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
