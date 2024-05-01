'use strict';

import { Logging } from "./logging.js";

export function handleIotum(actor, components) {
    Logging.debug('handleIotum', components);
}

export function handleParts(actor, components) {
    Logging.debug('handleParts', components);

    let quantity = 1;

    if(components.length > 0) {
        // get number of parts
    }

    // lookup parts item in actor sheet
}
