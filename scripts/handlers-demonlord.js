/**
 * Shadow of the Demon Lord
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

/**
 *
 */
export class SotDLSystem {
    static stackedItemTypes = ['ammo', 'item'];

    /**
     *
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(SotDLSystem.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', SotDLSystem._handleCurrency);
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('_handleCurrency', actor, args);

        let name = args.text;
        let quantity = args.quantity;

        if (name == "" || name == "default") {
            Logging.debug("No name specified");
            name = 'gp';
        }

        const currentAmount = actor.system.wealth[name];
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        const updateAttr = `system.wealth.${name}`;
        Logging.debug("updateAttr", updateAttr);
        const data = {
            [updateAttr]: amount,
        };
        Logging.debug("data", data);
        await actor.update(data);
    }
}
