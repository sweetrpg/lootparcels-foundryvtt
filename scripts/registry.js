'use strict';

import { Logging } from "./logging.js";

export class Registry {
    static lootHandlers = {};

    static getHandler(name) {
        return Registry.lootHandlers[name];
    }

    static registerLootHandler(name, fn) {
        Logging.info('Registering loot handler', name);

        Registry.lootHandlers[name] = fn;
    }
};
