/**
 * Supported systems.
 */
import { CypherSystem } from "./handlers-cyphersystem.js";
import { A5eSystem } from "./handlers-a5e.js";
import { BlackFlagSystem } from "./handlers-black-flag.js";
import { GenesysSystem } from "./handlers-genesys.js";
import { DnD5eSystem } from "./handlers-dnd5e.js";
import { SotDLSystem } from "./handlers-demonlord.js";
import { SotWWSystem } from "./handlers-weirdwizard.js";
import { TOR2eSystem } from "./handlers-tor2e.js";
import { TOR1eSystem } from "./handlers-tor1e.js";
import { T2K4eSystem } from "./handlers-t2k4e.js";
import { DnD1eSystem } from "./handlers-dnd1e.js";
import { ShadowdarkSystem } from "./handlers-shadowdark.js";
import { PF1System } from "./handlers-pf1.js";
import { PF2eSystem } from "./handlers-pf2e.js";
import { WWNSystem } from "./handlers-wwn.js";
import { OSESystem } from "./handlers-ose.js";
import { SWADESystem } from "./handlers-swade.js";
import { CCSystem } from "./handlers-cc.js";
import { DungeonworldSystem } from "./handlers-dungeonworld.js";
import { ForbiddenLandsSystem } from "./handlers-forbidden-lands.js";
import { Hackmaster5eSystem } from "./handlers-hackmaster5e.js";
import { ArchmageSystem } from "./handlers-archmage.js";
import { PbtASystem } from "./handlers-pbta.js";
import { WFRP4eSystem } from "./handlers-wfrp4e.js";
import { FATESystem } from "./handlers-fate.js";
import { Shadowrun5eSystem } from "./handlers-shadowrun5e.js";
import { Starfinder1eSystem } from "./handlers-sfrpg.js";

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
    'pbta': { actorTypes: ['character'], handler: PbtASystem },
    'wfrp4e': { actorTypes: ['character'], handler: WFRP4eSystem },
    'shadowrun5e': { actorTypes: ['character'], handler: Shadowrun5eSystem },
    'sfrpg': { actorTypes: ['character'], handler: Starfinder1eSystem },
};
