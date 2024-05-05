// 'use strict';

import { Config } from "./scripts/config.js";
// import { Utils } from "./scripts/utilities.js";
import { handleParcelDrop } from "./scripts/parcels.js";
import { handleCSCurrency, handleCSIotum, handleCSParts, handleCSEquipment, handleCSArmor, handleCSWeapon, handleCSArtifact, handleCSCypher, isCSActorPC } from "./scripts/handlers-cyphersystem.js";
import { handleWWCurrency, handleWWEquipment, handleWWArmor, handleWWWeapon, isWWActorPC } from "./scripts/handlers-weirdwizard.js";
import { handleDLCurrency, handleDLEquipment, handleDLAmmo, handleDLArmor, handleDLWeapon, isDLActorPC } from "./scripts/handlers-demonlord.js";
import { handleTOR2Currency, isTOR2ActorPC } from "./scripts/handlers-tor2e.js";
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

	// system-specific handlers
	switch (game.system.id) {
		case 'cyphersystem':
			// isActor check
			Registry.setIsActorPCFn(isCSActorPC);
			// loot handlers
			Registry.registerLootHandler('currency', handleCSCurrency);
			Registry.registerLootHandler('parts', handleCSParts);
			Registry.registerLootHandler('iotum', handleCSIotum);
			Registry.registerLootHandler('equipment', handleCSEquipment);
			Registry.registerLootHandler('armor', handleCSArmor);
			Registry.registerLootHandler('weapon', handleCSWeapon);
			Registry.registerLootHandler('cypher', handleCSCypher);
			Registry.registerLootHandler('artifact', handleCSArtifact);
			break;
		case 'dnd1e':
			// TODO
			break;
		case 'genesys':
			// TODO
			break;
		case 't2k4e':
			// TODO
			break;
		case 'pf2e':
			// TODO
			break;
		case 'pf1':
			// TODO
			break;
		case 'weirdwizard':
			// isActor check
			Registry.setIsActorPCFn(isWWActorPC);
			// loot handlers
			Registry.registerLootHandler('currency', handleWWCurrency);
			Registry.registerLootHandler('equipment', handleWWEquipment);
			Registry.registerLootHandler('armor', handleWWArmor);
			Registry.registerLootHandler('weapon', handleWWWeapon);
			break;
		case 'demonlord':
			// isActor check
			Registry.setIsActorPCFn(isDLActorPC);
			// loot handlers
			Registry.registerLootHandler('currency', handleDLCurrency);
			Registry.registerLootHandler('item', handleDLEquipment);
			Registry.registerLootHandler('armor', handleDLArmor);
			Registry.registerLootHandler('weapon', handleDLWeapon);
			Registry.registerLootHandler('ammo', handleDLAmmo);
			break;
		case 'dnd5e':
			// TODO
			break;
		case 'tor2e':
			// isActor check
			Registry.setIsActorPCFn(isTOR2ActorPC);
			// loot handlers
			Registry.registerLootHandler('currency', handleTOR2Currency);
			// TODO
			break;
		case 'tor1e':
			// TODO
			break;
		case 'shadowdark':
			// TODO
			break;
		case 'a5e':
			// TODO
			break;
	}

	Logging.info('Setting up socket...');
	game.socket.on(`module.${Config.MODULE.NAME}`, packet => {
		Logging.debug(packet);

		let data = packet.data;
		data.receiver = game.actors.get(packet.receiverId);
		data.trader = game.actors.get(packet.traderId);
		data.traderUserId = packet.traderUserId;
		// switch (packet.type) {
		// 	case 'requestTrade':
		// 		if (packet.traderUserId != game.user.id &&
		// 			data.receiver.isOwner &&
		// 			(!game.user.isGM ||
		// 				!data.receiver.hasPlayerOwner)) {
		// 					receiveTrade(data, packet.traderUserId);
		// 				}
		// 		break;
		// 	case 'acceptTrade':
		// 		if (packet.traderUserId == game.user.id) {
		// 			endTrade(data)
		// 		};
		// 		break;
		// 	case 'refuseTrade':
		// 		if (packet.traderUserId == game.user.id) denyTrade(data);
		// 		break;
		// 	case 'possessItem':
		// 		if (packet.traderUserId == game.user.id) alreadyTrade(data);
		// 		break;
		// }
	});
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
