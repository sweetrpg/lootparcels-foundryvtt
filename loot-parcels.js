// 'use strict';

import { Config } from "./scripts/config.js";
// import { Utils } from "./scripts/utilities.js";
import { handleParcelDrop } from "./scripts/parcels.js";
import { handleCurrency } from "./scripts/loot-handlers-generic.js";
import { handleIotum, handleParts } from "./scripts/loot-handlers-cyphersystem.js";
import { Registry } from "./scripts/registry.js";
import { Logging } from "./scripts/logging.js";

Hooks.once('init', () => {
	Logging.info('Initializing Loot Parcels...');

	// Register settings
	Config.init();
});

// Called when the module is setup
Hooks.once('setup', async () => {
	Logging.info('Registering loot handlers...');
	// generic handlers
	Registry.registerLootHandler('currency', handleCurrency);

	// // system-specific handlers
	switch (game.system.id) {
		case 'cyphersystem':
			Registry.registerLootHandler('parts', handleParts);
			Registry.registerLootHandler('iotum', handleIotum);
			break;
	}

	Logging.info('Setting up socket...');
	game.socket.on(`module.${Config.MODULE.NAME}`, packet => {
		Logging.debug(packet);

		let data = packet.data;
		data.receiver = game.actors.get(packet.receiverId);
		data.trader = game.actors.get(packet.traderId);
		data.traderUserId = packet.traderUserId;
		switch (packet.type) {
			case 'requestTrade':
				if (packet.traderUserId != game.user.id && data.receiver.isOwner && (!game.user.isGM || !data.receiver.hasPlayerOwner)) receiveTrade(data, packet.traderUserId);
				break;
			case 'acceptTrade':
				if (packet.traderUserId == game.user.id) endTrade(data);
				break;
			case 'refuseTrade':
				if (packet.traderUserId == game.user.id) denyTrade(data);
				break;
			case 'possessItem':
				if (packet.traderUserId == game.user.id) alreadyTrade(data);
				break;
		}
	});
});

// Called when dropping something on the character sheet
Hooks.on('dropActorSheetData', async (actor, html, item) => {
	Logging.debug('dropActorSheetData', actor, html, item);

	Config.getSettings();

	if ((item.type.toLowerCase() === 'journalentry' || item.type.toLowerCase() === 'journalentrypage') && actor.type === "pc") {
		handleParcelDrop(actor, html, item);
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
