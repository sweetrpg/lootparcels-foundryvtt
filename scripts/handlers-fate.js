/**
 * FATE Core
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class FATESystem {
    static stackedItemTypes = ['consumable', 'loot', 'tool'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(FATESystem.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

}
