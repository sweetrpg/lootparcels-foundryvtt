/**
 * Pathfinder, 2nd Edition
 */
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

        Registry.registerDirectiveHandler('currency', PF2eSystem._handleCurrency);
        Registry.registerStackedItemCallback(PF2eSystem._isItemStackable);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
    }

    static _isItemStackable(item) {
        Logging.debug("_isItemStackable", item);

        return ((item.type == 'consumable') ||
        (item.type == 'kit') ||
        (item.type == 'treasure') ||
            (item.type == 'loot' &&
                (item.system.subType == 'misc' ||
                    item.system.subType == 'ammo')));
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        const name = args.name || 'gp';
        const quantity = parseInt(args.quantity || 1);

        // see if there's an entry present
        for (let item of actor.collections.items) {
            Logging.debug('item', item);

            if (item.system.stackGroup == 'coins' && item.system.slug == PF2eSystem.currencySlugMap[name]) {
                // adjust quantity
                const currentAmount = parseInt(item.system.quantity);
                Logging.debug('currentAmount', currentAmount);
                const newAmount = currentAmount + quantity;
                Logging.debug('newAmount', newAmount);
                const data = { ['system.quantity']: newAmount };
                await item.update(data);
                return;
            }
        }

        const data = { name: name, type: 'treasure', system: { stackGroup: 'coins', slug: PF2eSystem.currencySlugMap[name], [`price.value.${name}`]: 1 } };
        Logging.debug("data", data);
        const item = await Item.create([data], { parent: actor });
        Logging.debug("item", item);

        const qtyData = { 'system.quantity': quantity };
        await item.update(qtyData);
    }
}
