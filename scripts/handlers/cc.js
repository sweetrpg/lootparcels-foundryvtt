/**
 * Castles and Crusades
 */
import { AllSystems } from "./all.js";
import { Registry } from "../registry.js";
import { Logging } from "../logging.js";

export class CCSystem {
    static stackedItemTypes = ['Equipment:consumable'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(CCSystem.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }

}
