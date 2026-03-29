/**
 * Supported systems.
 */
import { A5eSystem } from "./scripts/handlers/a5e.js";
import { ArchmageSystem } from "./scripts/handlers/archmage.js";
import { BlackFlagSystem } from "./scripts/handlers/black-flag.js";
import { CCSystem } from "./scripts/handlers/cc.js";
import { CypherSystem } from "./scripts/handlers/cyphersystem.js";
import { DnD1eSystem } from "./scripts/handlers/dnd1e.js";
import { DnD5eSystem } from "./scripts/handlers/dnd5e.js";
import { DungeonworldSystem } from "./scripts/handlers/dungeonworld.js";
import { FATESystem } from "./scripts/handlers/fate.js";
import { ForbiddenLandsSystem } from "./scripts/handlers/forbidden-lands.js";
import { GenesysSystem } from "./scripts/handlers/genesys.js";
import { Hackmaster5eSystem } from "./scripts/handlers/hackmaster5e.js";
import { OSESystem } from "./scripts/handlers/ose.js";
import { PF1System } from "./scripts/handlers/pf1.js";
import { PF2eSystem } from "./scripts/handlers/pf2e.js";
import { ShadowdarkSystem } from "./scripts/handlers/shadowdark.js";
import { Shadowrun5eSystem } from "./scripts/handlers/shadowrun5e.js";
import { SotDLSystem } from "./scripts/handlers/demonlord.js";
import { SotWWSystem } from "./scripts/handlers/weirdwizard.js";
import { Starfinder1eSystem } from "./scripts/handlers/sfrpg.js";
import { SWADESystem } from "./scripts/handlers/swade.js";
import { T2K4eSystem } from "./scripts/handlers/t2k4e.js";
import { TOR1eSystem } from "./scripts/handlers/tor1e.js";
import { TOR2eSystem } from "./scripts/handlers/tor2e.js";
import { WFRP4eSystem } from "./scripts/handlers/wfrp4e.js";
import { WWNSystem } from "./scripts/handlers/wwn.js";

export const SYSTEMS = {
    'a5e': { actorTypes: ['character'], handler: A5eSystem },
    'archmage': { actorTypes: ['character'], handler: ArchmageSystem },
    'black-flag': { actorTypes: ['pc'], handler: BlackFlagSystem },
    'castles-and-crusades': { actorTypes: ['character'], handler: CCSystem },
    'cyphersystem': { actorTypes: ['pc'], handler: CypherSystem },
    'demonlord': { actorTypes: ['character', 'creature'], handler: SotDLSystem },
    'dnd1e': { actorTypes: ['TBD'], handler: DnD1eSystem },
    'dnd5e': { actorTypes: ['character'], handler: DnD5eSystem },
    'dungeonworld': { actorTypes: ['character'], handler: DungeonworldSystem },
    'fate-core-official': { actorTypes: ['character'], handler: FATESystem },
    'forbidden-lands': { actorTypes: ['character'], handler: ForbiddenLandsSystem },
    'genesys': { actorTypes: ['character'], handler: GenesysSystem },
    'hackmaster5e': { actorTypes: ['character'], handler: Hackmaster5eSystem },
    'ose': { actorTypes: ['character'], handler: OSESystem },
    'pf1': { actorTypes: ['character'], handler: PF1System },
    'pf2e': { actorTypes: ['character'], handler: PF2eSystem },
    'sfrpg': { actorTypes: ['character'], handler: Starfinder1eSystem },
    'shadowdark': { actorTypes: ['Player'], handler: ShadowdarkSystem },
    'shadowrun5e': { actorTypes: ['character'], handler: Shadowrun5eSystem },
    'swade': { actorTypes: ['character'], handler: SWADESystem },
    't2k4e': { actorTypes: ['character'], handler: T2K4eSystem },
    'tor1e': { actorTypes: ['character'], handler: TOR1eSystem },
    'tor2e': { actorTypes: ['character'], handler: TOR2eSystem },
    'weirdwizard': { actorTypes: ['character'], handler: SotWWSystem },
    'wfrp4e': { actorTypes: ['character'], handler: WFRP4eSystem },
    'wwn': { actorTypes: ['character'], handler: WWNSystem },
};
