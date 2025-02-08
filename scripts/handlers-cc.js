/**
 * Castles and Crusades
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class CCSystem {
    static stackedItemTypes = ['Equipment:consumable'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

}
