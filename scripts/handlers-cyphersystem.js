'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class CypherSystem {

    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', CypherSystem.handleCurrency);
        Registry.registerLootHandler('parts', CypherSystem.handleParts);
        Registry.registerLootHandler('iotum', CypherSystem.handleIotum);
        Registry.registerLootHandler('equipment', CypherSystem.handleEquipment);
        Registry.registerLootHandler('item', CypherSystem.handleEquipment);
        Registry.registerLootHandler('gear', CypherSystem.handleEquipment);
        Registry.registerLootHandler('armor', CypherSystem.handleArmor);
        Registry.registerLootHandler('weapon', CypherSystem.handleWeapon);
        Registry.registerLootHandler('cypher', CypherSystem.handleCypher);
        Registry.registerLootHandler('artifact', CypherSystem.handleArtifact);
    }

    static async _handleItem(actor, type, args) {
        Logging.debug('_handleItem', actor, type, args);

    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

        await AllSystems.handleItem(actor, 'equipment', args);
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await AllSystems.handleItem(actor, 'armor', args);
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await AllSystems.handleItem(actor, 'attack', args);
    }

    static async handleIotum(actor, args) {
        Logging.debug('handleIotum', actor, args);

        let itemName = args.name;
        let itemDesc = "";
        let itemLevel = args.level;
        let quantity = parseInt(args.quantity);
        let itemData = null;

        const linkInfo = args.link;
        // if a link is provided and valid, get name and level from it
        if (linkInfo?.id !== undefined) {
            const item = await fromUuid(linkInfo.id);
            Logging.debug("(link) item", item);

            itemName = item.name;
            Logging.debug('itemName', itemName);
            itemDesc = item.system.description || "";

            itemLevel = item.system.basic.level || args.level || 1;
            Logging.debug("itemLevel", itemLevel);

            itemData = item.system;
            Logging.debug("itemData", itemData);
        }

        Logging.debug("actor items", actor.collections.items);
        for (let item of actor.collections.items) {
            Logging.debug("item", item);

            if (item.type == 'material' && item.name.toLowerCase() == itemName.toLowerCase()) {
                const currentAmount = parseInt(item.system.basic.quantity || 1);
                Logging.debug("currentAmount", typeof (currentAmount), currentAmount);
                Logging.debug("quantity", typeof (quantity), quantity);

                const newAmount = parseInt(currentAmount) + parseInt(quantity);
                Logging.debug("newAmount", newAmount);

                item.update({ 'system.basic.quantity': newAmount });

                return;
            }
        }

        const data = [{ name: itemName, type: 'material', basic: { quantity: quantity, level: itemLevel }, description: itemDesc }];
        Logging.debug("data", data);
        const item = await Item.create(data, { parent: actor });
        Logging.debug("item", item);
    }

    static async handleCypher(actor, args) {
        Logging.debug('handleCypher', actor, args);

        await AllSystems.handleItem(actor, 'cypher', args);
    }

    static async handleArtifact(actor, args) {
        Logging.debug('handleArtifact', actor, args);

        await AllSystems.handleItem(actor, 'artifact', args);
    }

    static async handleParts(actor, args) {
        Logging.debug('handleParts', actor, args);

        let quantity = parseInt(args.quantity);
        Logging.debug('quantity', quantity);

        // lookup parts item in actor sheet
        let foundParts = false;
        for (let item of actor.collections.items) {
            Logging.debug("item", item);

            if (item.type == 'material' && item.name.toLowerCase() == 'parts') {
                const currentAmount = parseInt(item.system.basic.quantity || 1);
                Logging.debug("currentAmount", currentAmount);

                const newAmount = currentAmount + quantity;
                Logging.debug("newAmount", newAmount);

                item.update({ 'system.basic.quantity': newAmount });

                // foundParts = true;
                return;
            }
        }

        // Logging.debug("foundParts", foundParts);
        // if (!foundParts) {
        // add an entry
        const data = [{ name: "Parts", type: 'material', 'basic.quantity': quantity }];
        const plan = await Item.create(data, { parent: actor });
        Logging.debug("plan", plan);
        // }
    }

    static async handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let name = args.name;
        let quantity = args.quantity;

        const currencyCount = parseInt(actor.system.settings.equipment.currency.numberCategories);
        Logging.debug('currencyCount', currencyCount);

        if (name == "" || name == "default") {
            Logging.debug("No name specified");
            // no name specified, so use default
            const amount = parseInt(actor.system.settings.equipment.currency.quantity1) + parseInt(quantity);
            Logging.debug('amount', amount);
            actor.update({ 'system.settings.equipment.currency.quantity1': amount });
            return;
        }

        Logging.debug("Looking for currency by name:", name);
        for (let i = 1; i <= currencyCount; i++) {
            const nameAttr = `labelCategory${i}`;
            const qtyAttr = `quantity${i}`;
            const currencyName = actor.system.settings.equipment.currency[nameAttr].trim().toLowerCase();
            Logging.debug('currencyName', currencyName);
            if (currencyName == name) {
                const amount = parseInt(actor.system.settings.equipment.currency[qtyAttr]) + parseInt(quantity);
                Logging.debug('amount', amount);
                const updateAttr = `system.settings.equipment.currency.quantity${i}`;
                Logging.debug('updateAttr', updateAttr);
                const data = {
                    [updateAttr]: amount,
                };
                Logging.debug("data", data);
                actor.update(data);
                return;
            }
        }
    }
}
