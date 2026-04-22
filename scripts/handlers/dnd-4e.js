/**
 * System: Dungeons and Dragons, 4th Edition
 */

import { AllSystems } from "./all.js";
import { Registry } from "../registry.js";
import { Logging } from "../logging.js";

export class DnD4eSystem {
    static stackedItemTypes = ['consumable', 'loot', 'tool'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(DnD4eSystem.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', AllSystems.handleCurrency);
    }
}
