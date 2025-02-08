/**
 * Twilight:2000
 */
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";

/**
 *
 */
export class T2K4eSystem {
    static stackedItemTypes = ['explosive', 'ammunition', 'gear'];

    /**
     *
     */
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerStackedItemTypes(this.stackedItemTypes);
        Registry.registerLinkEntryHandler(T2K4eSystem._handleLinkEntry);
        Registry.registerTextEntryHandler(T2K4eSystem._handleTextEntry);
        // Registry.registerDirectiveHandler('currency', BlackFlagSystem._handleCurrency);
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
        const stacked = args.stacked || Utils.shouldStackItem(item, T2K4eSystem.stackedItemTypes);
        const type = item.type;
        Logging.debug('type', type, 'stacked', stacked);

        if (stacked) {
            await AllSystems.handleStackedItem(actor, type, args, null, 'system.qty');
        }
        else {
            await AllSystems.handleItem(actor, type, args, null, 'system.qty');
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
        switch (args.type) {
            case 'explosive':
                type = 'gear';
                addlSystemInfo['itemType'] = 'Explosive';
                stacked = true;
                break;
        }
        Logging.debug('addlSystemInfo', addlSystemInfo);

        if (stacked) {
            await AllSystems.handleStackedItem(actor, type, args, addlSystemInfo, 'system.qty');
        }
        else {
            await AllSystems.handleItem(actor, type, args, addlSystemInfo, 'system.qty');
        }
    }

}
