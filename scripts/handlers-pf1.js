/**
 *
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

/**
 *
 */
export class PF1System {

    /**
     *
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemCallback(PF1System._isItemStackable);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

    static _isItemStackable(item) {
        Logging.debug("_isItemStackable", item);

        return ((item.type == 'consumable') ||
            (item.type == 'loot' &&
                (item.system.subType == 'misc' ||
                    item.system.subType == 'ammo')));
    }

}
