/**
 * Powered by the Apocalypse
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class PbtASystem {
    static stackedItemTypes = ['consumable', 'loot', 'tool'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

}
