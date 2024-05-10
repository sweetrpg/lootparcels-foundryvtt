/**
 *
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

/**
 *
 */
export class BlackFlagSystem {
    static stackedItemTypes = ['consumable', 'ammunition', 'tool', 'gear', 'currency', 'sundry'];

    /**
     *
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        // Registry.registerStackedItemCallback(BlackFlagSystem._isItemStackable);
        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', BlackFlagSystem._handleCurrency);
        // Registry.registerLootHandler('currency', AllSystems.handleNamedCurrency);
        // Registry.registerLootHandler('equipment', BlackFlagSystem.handleEquipment);
        // Registry.registerLootHandler('item', BlackFlagSystem.handleEquipment);
        // Registry.registerLootHandler('gear', BlackFlagSystem.handleEquipment);
        // Registry.registerLootHandler('consumable', BlackFlagSystem.handleConsumable);
        // Registry.registerLootHandler('container', BlackFlagSystem.handleContainer);
        // Registry.registerLootHandler('loot', BlackFlagSystem.handleLoot);
        // Registry.registerLootHandler('tool', BlackFlagSystem.handleTool);
        // Registry.registerLootHandler('armor', BlackFlagSystem.handleArmor);
        // Registry.registerLootHandler('weapon', BlackFlagSystem.handleWeapon);
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        const name = args.text?.toLowerCase() || 'gp';
        Logging.debug('name', name);
        const amount = args.quantity || 1;

        const items = actor.collections.items.filter(i => i.system.identifier?.value == name);
        Logging.debug('items', items);

        if (items.length > 0) {
            const currentAmount = parseInt(items[0].system.quantity);
            Logging.debug("currentAmount", currentAmount);
            const newAmount = currentAmount + amount;
            Logging.debug("newAmount", newAmount);
            const data = { system: { quantity: newAmount } };
            Logging.debug("data", data);
            await items[0].update(data);
            return;
        }

        const localeKey = `LOOTPARCELS.Currency.${name}`;
        let localizedName = game.i18n.localize(localeKey);
        if(localizedName == localeKey) { localizedName = name; }
        const data = { name: localizedName, type: 'currency', system: { identifier: { value: name }, quantity: amount } };
        Logging.debug("data", data);
        const newItem = await Item.create([data], { parent: actor });
        Logging.debug("newItem", newItem);
    }

    // static async handleEquipment(actor, args) {
    //     Logging.debug('handleEquipment', actor, args);

    //     await AllSystems.handleItem(actor, 'equipment', args);
    // }

    // static async handleArmor(actor, args) {
    //     Logging.debug('handleArmor', actor, args);

    //     await AllSystems.handleItem(actor, 'equipment', args);
    // }

    // static async handleWeapon(actor, args) {
    //     Logging.debug('handleWeapon', actor, args);

    //     await AllSystems.handleItem(actor, 'weapon', args);
    // }

    // static async handleLoot(actor, args) {
    //     Logging.debug('handleLoot', actor, args);

    //     await AllSystems.handleStackedItem(actor, 'loot', args);
    // }

    // static async handleTool(actor, args) {
    //     Logging.debug('handleTool', actor, args);

    //     await AllSystems.handleStackedItem(actor, 'tool', args);
    // }

    // static async handleContainer(actor, args) {
    //     Logging.debug('handleContainer', actor, args);

    //     await AllSystems.handleItem(actor, 'container', args);
    // }

    // static async handleConsumable(actor, args) {
    //     Logging.debug('handleConsumable', actor, args);

    //     await AllSystems.handleStackedItem(actor, 'consumable', args);
    // }
}
