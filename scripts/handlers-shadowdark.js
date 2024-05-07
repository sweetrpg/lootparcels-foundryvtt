'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class ShadowdarkSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', ShadowdarkSystem.handleCurrency);
        Registry.registerLootHandler('item', ShadowdarkSystem.handleItem);
        Registry.registerLootHandler('equipment', ShadowdarkSystem.handleItem);
        Registry.registerLootHandler('gear', ShadowdarkSystem.handleItem);
        Registry.registerLootHandler('armor', ShadowdarkSystem.handleArmor);
        Registry.registerLootHandler('weapon', ShadowdarkSystem.handleWeapon);
    }

    static async handleItem(actor, args) {
        Logging.debug('handleBasic', actor, args);

        await AllSystems.handleStackedItem(actor, '', args);
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'Armor', args);
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'Weapon', args);
    }

    static async handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let name = args.name
        let quantity = args.quantity;

        const currentAmount = actor.system.coins[name];
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        await actor.update({ [`system.coins.${name}`]: amount });
    }
}
