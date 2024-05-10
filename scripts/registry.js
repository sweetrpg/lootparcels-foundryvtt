
import { Logging } from "./logging.js";

export class Registry {
    static directiveHandlers = {};
    static linkEntryHandler = null;
    static textEntryHandler = null;
    static actorTypes = [];
    static stackedItemTypes = [];

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

    static getStackedItemTypes() {
        Logging.debug("Registry.getStackedItemTypes");
        return Registry.stackedItemTypes;
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

    /**
     *
     * @param {function} fn
     */
    static registerLinkEntryHandler(fn) {
        Logging.info("Registering link entry handler");

        Registry.linkEntryHandler = fn;
    }

    /**
     *
     * @param {function} fn
     */
    static registerTextEntryHandler(fn) {
        Logging.info("Registering text entry handler");

        Registry.textEntryHandler = fn;
    }

    /**
     *
     * @param {String} name
     * @param {function} fn
     */
    static registerDirectiveHandler(name, fn) {
        Logging.info('Registering directive handler:', name);

        Registry.directiveHandlers[name] = fn;
    }

    /**
     *
     * @param {Array} types
     */
    static registerStackedItemTypes(types) {
        Logging.info("Registering stacked item types:", types)

        types?.forEach(type => {
            Logging.debug("Registering stacked item type", type);
            Registry.stackedItemTypes.push(type.toLowerCase());
        });
    }

    /**
     *
     * @param {Array} types
     */
    static registerAcceptableActorTypes(types) {
        Logging.info('Registering actor types:', types);

        types?.forEach(type => {
            Logging.debug("Registering actor type", type);
            Registry.actorTypes.push(type.toLowerCase());
        });
    }
};
