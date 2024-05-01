'use strict';

import { Logging } from "./logging.js";

export class Config {
	// Module info
	static MODULE = {
		TITLE: 'Loot Parcels',
		NAME: 'loot-parcels',
		PATH: '/modules/loot-parcels',
		WORLD: ''
	};

	// Module settings
	static SETTINGS = {
		// GMINTRUSION: true,
		// AUTOROLL: true,
		// SHOWTRADE: true,
		// SORTITEMS: true,
		// SENTENCELINK: true,
		// CREATIONTOOL: true
		// lightweaponeased: true,	// TODO: Potentially in a new version
		// changechatcard: true		// TODO: Potentially in a new version
	};

	// Flags used by some modules
	static FLAGS = {
		// CREATIONITEM: 'creation-item',
		// ORIGINALSKILLLEVEL: 'original-skill-level',
		// ORIGINALQUANTITY: 'original-quantity'
	};

	// Init the settings
	static init() {
		Logging.info("Initializing configuration.");

		registerModuleSettings();

		Config.MODULE.WORLD = game.world.id;
		this.getSettings();
	};

	static getSettings() {
		for (let s in Config.SETTINGS) {
			Config.SETTINGS[s] = game.settings.get(Config.MODULE.NAME, s);
		}
	}
};

/*------------------------------------------------------------------------------------------------
------------------------------------------ Function(s) -------------------------------------------
------------------------------------------------------------------------------------------------*/
/**
 * @description Register the module settings
 */
function registerModuleSettings() {
	// // Register the FAN USE POLICY
	// game.settings.registerMenu(Config.MODULE.NAME, Config.MODULE.NAME, {
	// 	label: "MCG Fan Use Policy - Abbreviated Statement",
	// 	icon: "	fas fa-book-open",
	// 	type: cypherAddOnsMCGFUP,
	// 	restricted: true
	// });

	// Register all settings
	Object.keys(Config.SETTINGS).forEach(k => {
		game.settings.register(Config.MODULE.NAME, k, {
			name: game.i18n.localize(`LOOTPARCELS.Settings${k}Title`),
			hint: game.i18n.localize(`LOOTPARCELS.Settings${k}Hint`),
			scope: 'world',
			config: true,
			default: true,
			type: Boolean
		});
	});
};
