/**
 * Black Flag Roleplaying
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

        Registry.registerStackedItemTypes(BlackFlagSystem.stackedItemTypes);
        Registry.registerLinkEntryHandler(AllSystems.handleLinkEntry);
        Registry.registerTextEntryHandler(AllSystems.handleTextEntry);
        Registry.registerDirectiveHandler('currency', BlackFlagSystem._handleCurrency);
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

}
