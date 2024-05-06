'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class PF1System {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', AllSystems.handleNamedCurrency);
        Registry.registerLootHandler('ammo', PF1System.handleAmmo);
        Registry.registerLootHandler('equipment', PF1System.handleEquipment);
        Registry.registerLootHandler('container', PF1System.handleContainer);
        Registry.registerLootHandler('consumable', PF1System.handleConsumable);
        Registry.registerLootHandler('loot', PF1System.handleLoot);
        Registry.registerLootHandler('armor', PF1System.handleArmor);
        Registry.registerLootHandler('weapon', PF1System.handleWeapon);
        Registry.registerLootHandler('wondrous', PF1System.handleWondrous);
    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args, {subtype: ''});
    }

    static async handleContainer(actor, args) {
        Logging.debug('handleContainer', actor, args);

        await AllSystems.handleItem(actor, 'container', args);
    }

    static async handleConsumable(actor, args) {
        Logging.debug('handleConsumable', actor, args);

        await AllSystems.handleStackedItem(actor, 'consumable', args);
    }

    static async handleLoot(actor, args) {
        Logging.debug('handleLoot', actor, args);

        await AllSystems.handleStackedItem(actor, 'loot', args, {subtype: 'misc'});
    }

    static async handleAmmo(actor, args) {
        Logging.debug('handleAmmo', actor, args);

        await AllSystems.handleStackedItem(actor, 'loot', args, {subtype: 'ammo'});
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args, {subtype: 'armor'});
    }

    static async handleWondrous(actor, args) {
        Logging.debug('handleWondrous', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args, {subtype: 'wondrous'});
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'weapon', args);
    }

}
