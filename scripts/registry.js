'use strict';

import { Logging } from "./logging.js";

export class Registry {
    static lootHandlers = {};
    static isActorPCFn = null;

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
        if(Registry.isActorPCFn != null) {
            return Registry.isActorPCFn(actor);
        }

        return false;
    }

    static registerLootHandler(name, fn) {
        Logging.info('Registering loot handler', name);

        Registry.lootHandlers[name] = fn;
    }

    static setIsActorPCFn(fn) {
        Logging.info('Registering isActorPCFn', fn);

        Registry.isActorPCFn = fn;
    }
};
