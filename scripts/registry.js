/**
 *
 */
import { Logging } from "./logging.js";

export class Registry {
    static directiveHandlers = {};
    static linkEntryHandler = null;
    static textEntryHandler = null;
    static actorTypes = [];
    static stackedItemTypes = [];
    static stackedItemCallback = null;
    static stackedItemQuantityPath = 'system.quantity';

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

    static getStackedItemCallback() {
        Logging.debug("Registry.getStackedItemCallback");
        return Registry.stackedItemCallback;
    }

    /**
     * Checks if the actor is a player character.
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
     * Registers a function to handle link entries.
     *
     * @param {function} fn
     */
    static registerLinkEntryHandler(fn) {
        Logging.info("Registering link entry handler");

        Registry.linkEntryHandler = fn;
    }

    /**
     * Registers a function to handle text entries.
     *
     * @param {function} fn
     */
    static registerTextEntryHandler(fn) {
        Logging.info("Registering text entry handler");

        Registry.textEntryHandler = fn;
    }

    /**
     * Registers a function to handle a specific directive.
     *
     * @param {String} name The name of the directive.
     * @param {function} fn The function that will be called to process the directive. The function must accept two
     *   arguments: an `actor` and an array of `args`.
     */
    static registerDirectiveHandler(name, fn) {
        Logging.info('Registering directive handler:', name);

        Registry.directiveHandlers[name] = fn;
    }

    /**
     * Registers a list of item types that should be treated as "stacked" items.
     *
     * @param {Array} types An array of item types that should be treated as "stacked" items. The types are converted to lowercase.
     * @param {String} qtyPath The path to the quantity property in the item data. Defaults to 'system.quantity'.
     */
    static registerStackedItemTypes(types, qtyPath) {
        Logging.info("Registering stacked item types:", types, qtyPath);

        Registry.stackedItemQuantityPath = qtyPath || 'system.quantity';

        types?.forEach(type => {
            Logging.debug("Registering stacked item type", type);
            Registry.stackedItemTypes.push(type.toLowerCase());
        });
    }

    /**
     * Registers a callback function that will be called when an item is stacked.
     *
     * @param {function} fn The function that will be called when an item is stacked. The function must accept two arguments: an `actor` and an `item`.
     */
    static registerStackedItemCallback(fn) {
        Logging.info("Registering stacked item callback", fn);

        Registry.stackedItemCallback = fn;
    }

    /**
     * Registers a list of actor types that should be treated as player characters.
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
