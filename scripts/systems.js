/**
 * Supported systems.
 */
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
// import { PbtASystem } from "./scripts/handlers-pbta.js";
import { WFRP4eSystem } from "./scripts/handlers-wfrp4e.js";
import { FATESystem } from "./scripts/handlers-fate.js";
import { Shadowrun5eSystem } from "./scripts/handlers-shadowrun5e.js";
import { Starfinder1eSystem } from "./scripts/handlers-sfrpg.js";

export const SYSTEMS = {
    'dnd5e': { actorTypes: ['character'], handler: DnD5eSystem },
    'pf2e': { actorTypes: ['character'], handler: PF2eSystem },
    'cyphersystem': { actorTypes: ['pc'], handler: CypherSystem },
    'shadowdark': { actorTypes: ['Player'], handler: ShadowdarkSystem },
    'dnd1e': { actorTypes: ['TBD'], handler: DnD1eSystem },
    'genesys': { actorTypes: ['character'], handler: GenesysSystem },
    't2k4e': { actorTypes: ['character'], handler: T2K4eSystem },
    'pf1': { actorTypes: ['character'], handler: PF1System },
    'weirdwizard': { actorTypes: ['character'], handler: SotWWSystem },
    'demonlord': { actorTypes: ['character', 'creature'], handler: SotDLSystem },
    'tor2e': { actorTypes: ['character'], handler: TOR2eSystem },
    'tor1e': { actorTypes: ['character'], handler: TOR1eSystem },
    'a5e': { actorTypes: ['character'], handler: A5eSystem },
    'black-flag': { actorTypes: ['pc'], handler: BlackFlagSystem },
    'wwn': { actorTypes: ['character'], handler: WWNSystem },
    'swade': { actorTypes: ['character'], handler: SWADESystem },
    'ose': { actorTypes: ['character'], handler: OSESystem },
    'castles-and-crusades': { actorTypes: ['character'], handler: CCSystem },
    'dungeonworld': { actorTypes: ['character'], handler: DungeonworldSystem },
    'fate-core-official': { actorTypes: ['character'], handler: FATESystem },
    'forbidden-lands': { actorTypes: ['character'], handler: ForbiddenLandsSystem },
    'hackmaster5e': { actorTypes: ['character'], handler: Hackmaster5eSystem },
    'archmage': { actorTypes: ['character'], handler: ArchmageSystem },
    //  'pbta':{ actorTypes: ['character'], handler: PbtASystem },
    'wfrp4e': { actorTypes: ['character'], handler: WFRP4eSystem },
    'shadowrun5e': { actorTypes: ['character'], handler: Shadowrun5eSystem },
    'sfrpg': { actorTypes: ['character'], handler: Starfinder1eSystem },
};
