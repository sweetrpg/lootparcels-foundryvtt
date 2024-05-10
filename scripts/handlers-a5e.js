/**
 *
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

    static async _isItemStackable(item) {
        Logging.debug("_isItemStackable", item);

        return (item.type == 'object' &&
            (item.system.objectType == 'tool' ||
                item.system.objectType == 'miscellaneous' ||
            item.system.objectType == 'consumable'));
    }

    // static async handleEquipment(actor, args) {
    //     Logging.debug('handleEquipment', actor, args);

    //     await AllSystems.handleItem(actor, 'equipment', args);
    // }

    // static async handleArmor(actor, args) {
    //     Logging.debug('handleArmor', actor, args);

    //     await AllSystems.handleItem(actor, 'equipment', args);
    // }

    // static async handleWeapon(actor, args) {
    //     Logging.debug('handleWeapon', actor, args);

    //     await AllSystems.handleItem(actor, 'weapon', args);
    // }

    // static async handleLoot(actor, args) {
    //     Logging.debug('handleLoot', actor, args);

    //     await AllSystems.handleStackedItem(actor, 'loot', args);
    // }

    // static async handleTool(actor, args) {
    //     Logging.debug('handleTool', actor, args);

    //     await AllSystems.handleStackedItem(actor, 'tool', args);
    // }

    // static async handleContainer(actor, args) {
    //     Logging.debug('handleContainer', actor, args);

    //     await AllSystems.handleItem(actor, 'container', args);
    // }

    // static async handleConsumable(actor, args) {
    //     Logging.debug('handleConsumable', actor, args);

    //     await AllSystems.handleStackedItem(actor, 'consumable', args);
    // }
}
