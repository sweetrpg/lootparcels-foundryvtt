/**
 * Level Up (A5E)
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

/**
 *
 */
export class A5eSystem {

    /**
     *
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        // Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerStackedItemCallback(A5eSystem._isItemStackable);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

    static _isItemStackable(item) {
        Logging.debug("_isItemStackable", item);

        return (item.type == 'object' &&
            (item.system.objectType == 'tool' ||
                item.system.objectType == 'miscellaneous' ||
            item.system.objectType == 'consumable'));
    }

}
