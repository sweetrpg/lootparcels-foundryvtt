/**
 * Shadow of the Weird Wizard
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class SotWWSystem {
    static stackedItemTypes = ['Equipment:consumable'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(SotWWSystem.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(SotWWSystem._handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

    /**
     *
     * @param {Actor} actor
     * @param {object} args
     */
    static async _handleTextEntry(actor, args) {
        Logging.debug('_handleTextEntry', actor, args);

        const stacked = args.stacked || false;
        const type = args.type || 'Equipment';
        Logging.debug('type', type, 'stacked', stacked);
        const addlSystemInfo = {subtype: args.subtype || 'generic' };
        Logging.debug('addlSystemInfo', addlSystemInfo);

        if (stacked) {
            await AllSystems.handleStackedItem(actor, type, args, addlSystemInfo);
        }
        else {
            await AllSystems.handleItem(actor, type, args, addlSystemInfo);
        }
    }

}
