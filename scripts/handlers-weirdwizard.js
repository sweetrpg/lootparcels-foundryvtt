'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class SotWWSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', AllSystems.handleNamedCurrency);
        Registry.registerLootHandler('equipment', SotWWSystem.handleEquipment);
        Registry.registerLootHandler('consumable', SotWWSystem.handleConsumable);
        Registry.registerLootHandler('container', SotWWSystem.handleContainer);
        Registry.registerLootHandler('armor', SotWWSystem.handleArmor);
        Registry.registerLootHandler('weapon', SotWWSystem.handleWeapon);
    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

        await AllSystems.handleItem(actor, 'Equipment', args, {subtype: 'generic'});
    }

    static async handleConsumable(actor, args) {
        Logging.debug('handleConsumable', actor, args);

        await AllSystems.handleStackedItem(actor, 'Equipment', args, {subtype: 'consumable'});
    }

    static async handleContainer(actor, args) {
        Logging.debug('handleContainer', actor, args);

        await AllSystems.handleItem(actor, 'container', args, {subtype: 'container'});
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'armor', args, {subtype: 'armor'});
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'weapon', args, {subtype: 'weapon'});
    }

}
