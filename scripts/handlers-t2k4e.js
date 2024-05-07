'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class T2K4eSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        // Registry.registerLootHandler('currency', TOR2eSystem.handleCurrency);
        Registry.registerLootHandler('ammo', T2K4eSystem.handleAmmo);
        Registry.registerLootHandler('ammunition', T2K4eSystem.handleAmmo);
        Registry.registerLootHandler('explosive', T2K4eSystem.handleExplosive);
        Registry.registerLootHandler('gear', T2K4eSystem.handleGear);
        Registry.registerLootHandler('equipment', T2K4eSystem.handleGear);
        Registry.registerLootHandler('item', T2K4eSystem.handleGear);
        Registry.registerLootHandler('armor', T2K4eSystem.handleArmor);
        Registry.registerLootHandler('weapon', T2K4eSystem.handleWeapon);
    }

    static async handleAmmo(actor, args) {
        Logging.debug('handleAmmo', actor, args);

        await AllSystems.handleStackedItem(actor, 'ammunition', args, null, 'system.qty');
    }

    static async handleExplosive(actor, args) {
        Logging.debug('handleExplosive', actor, args);

        await AllSystems.handleStackedItem(actor, 'gear', args, {itemType: "Explosive"}, 'system.qty');
    }

    static async handleGear(actor, args) {
        Logging.debug('handleGear', actor, args);

        await AllSystems.handleItem(actor, 'gear', args);
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'armor', args);
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'weapon', args);
    }

    // static async handleCurrency(actor, args) {
    //     Logging.debug('handleCurrency', actor, args);

    //     let quantity = args.quantity;

    //     const currentAmount = actor.system.treasure.value;
    //     Logging.debug("currentAmount", currentAmount);
    //     const amount = parseInt(currentAmount) + parseInt(quantity);
    //     Logging.debug('amount', amount);
    //     await actor.update({ 'system.treasure.value': amount });
    // }
}
