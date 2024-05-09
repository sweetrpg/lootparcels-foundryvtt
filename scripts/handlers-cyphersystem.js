
import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class CypherSystem {
    static stackedItemTypes = ['material'];

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLinkEntryHandler(CypherSystem._handleLinkEntry);
        Registry.registerTextEntryHandler(CypherSystem._handleTextEntry);
        Registry.registerDirectiveHandler('currency', CypherSystem._handleCurrency);
        // Registry.registerLootHandler('currency', CypherSystem.handleCurrency);
        Registry.registerDirectiveHandler('parts', CypherSystem._handleParts);
        Registry.registerDirectiveHandler('iotum', CypherSystem._handleIotum);
        // Registry.registerLootHandler('equipment', CypherSystem.handleEquipment);
        // Registry.registerLootHandler('item', CypherSystem.handleEquipment);
        // Registry.registerLootHandler('gear', CypherSystem.handleEquipment);
        // Registry.registerLootHandler('armor', CypherSystem.handleArmor);
        // Registry.registerLootHandler('weapon', CypherSystem.handleWeapon);
        // Registry.registerLootHandler('cypher', CypherSystem.handleCypher);
        // Registry.registerLootHandler('artifact', CypherSystem.handleArtifact);
    }

    static _shouldStackItem(item) {
        Logging.debug('_shouldStackItem', item);

        if (this.stackedItemTypes.includes(item.type.toLowerCase())) {
            return true;
        }

        return false;
    }

    static async _handleLinkEntry(actor, args) {
        Logging.debug('_handleLinkEntry', actor, args);

        const item = await fromUuid(args.link.id);
        Logging.debug('item', item);
        const stacked = args.stacked || CypherSystem._shouldStackItem(item);
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

    // static async _handleItem(actor, type, args) {
    //     Logging.debug('_handleItem', actor, type, args);

    // }

    // static async handleEquipment(actor, args) {
    //     Logging.debug('handleEquipment', actor, args);

    //     await AllSystems.handleItem(actor, 'equipment', args);
    // }

    // static async handleArmor(actor, args) {
    //     Logging.debug('handleArmor', actor, args);

    //     await AllSystems.handleItem(actor, 'armor', args);
    // }

    // static async handleWeapon(actor, args) {
    //     Logging.debug('handleWeapon', actor, args);

    //     await AllSystems.handleItem(actor, 'attack', args);
    // }

    static async _handleIotum(actor, args) {
        Logging.debug('_handleIotum', actor, args);

        // let itemName = args.name;
        let itemLevel = args.level || 1;
        // let quantity = parseInt(args.quantity);
        // let itemData = null;

        await AllSystems.handleStackedItem(actor, 'material', args, { ['basic.level']: itemLevel }, 'system.basic.quantity');

        // const linkInfo = args.link;
        // // if a link is provided and valid, get name and level from it
        // if (linkInfo?.id !== undefined) {
        //     const item = await fromUuid(linkInfo.id);
        //     Logging.debug("(link) item", item);

        //     itemName = item.name;
        //     Logging.debug('itemName', itemName);

        //     itemLevel = item.system.basic.level || args.level || 1;
        //     Logging.debug("itemLevel", itemLevel);

        //     itemData = item.system;
        //     Logging.debug("itemData", itemData);
        // }

        // Logging.debug("actor items", actor.collections.items);
        // for (let item of actor.collections.items) {
        //     Logging.debug("item", item);

        //     if (item.type == 'material' && item.name.toLowerCase() == itemName.toLowerCase()) {
        //         const currentAmount = parseInt(item.system.basic.quantity || 1);
        //         Logging.debug("currentAmount", typeof (currentAmount), currentAmount);
        //         Logging.debug("quantity", typeof (quantity), quantity);

        //         const newAmount = parseInt(currentAmount) + parseInt(quantity);
        //         Logging.debug("newAmount", newAmount);

        //         item.update({ 'system.basic.quantity': newAmount });

        //         return;
        //     }
        // }

        // const data = { name: itemName, type: 'material', basic: { quantity: quantity, level: itemLevel } };
        // Logging.debug("data", data);
        // const item = await Item.create([data], { parent: actor });
        // Logging.debug("item", item);
    }

    // static async handleCypher(actor, args) {
    //     Logging.debug('handleCypher', actor, args);

    //     await AllSystems.handleItem(actor, 'cypher', args);
    // }

    // static async handleArtifact(actor, args) {
    //     Logging.debug('handleArtifact', actor, args);

    //     await AllSystems.handleItem(actor, 'artifact', args);
    // }

    static async _handleParts(actor, args) {
        Logging.debug('_handleParts', actor, args);

        // let quantity = parseInt(args.quantity);
        // Logging.debug('quantity', quantity);

        args.name = game.i18n.localize('LOOTPARCELS.Parts');

        await AllSystems.handleStackedItem(actor, 'material', args, {}, 'system.basic.quantity');

        // // lookup parts item in actor sheet
        // let foundParts = false;
        // for (let item of actor.collections.items) {
        //     Logging.debug("item", item);

        //     if (item.type == 'material' && item.name.toLowerCase() == 'parts') {
        //         const currentAmount = parseInt(item.system.basic.quantity || 1);
        //         Logging.debug("currentAmount", currentAmount);

        //         const newAmount = currentAmount + quantity;
        //         Logging.debug("newAmount", newAmount);

        //         item.update({ 'system.basic.quantity': newAmount });

        //         // foundParts = true;
        //         return;
        //     }
        // }

        // // Logging.debug("foundParts", foundParts);
        // // if (!foundParts) {
        // // add an entry
        // const data = [{ name: "Parts", type: 'material', 'basic.quantity': quantity }];
        // const plan = await Item.create(data, { parent: actor });
        // Logging.debug("plan", plan);
        // // }
    }

    static async _handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let name = args.name;
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
