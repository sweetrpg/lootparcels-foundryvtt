/**
 * System: Level Up (A5E)
 */

import { AllSystems } from "./all.js";
import { Registry } from "../registry.js";
import { Logging } from "../logging.js";

/**
 * System class for A5E, responsible for registering handlers and defining system-specific logic.
 */
export class A5eSystem {

    /**
     * Registers all handlers for the A5E system.
     *
     * @static
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        // Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerStackedItemCallback(A5eSystem._isItemStackable);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

    /**
     * @static
     * @private
     * @param { Item } item An item object to check for stackability.
     * @returns { Boolean } True if the item is stackable, false otherwise.
     */
    static _isItemStackable(item) {
        Logging.debug("_isItemStackable", item);

        return (item.type == 'object' &&
            (item.system.objectType == 'tool' ||
                item.system.objectType == 'miscellaneous' ||
            item.system.objectType == 'consumable'));
    }

}
