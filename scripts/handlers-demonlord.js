'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class SotDLSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', SotDLSystem.handleCurrency);
        Registry.registerLootHandler('item', SotDLSystem.handleEquipment);
        Registry.registerLootHandler('consumable', SotDLSystem.handleConsumable);
        Registry.registerLootHandler('armor', SotDLSystem.handleArmor);
        Registry.registerLootHandler('weapon', SotDLSystem.handleWeapon);
        Registry.registerLootHandler('ammo', SotDLSystem.handleAmmo);
    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

        await AllSystems.handleItem(actor, 'item', args);
    }

    static async handleConsumable(actor, args) {
        Logging.debug('handleConsumable', actor, args);

        await AllSystems.handleStackedItem(actor, 'item', args);
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'armor', args);
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'weapon', args);
    }

    static async handleAmmo(actor, args) {
        Logging.debug('handleAmmo', actor, args);

        await AllSystems.handleStackedItem(actor, 'ammo', args);
    }

    static async handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let name = args.name;
        let quantity = args.quantity;

        if (name == "" || name == "default") {
            Logging.debug("No name specified");
            name = 'gp';
        }

        const currentAmount = actor.system.wealth[name];
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        const updateAttr = `system.wealth.${name}`;
        Logging.debug("updateAttr", updateAttr);
        const data = {}
        data[updateAttr] = amount;
        Logging.debug("data", data);
        await actor.update(data);
    }
}
