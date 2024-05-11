/**
 *
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

/**
 * Class container for all Cypher System related functions.
 */
export class CypherSystem {
    static stackedItemTypes = ['material'];

    /**
     *
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(CypherSystem._handleLinkEntry);
        Registry.registerTextEntryHandler(CypherSystem._handleTextEntry);
        Registry.registerDirectiveHandler('currency', CypherSystem._handleCurrency);
        Registry.registerDirectiveHandler('parts', CypherSystem._handleParts);
        Registry.registerDirectiveHandler('iotum', CypherSystem._handleIotum);
    }

    /**
     *
     * @param {CypherActor} actor
     * @param {object} args
     */
    static async _handleLinkEntry(actor, args) {
        Logging.debug('_handleLinkEntry', actor, args);

        const item = await fromUuid(args.link.id);
        Logging.debug('item', item);
        const stacked = args.stacked || Utils.shouldStackItem(item, this.stackedItemTypes);
        const type = item.type;
        Logging.debug('type', type, 'stacked', stacked);
        const addlSystemInfo = {};
        if(args.level) {
            addlSystemInfo['basic'] = {
                'level': args.level,
            }
        }
        Logging.debug('addlSystemInfo', addlSystemInfo);

        if (stacked) {
            await AllSystems.handleStackedItem(actor, type, args, addlSystemInfo, 'system.basic.quantity');
        }
        else {
            await AllSystems.handleItem(actor, type, args, addlSystemInfo, 'system.basic.quantity');
        }
    }

    /**
     *
     * @param {CypherActor} actor
     * @param {object} args
     */
    static async _handleTextEntry(actor, args) {
        Logging.debug('_handleTextEntry', actor, args);

        const stacked = args.stacked || false;
        const type = args.type || 'item';
        Logging.debug('type', type, 'stacked', stacked);
        const addlSystemInfo = {};
        if(args.level) {
            addlSystemInfo['basic'] = {
                'level': args.level,
            }
        }
        Logging.debug('addlSystemInfo', addlSystemInfo);

        if (stacked) {
            await AllSystems.handleStackedItem(actor, type, args, addlSystemInfo, 'system.basic.quantity');
        }
        else {
            await AllSystems.handleItem(actor, type, args, addlSystemInfo, 'system.basic.quantity');
        }
    }

    /**
     *
     * @param {CypherActor} actor
     * @param {object} args
     */
    static async _handleIotum(actor, args) {
        Logging.debug('_handleIotum', actor, args);

        let itemLevel = args.level || 1;

        await AllSystems.handleStackedItem(actor, 'material', args, { ['basic.level']: itemLevel }, 'system.basic.quantity');
    }

    /**
     *
     * @param {CypherActor} actor
     * @param {object} args
     */
    static async _handleParts(actor, args) {
        Logging.debug('_handleParts', actor, args);

        args.name = game.i18n.localize('LOOTPARCELS.Parts');

        await AllSystems.handleStackedItem(actor, 'material', args, {}, 'system.basic.quantity');
    }

    /**
     *
     * @param {CypherActor} actor
     * @param {object} args
     */
    static async _handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let name = args.name || 'default';
        let quantity = args.quantity;

        const currencyCount = parseInt(actor.system.settings.equipment.currency.numberCategories);
        Logging.debug('currencyCount', currencyCount);

        if (name == "" || name == "default") {
            Logging.debug("No name specified");
            // no name specified, so use default
            await AllSystems.updateCurrency(actor, 'system.settings.equipment.currency', 'quantity1', quantity);
            return;
        }

        Logging.debug("Looking for currency by name:", name);
        for (let i = 1; i <= currencyCount; i++) {
            const nameAttr = `labelCategory${i}`;
            const qtyAttr = `quantity${i}`;
            const currencyName = actor.system.settings.equipment.currency[nameAttr].trim().toLowerCase();
            Logging.debug('currencyName', currencyName);
            if (currencyName == name) {
                await AllSystems.updateCurrency(actor, 'system.settings.equipment.currency', qtyAttr, quantity);
                return;
            }
        }
    }
}
