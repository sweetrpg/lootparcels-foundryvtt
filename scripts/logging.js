'use strict';

export class Logging {

    static logLevel = 3; // 0: error, 1: warn, 2: info, 3: debug

    static debug = (...args) => {
        if (Logging.logLevel > 2) console.log("DEBUG: loot-parcels |", ...args);
    };
    static info = (...args) => {
        if (Logging.logLevel > 1) console.log("loot-parcels |", ...args);
    };
    static warn = (...args) => {
        if (Logging.debugEnabled > 0) console.warn("loot-parcels |", ...args);
    };
    static error = (...args) => {
        console.error("loot-parcels |", ...args);
    };

};
