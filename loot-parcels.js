/**
 * Root module.
 */
import { Registry } from "./scripts/registry.js";
import { Logging } from "./scripts/logging.js";
import { Config } from "./scripts/config.js";
import { handleParcelDrop } from "./scripts/parcels.js";
import { CypherSystem } from "./scripts/handlers-cyphersystem.js";
import { A5eSystem } from "./scripts/handlers-a5e.js";
import { BlackFlagSystem } from "./scripts/handlers-black-flag.js";
import { GenesysSystem } from "./scripts/handlers-genesys.js";
import { DnD5eSystem } from "./scripts/handlers-dnd5e.js";
import { SotDLSystem } from "./scripts/handlers-demonlord.js";
import { SotWWSystem } from "./scripts/handlers-weirdwizard.js";
import { TOR2eSystem } from "./scripts/handlers-tor2e.js";
import { TOR1eSystem } from "./scripts/handlers-tor1e.js";
import { T2K4eSystem } from "./scripts/handlers-t2k4e.js";
import { DnD1eSystem } from "./scripts/handlers-dnd1e.js";
import { ShadowdarkSystem } from "./scripts/handlers-shadowdark.js";
import { PF1System } from "./scripts/handlers-pf1.js";
import { PF2eSystem } from "./scripts/handlers-pf2e.js";
import { WWNSystem } from "./scripts/handlers-wwn.js";
import { OSESystem } from "./scripts/handlers-ose.js";
import { SWADESystem } from "./scripts/handlers-swade.js";
import { CCSystem } from "./scripts/handlers-cc.js";
import { DungeonworldSystem } from "./scripts/handlers-dungeonworld.js";
import { ForbiddenLandsSystem } from "./scripts/handlers-forbidden-lands.js";
import { Hackmaster5eSystem } from "./scripts/handlers-hackmaster5e.js";
import { ArchmageSystem } from "./scripts/handlers-archmage.js";
import { PbtASystem } from "./scripts/handlers-pbta.js";
import { WFRP4eSystem } from "./scripts/handlers-wfrp4e.js";
import { FATESystem } from "./scripts/handlers-fate.js";
import { Shadowrun5eSystem } from "./scripts/handlers-shadowrun5e.js";
import { Starfinder1eSystem } from "./scripts/handlers-sfrpg.js";

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
	Logging.debug("system", game.system.id);
	switch (game.system.id) {
		case 'cyphersystem':
			Registry.registerAcceptableActorTypes(['pc']);
			CypherSystem.registerHandlers();
			break;
		case 'dnd1e':
			Registry.registerAcceptableActorTypes(['TBD']);
			DnD1eSystem.registerHandlers();
			break;
		case 'genesys':
			Registry.registerAcceptableActorTypes(['character']);
			GenesysSystem.registerHandlers();
			break;
		case 't2k4e':
			Registry.registerAcceptableActorTypes(['character']);
			T2K4eSystem.registerHandlers();
			break;
		case 'pf2e':
			Registry.registerAcceptableActorTypes(['character']);
			PF2eSystem.registerHandlers();
			break;
		case 'pf1':
			Registry.registerAcceptableActorTypes(['character']);
			PF1System.registerHandlers();
			break;
		case 'weirdwizard':
			Registry.registerAcceptableActorTypes(['character']);
			SotWWSystem.registerHandlers();
			break;
		case 'demonlord':
			Registry.registerAcceptableActorTypes(['character']);
			SotDLSystem.registerHandlers();
			break;
		case 'dnd5e':
			Registry.registerAcceptableActorTypes(['character']);
			DnD5eSystem.registerHandlers();
			break;
		case 'tor2e':
			Registry.registerAcceptableActorTypes(['character']);
			TOR2eSystem.registerHandlers();
			break;
		case 'tor1e':
			Registry.registerAcceptableActorTypes(['character']);
			TOR1eSystem.registerHandlers();
			break;
		case 'shadowdark':
			Registry.registerAcceptableActorTypes(['Player']);
			ShadowdarkSystem.registerHandlers();
			break;
		case 'a5e':
			Registry.registerAcceptableActorTypes(['character']);
			A5eSystem.registerHandlers();
			break;
		case 'black-flag':
			Registry.registerAcceptableActorTypes(['pc']);
			BlackFlagSystem.registerHandlers();
			break;
		case 'wwn':
			Registry.registerAcceptableActorTypes(['character']);
			WWNSystem.registerHandlers();
			break;
		case 'swade':
			Registry.registerAcceptableActorTypes(['character']);
			SWADESystem.registerHandlers();
			break;
		case 'ose':
			Registry.registerAcceptableActorTypes(['character']);
			OSESystem.registerHandlers();
			break;
		case 'castles-and-crusades':
			Registry.registerAcceptableActorTypes(['character']);
			CCSystem.registerHandlers();
			break;
		case 'dungeonworld':
			Registry.registerAcceptableActorTypes(['character']);
			DungeonworldSystem.registerHandlers();
			break;
		case 'fate-core-official':
			Registry.registerAcceptableActorTypes(['character']);
			FATESystem.registerHandlers();
			break;
		case 'forbidden-lands':
			Registry.registerAcceptableActorTypes(['character']);
			ForbiddenLandsSystem.registerHandlers();
			break;
		case 'hackmaster5e':
			Registry.registerAcceptableActorTypes(['character']);
			Hackmaster5eSystem.registerHandlers();
			break;
		case 'archmage':
			Registry.registerAcceptableActorTypes(['character']);
			ArchmageSystem.registerHandlers();
			break;
		case 'pbta':
			Registry.registerAcceptableActorTypes(['character']);
			PbtASystem.registerHandlers();
			break;
		case 'wfrp4e':
			Registry.registerAcceptableActorTypes(['character']);
			WFRP4eSystem.registerHandlers();
			break;
		case 'shadowrun5e':
			Registry.registerAcceptableActorTypes(['character']);
			Shadowrun5eSystem.registerHandlers();
			break;
		case 'sfrpg':
			Registry.registerAcceptableActorTypes(['character']);
			Starfinder1eSystem.registerHandlers();
			break;
		}
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
