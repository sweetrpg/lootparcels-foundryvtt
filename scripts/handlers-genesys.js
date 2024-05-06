'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class GenesysSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', GenesysSystem.handleCurrency);
        Registry.registerLootHandler('item', GenesysSystem.handleEquipment);
        Registry.registerLootHandler('armor', GenesysSystem.handleArmor);
        Registry.registerLootHandler('weapon', GenesysSystem.handleWeapon);
        Registry.registerLootHandler('container', GenesysSystem.handleContainer);
        Registry.registerLootHandler('vehicleweapon', GenesysSystem.handleVehicleWeapon);
        Registry.registerLootHandler('consumable', GenesysSystem.handleConsumable);
    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

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

    static async handleVehicleWeapon(actor, args) {
        Logging.debug('handleVehicleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'vehicleWeapon', args);
    }

    static async handleContainer(actor, args) {
        Logging.debug('handleContainer', actor, args);

        await AllSystems.handleItem(actor, 'container', args);
    }

    static async handleConsumable(actor, args) {
        Logging.debug('handleConsumable', actor, args);

        await AllSystems.handleItem(actor, 'consumable', args);
    }

    static async handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let quantity = args.quantity;

        const currentAmount = actor.system.currency;
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        await actor.update({ 'system.currency': amount });
    }
}
