'use strict';

import { Logging } from "./logging.js";

export class Registry {
    static lootHandlers = {};
    static actorTypes = [];

    static getHandler(name) {
        Logging.debug("Registry.getHandler", name);
        return Registry.lootHandlers[name];
    }

    /**
     *
     * @param {Actor} actor
     * @returns {Boolean}
     */
    static isActorPC(actor) {
        Logging.debug("Registry.isActorPC", actor);
        for (let type of Registry.actorTypes) {
            Logging.debug('type', type);
            if (actor?.type?.toLowerCase() === type) {
                return true;
            }
        }

        Logging.debug("No registered type matched actor type", actor?.type);
        return false;
    }

    static registerLootHandler(name, fn) {
        Logging.info('Registering loot handler:', name);

        Registry.lootHandlers[name] = fn;
    }

    static registerAcceptableActorTypes(types) {
        Logging.info('Registering actor types:', types);

        types?.forEach(type => {
            Logging.debug("Registering type", type);
            Registry.actorTypes.push(type.toLowerCase());
        });
    }
};
