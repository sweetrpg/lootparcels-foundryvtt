/**
 * Worlds Without Number
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class WWNSystem {
    static stackedItemTypes = ['item'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemCallback(WWNSystem._isItemStackable);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

    static _isItemStackable(item) {
        Logging.debug("_isItemStackable", item);

        return ((item.type == 'item') &&
                !item.system.hasCharges);
    }

}
