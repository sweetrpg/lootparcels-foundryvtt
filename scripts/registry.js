
import { Logging } from "./logging.js";

export class Registry {
    static directiveHandlers = {};
    static linkEntryHandler = null;
    static textEntryHandler = null;
    static actorTypes = [];

    static getDirectiveHandler(name) {
        Logging.debug("Registry.getDirectiveHandler", name);
        return Registry.directiveHandlers[name];
    }

    static getLinkEntryHandler() {
        Logging.debug("Registry.getLinkEntryHandler");
        return Registry.linkEntryHandler;
    }

    static getTextEntryHandler() {
        Logging.debug("Registry.getTextEntryHandler");
        return Registry.textEntryHandler;
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

    static registerLinkEntryHandler(fn) {
        Logging.info("Registering link entry handler");

        Registry.linkEntryHandler = fn;
    }

    static registerTextEntryHandler(fn) {
        Logging.info("Registering text entry handler");

        Registry.textEntryHandler = fn;
    }

    static registerDirectiveHandler(name, fn) {
        Logging.info('Registering directive handler:', name);

        Registry.directiveHandlers[name] = fn;
    }

    static registerAcceptableActorTypes(types) {
        Logging.info('Registering actor types:', types);

        types?.forEach(type => {
            Logging.debug("Registering type", type);
            Registry.actorTypes.push(type.toLowerCase());
        });
    }
};
