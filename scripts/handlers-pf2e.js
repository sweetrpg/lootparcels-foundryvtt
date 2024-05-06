'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class PF2eSystem {
    static currencySlugMap = {
        'gp': 'gold-pieces',
        'sp': 'silver-pieces',
        'pp': 'platinum-pieces',
        'cp': 'copper-pieces',
    };

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', PF2eSystem.handleCurrency);
        Registry.registerLootHandler('ammo', PF2eSystem.handleAmmo);
        Registry.registerLootHandler('equipment', PF2eSystem.handleEquipment);
        Registry.registerLootHandler('container', PF2eSystem.handleContainer);
        Registry.registerLootHandler('consumable', PF2eSystem.handleConsumable);
        Registry.registerLootHandler('loot', PF2eSystem.handleLoot);
        Registry.registerLootHandler('armor', PF2eSystem.handleArmor);
        Registry.registerLootHandler('shield', PF2eSystem.handleShield);
        Registry.registerLootHandler('weapon', PF2eSystem.handleWeapon);
        Registry.registerLootHandler('treasure', PF2eSystem.handleTreasure);
        Registry.registerLootHandler('kit', PF2eSystem.handleKit);
    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args, { subtype: '' });
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

        await AllSystems.handleStackedItem(actor, 'loot', args, { subtype: 'misc' });
    }

    static async handleAmmo(actor, args) {
        Logging.debug('handleAmmo', actor, args);

        await AllSystems.handleStackedItem(actor, 'loot', args, { subtype: 'ammo' });
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args, { subtype: 'armor' });
    }

    static async handleShield(actor, args) {
        Logging.debug('handleShield', actor, args);

        await AllSystems.handleItem(actor, 'shield', args);
    }

    static async handleKit(actor, args) {
        Logging.debug('handleKit', actor, args);

        await AllSystems.handleStackedItem(actor, 'kit', args);
    }

    static async handleTreasure(actor, args) {
        Logging.debug('handleTreasure', actor, args);

        await AllSystems.handleStackedItem(actor, 'treasure', args);
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'weapon', args);
    }

    static async handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        const name = args.name || 'gp';
        const quantity = parseInt(args.quantity || 1);

        // see if there's an entry present
        for (let item of actor.collections.items) {
            Logging.debug('item', item);

            if (item.system.stackGroup == 'coins' && item.system.slug == PF2eSystem.currencySlugMap[name]) {
                // adjust quantity
                const currentAmount = parseInt(item.system.price.value[name]);
                Logging.debug('currentAmount', currentAmount);
                const newAmount = currentAmount + quantity;
                Logging.debug('newAmount', newAmount);
                const data = { [`system.price.value.${name}`]: newAmount };
                await item.update(data);
                return;
            }
        }

        const data = { name: name, type: 'treasure', system: { stackGroup: 'coins', slug: PF2eSystem.currencySlugMap[name], [`price.value.${name}`]: quantity } };
        Logging.debug("data", data);
        const item = await Item.create([data], { parent: actor });
        Logging.debug("item", item);

        const qtyData = { 'system.quantity': quantity };
        await item.update(qtyData);
        // await AllSystems.handleStackedItem(actor, 'treasure', args, { stackGroup: 'coins', slug:  })
    }
}
