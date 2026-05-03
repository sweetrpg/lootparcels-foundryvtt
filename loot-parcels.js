/**
 * Root module.
 */

import { Registry } from "./scripts/registry.js";
import { Logging } from "./scripts/logging.js";
import { Config } from "./scripts/config.js";
import { handleParcelDrop } from "./scripts/parcels.js";
import { SYSTEMS } from "./scripts/systems.js";

Hooks.once('init', () => {
	Logging.info('Initializing Loot Parcels...');

	// Register settings
	Config.init();
});

// Called when the module is setup
Hooks.once('setup', async () => {
	Logging.info('Registering loot handlers...');

	Logging.debug("system", game.system.id);
	const systemConfig = SYSTEMS[game.system.id];
    if (!systemConfig) {
        Logging.warn(`No handler registered for system: ${game.system.id}`);
        return;
    }

    Registry.registerAcceptableActorTypes(systemConfig.actorTypes);
	Registry.registerDefaultItemType(systemConfig.defaultItemType || 'item');
    systemConfig.handler.registerHandlers();
});

// Called when dropping something on the character sheet
Hooks.on('dropActorSheetData', async (actor, html, item) => {
	Logging.debug('dropActorSheetData', actor, html, item);

	Config.getSettings();

	if ((item.type.toLowerCase() === 'journalentry' ||
		item.type.toLowerCase() === 'journalentrypage') &&
		Registry.isActorPC(actor)) {
		await handleParcelDrop(actor, html, item);
	}
});

export class LootParcels {
	static i18n = (key, args) => {
		if (args) {
			return game.i18n.format(key, args);
		}
		return game.i18n.localize(key);
	};
}
