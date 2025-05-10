/**
 * Shadowrun, 5th Edition
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class Shadowrun5eSystem {
    static stackedItemTypes = ['ammo'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(Shadowrun5eSystem.stackedItemTypes, 'system.technology.quantity');
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', Shadowrun5eSystem._handleCurrency);
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let quantity = args.quantity;

        const currentAmount = actor.system.nuyen || 0;
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        await actor.update({ 'system.nuyen': amount });
    }
}
