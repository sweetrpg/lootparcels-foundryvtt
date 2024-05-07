'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class BlackFlagSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', AllSystems.handleNamedCurrency);
        Registry.registerLootHandler('equipment', BlackFlagSystem.handleEquipment);
        Registry.registerLootHandler('item', BlackFlagSystem.handleEquipment);
        Registry.registerLootHandler('gear', BlackFlagSystem.handleEquipment);
        Registry.registerLootHandler('consumable', BlackFlagSystem.handleConsumable);
        Registry.registerLootHandler('container', BlackFlagSystem.handleContainer);
        Registry.registerLootHandler('loot', BlackFlagSystem.handleLoot);
        Registry.registerLootHandler('tool', BlackFlagSystem.handleTool);
        Registry.registerLootHandler('armor', BlackFlagSystem.handleArmor);
        Registry.registerLootHandler('weapon', BlackFlagSystem.handleWeapon);
    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args);
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args);
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'weapon', args);
    }

    static async handleLoot(actor, args) {
        Logging.debug('handleLoot', actor, args);

        await AllSystems.handleStackedItem(actor, 'loot', args);
    }

    static async handleTool(actor, args) {
        Logging.debug('handleTool', actor, args);

        await AllSystems.handleStackedItem(actor, 'tool', args);
    }

    static async handleContainer(actor, args) {
        Logging.debug('handleContainer', actor, args);

        await AllSystems.handleItem(actor, 'container', args);
    }

    static async handleConsumable(actor, args) {
        Logging.debug('handleConsumable', actor, args);

        await AllSystems.handleStackedItem(actor, 'consumable', args);
    }
}
