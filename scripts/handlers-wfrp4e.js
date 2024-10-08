/**
 * Warhammer Fantasy Roleplay, 4th Edition
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class WFRP4eSystem {
    static stackedItemTypes = ['trapping', 'money', 'ammunition'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes, 'system.quantity.value');
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
    }

}
