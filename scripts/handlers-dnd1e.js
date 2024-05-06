'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class DnD1eSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        // Registry.registerLootHandler('currency', TOR2eSystem.handleCurrency);
        // Registry.registerLootHandler('item', TOR2eSystem.handleMisc);
        // Registry.registerLootHandler('armor', TOR2eSystem.handleArmor);
        // Registry.registerLootHandler('weapon', TOR2eSystem.handleWeapon);
    }

    // static async handleMisc(actor, args) {
    //     Logging.debug('handleMisc', actor, args);

    //     await AllSystems.handleItem(actor, 'miscellaneous', args);
    // }

    // static async handleArmor(actor, args) {
    //     Logging.debug('handleArmor', actor, args);

    //     await AllSystems.handleItem(actor, 'armor', args);
    // }

    // static async handleWeapon(actor, args) {
    //     Logging.debug('handleWeapon', actor, args);

    //     await AllSystems.handleItem(actor, 'weapon', args);
    // }

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
