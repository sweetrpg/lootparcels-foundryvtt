'use strict';

import { Logging } from "./logging.js";

export class AllSystems {

    /**
     *
     * @param {*} actor
     * @param {*} type
     * @param {*} args
     */
    static async handleItem(actor, type, args) {
        Logging.debug('_handleGenericItem', actor, type, args);

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

        for (let i = 0; i < quantity; i++) {
            Logging.debug("i", i);

            if (itemData !== null) {
                const item = await Item.create([itemData], { parent: actor });
                Logging.debug("item", item);
                continue;
            }

            const data = { name: itemName, type: type, system: { quantity: quantity }, description: { value: itemDesc } };
            if (itemData !== null) {
                data.system = {
                    quantity: quantity,
                    ...itemData
                }
            }
            Logging.debug("data", data);
            const item = await Item.create([data], { parent: actor });
            Logging.debug("item", item);
        }
    }

    /**
     *
     * @param {*} actor
     * @param {*} args
     */
    static async handleNamedCurrency(actor, args) {
        Logging.debug('handleNamedCurrency', actor, args);

        let name = args.name;
        let quantity = args.quantity;

        const currentAmount = actor.system.currency[name];
        Logging.debug("currentAmount", currentAmount);
        const amount = parseInt(currentAmount) + parseInt(quantity);
        Logging.debug('amount', amount);
        const updateAttr = `system.currency.${name}`;
        const data = {
            [updateAttr]: amount,
        };
        await actor.update(data);
    }
}
