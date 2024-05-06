'use strict';

import { AllSystems } from "./handlers-all.js";
import { Registry } from "./registry.js";
import { Logging } from "./logging.js";

export class SotWWSystem {
    static registerHandlers() {
        Logging.debug("registerHandlers");

        Registry.registerLootHandler('currency', SotWWSystem.handleCurrency);
        Registry.registerLootHandler('equipment', SotWWSystem.handleEquipment);
        Registry.registerLootHandler('armor', SotWWSystem.handleArmor);
        Registry.registerLootHandler('weapon', SotWWSystem.handleWeapon);
    }

    static async _handleItem(actor, type, args) {
        Logging.debug('_handleItem', actor, type, args);

        let itemName = args.name;
        let itemDesc = "";
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
                itemDesc = item.system.description || "";

                itemData = item;
            }
            else {
                itemName = linkInfo.name;
            }
            itemLevel = 1;
        }

        if (itemData !== null) {
            const item = await Item.create([itemData], { parent: actor });
            Logging.debug("item", item);
            return;
        }

        const data = { name: itemName, type: 'Equipment', system: { subtype: type }, quantity: quantity, description: { value: itemDesc } };
        if (itemData !== null) {
            data.system = {
                subtype: type,
                ...itemData
            }
        }
        Logging.debug("data", data);
        const item = await Item.create([data], { parent: actor });
        Logging.debug("item", item);
    }

    static async handleEquipment(actor, args) {
        Logging.debug('handleEquipment', actor, args);

        await SotWWSystem._handleItem(actor, 'equipment', args);
    }

    static async handleArmor(actor, args) {
        Logging.debug('handleArmor', actor, args);

        await SotWWSystem._handleItem(actor, 'armor', args);
    }

    static async handleWeapon(actor, args) {
        Logging.debug('handleWeapon', actor, args);

        await SotWWSystem._handleItem(actor, 'weapon', args);
    }

    static async handleCurrency(actor, args) {
        Logging.debug('handleCurrency', actor, args);

        let name = args.name;
        let quantity = args.quantity;

        if (name == "" || name == "default") {
            Logging.debug("No name specified");
            name = 'gp';
        }

        const currentAmount = actor.system.currency[name];
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        const updateAttr = `system.currency.${name}`;
        Logging.debug("updateAttr", updateAttr);
        const data = {};
        data[updateAttr] = amount;
        Logging.debug("data", data);
        await actor.update(data);
        Logging.debug("actor (after update)", actor);
    }
}
