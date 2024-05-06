'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class A5eSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', AllSystems.handleNamedCurrency);
        Registry.registerLootHandler('equipment', A5eSystem.handleEquipment);
        Registry.registerLootHandler('consumable', A5eSystem.handleConsumable);
        Registry.registerLootHandler('container', A5eSystem.handleContainer);
        Registry.registerLootHandler('loot', A5eSystem.handleLoot);
        Registry.registerLootHandler('tool', A5eSystem.handleTool);
        Registry.registerLootHandler('armor', A5eSystem.handleArmor);
        Registry.registerLootHandler('weapon', A5eSystem.handleWeapon);
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

        await AllSystems.handleItem(actor, 'loot', args);
    }

    static async handleTool(actor, args) {
        Logging.debug('handleTool', actor, args);

        await AllSystems.handleItem(actor, 'tool', args);
    }

    static async handleContainer(actor, args) {
        Logging.debug('handleContainer', actor, args);

        await AllSystems.handleItem(actor, 'container', args);
    }

    static async handleConsumable(actor, args) {
        Logging.debug('handleConsumable', actor, args);

        await AllSystems.handleItem(actor, 'consumable', args);
    }
}
