/**
 *
 */
import { Logging } from "./logging.js";
import { Utils } from "./utilities.js";
import { Registry } from "./registry.js";

/**
 *
 */
export class AllSystems {

    /**
     *
     * @param {Actor} actor
     * @param {object} args
     */
    static async handleLinkEntry(actor, args) {
        Logging.debug('handleLinkEntry', actor, args);

        const item = await fromUuid(args.link.id);
        Logging.debug('item', item);
        const stackedItemTypes = Registry.getStackedItemTypes();
        const stackedItemCallback = Registry.getStackedItemCallback();
        Logging.debug('stackedItemTypes', stackedItemTypes, "stackedItemCallback", stackedItemCallback);
        const stacked = args.stacked || Utils.shouldStackItem(item, stackedItemTypes, stackedItemCallback);
        const type = item.type;
        Logging.debug('type', type, 'stacked', stacked);

        if (stacked) {
            await AllSystems.handleStackedItem(actor, type, args);
        }
        else {
            await AllSystems.handleItem(actor, type, args);
        }
    }

    /**
     *
     * @param {Actor} actor
     * @param {object} args
     */
    static async handleTextEntry(actor, args) {
        Logging.debug('handleTextEntry', actor, args);

        const stacked = args.stacked || false;
        const type = args.type || 'item';
        Logging.debug('type', type, 'stacked', stacked);

        if (stacked) {
            await AllSystems.handleStackedItem(actor, type, args);
        }
        else {
            await AllSystems.handleItem(actor, type, args);
        }
    }

    /**
     *
     * @param {Actor} actor
     * @param {*} type
     * @param {*} args
     */
    static async handleItem(actor, type, args, addlSystemInfo) {
        Logging.debug('handleItem', actor, type, args, addlSystemInfo);

        let itemName = args.name || args.text || "An item with no name";
        let itemLevel = args.level;
        let quantity = parseInt(args.quantity);
        let itemData = null;

        const linkInfo = args.link;
        Logging.debug("linkInfo", linkInfo);
        // if a link is provided and valid, get name and level from it
        if (linkInfo?.id !== undefined) {
            const item = await fromUuid(linkInfo.id);
            Logging.debug("(link) item", item);

            if (item !== undefined && item !== null) {
                itemName = item.name;
                Logging.debug('itemName', itemName);
                itemData = item;
            }
            else {
                itemName = linkInfo.name;
            }
            itemLevel = 1;
        }

        for (let i = 0; i < quantity; i++) {
            Logging.debug("i", i);

            if (itemData !== null) {
                const item = await Item.create([itemData], { parent: actor });
                Logging.debug("item", item);
                continue;
            }

            if (type == null || type == '') {
                type = args.type || 'item';
            }
            const data = { name: itemName, type: type, system: addlSystemInfo || {} };
            Logging.debug("data", data);
            const item = await Item.create([data], { parent: actor });
            Logging.debug("item", item);
        }
    }

    static async handleStackedItem(actor, type, args, addlSystemInfo, qtyProp) {
        Logging.debug('handleStackedItem', actor, type, args, addlSystemInfo, qtyProp);

        let itemName = args.name || args.text || "An item with no name";
        let itemLevel = args.level;
        let quantity = parseInt(args.quantity);
        let quantityProperty = qtyProp || Registry.stackedItemQuantityPath || 'system.quantity';
        let itemData = null;

        const linkInfo = args.link;
        Logging.debug("linkInfo", linkInfo);
        // if a link is provided and valid, get name and level from it
        if (linkInfo?.id !== undefined) {
            const item = await fromUuid(linkInfo.id);
            Logging.debug("(link) item", item);

            if (item !== undefined && item !== null) {
                itemName = item.name;
                Logging.debug('itemName', itemName);
                itemData = item;
            }
            else {
                itemName = linkInfo.name;
            }
            itemLevel = 1;
        }

        // see if there's an item present
        for (let item of actor.collections.items) {
            Logging.debug('item', item);

            if (item.name == itemName) {
                // adjust quantity
                const qtyValue = foundry.utils.getProperty(item, quantityProperty);
                Logging.debug('qtyValue', qtyValue);
                const currentAmount = parseInt(qtyValue);
                Logging.debug('currentAmount', currentAmount);
                const newAmount = currentAmount + quantity;
                Logging.debug('newAmount', newAmount);
                const data = { [quantityProperty]: newAmount };
                Logging.debug("data", data);
                try {
                    await item.update(data);
                }
                catch (error) {
                    Logging.debug("item.update threw error", error);
                    foundry.utils.setProperty(item, quantityProperty, newAmount);
                }
                return;
            }
        }

        if (itemData !== null) {
            // Logging.debug("itemData (before)", itemData);
            // itemData.system.quantity = quantity;
            // Logging.debug("itemData (after)", itemData);

            const item = await Item.create([itemData], { parent: actor });
            Logging.debug("item", item);

            // adjust quantity
            const data = { [quantityProperty]: quantity };
            Logging.debug("data", data);
            try {
                await item.forEach(async i => await i.update(data) );
            }
            catch (error) {
                Logging.debug("item.update threw error", error);
                foundry.utils.setProperty(item, quantityProperty, quantity);
            }
            return;
        }

        if (type == null || type == '') {
            type = args.type || 'item';
        }
        const data = { name: itemName, type: type, system: addlSystemInfo || {} };
        Logging.debug("data", data);
        const item = await Item.create([data], { parent: actor });
        Logging.debug("item", item);

        const qtyData = { [quantityProperty]: quantity };
        Logging.debug('qtyData', qtyData);
        try {
            await item.update(qtyData);
        }
        catch (error) {
            Logging.debug("item.update threw error", error);
            foundry.utils.setProperty(item, quantityProperty, quantity);
        }
    }

    /**
     *
     * @param {*} actor
     * @param {*} args
     */
    static async handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let name = args.name || args.text || 'default';
        let quantity = args.quantity;

        AllSystems.updateCurrency(actor, 'system.currency', name, quantity);
    }

    static async updateCurrency(actor, basePath, name, quantity) {
        Logging.debug('updateCurrency', actor, basePath, name, quantity);

        const fullPath = `${basePath}.${name}`;
        Logging.debug('fullPath', fullPath);
        const currentAmount = foundry.utils.getProperty(actor, fullPath);
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        const data = {
            [fullPath]: amount,
        };
        Logging.debug('data', data);
        await actor.update(data);
    }
}
