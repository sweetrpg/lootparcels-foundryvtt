/**
 * Supported systems.
 */

import { A5eSystem } from "./handlers/a5e.js";
import { ArchmageSystem } from "./handlers/archmage.js";
import { BlackFlagSystem } from "./handlers/black-flag.js";
import { CCSystem } from "./handlers/cc.js";
import { CypherSystem } from "./handlers/cypher.js";
import { DnD1eSystem } from "./handlers/dnd-1e.js";
import { DnD4eSystem } from "./handlers/dnd-4e.js";
import { DnD5eSystem } from "./handlers/dnd-5e.js";
import { DungeonworldSystem } from "./handlers/dungeonworld.js";
import { FATESystem } from "./handlers/fate.js";
import { ForbiddenLandsSystem } from "./handlers/forbidden-lands.js";
import { GenesysSystem } from "./handlers/genesys.js";
import { Hackmaster5eSystem } from "./handlers/hackmaster-5e.js";
import { OSESystem } from "./handlers/ose.js";
import { PbtASystem } from "./handlers/pbta.js";
import { PF1System } from "./handlers/pathfinder-1e.js";
import { PF2eSystem } from "./handlers/pathfinder-2e.js";
import { ShadowdarkSystem } from "./handlers/shadowdark.js";
import { Shadowrun5eSystem } from "./handlers/shadowrun-5e.js";
import { SotDLSystem } from "./handlers/demonlord.js";
import { SotWWSystem } from "./handlers/weirdwizard.js";
import { Starfinder1eSystem } from "./handlers/starfinder-1e.js";
import { SWADESystem } from "./handlers/swade.js";
import { T2K4eSystem } from "./handlers/twilight2000-4e.js";
import { TOR1eSystem } from "./handlers/theonering-1e.js";
import { TOR2eSystem } from "./handlers/theonering-2e.js";
import { WFRP4eSystem } from "./handlers/wfrp-4e.js";
import { WWNSystem } from "./handlers/wwn.js";

export const SYSTEMS = {
    'a5e':                  { actorTypes: ['character'],             defaultItemType: 'object',        handler: A5eSystem },
    'archmage':             { actorTypes: ['character'],             defaultItemType: 'loot',          handler: ArchmageSystem },
    'black-flag':           { actorTypes: ['pc'],                    defaultItemType: 'gear',          handler: BlackFlagSystem },
    'castles-and-crusades': { actorTypes: ['character'],                                               handler: CCSystem },
    'cyphersystem':         { actorTypes: ['pc'],                    defaultItemType: 'equipment',     handler: CypherSystem },
    'demonlord':            { actorTypes: ['character', 'creature'],                                   handler: SotDLSystem },
    'dnd1e':                { actorTypes: ['TBD'],                   defaultItemType: 'xxx',           handler: DnD1eSystem },
    'dnd4e':                { actorTypes: ['Player Character'],      defaultItemType: 'loot',          handler: DnD4eSystem },
    'dnd5e':                { actorTypes: ['character'],             defaultItemType: 'loot',          handler: DnD5eSystem },
    'dungeonworld':         { actorTypes: ['character'],             defaultItemType: 'loot',          handler: DungeonworldSystem },
    'fate-core-official':   { actorTypes: ['character'],             defaultItemType: 'loot',          handler: FATESystem },
    'forbidden-lands':      { actorTypes: ['character'],             defaultItemType: 'loot',          handler: ForbiddenLandsSystem },
    'genesys':              { actorTypes: ['character'],             defaultItemType: 'gear',          handler: GenesysSystem },
    'hackmaster5e':         { actorTypes: ['character'],             defaultItemType: 'loot',          handler: Hackmaster5eSystem },
    'ose':                  { actorTypes: ['character'],                                               handler: OSESystem },
    'pbta':                 { actorTypes: ['character'],             defaultItemType: 'loot',          handler: PbtASystem },
    'pf1':                  { actorTypes: ['character'],             defaultItemType: 'loot',          handler: PF1System },
    'pf2e':                 { actorTypes: ['character'],             defaultItemType: 'equipment',     handler: PF2eSystem },
    'sfrpg':                { actorTypes: ['character'],             defaultItemType: 'equipment',     handler: Starfinder1eSystem },
    'shadowdark':           { actorTypes: ['Player'],                defaultItemType: 'Basic',         handler: ShadowdarkSystem },
    'shadowrun5e':          { actorTypes: ['character'],             defaultItemType: 'equipment',     handler: Shadowrun5eSystem },
    'swade':                { actorTypes: ['character'],             defaultItemType: 'gear',          handler: SWADESystem },
    't2k4e':                { actorTypes: ['character'],             defaultItemType: 'gear',          handler: T2K4eSystem },
    'tor1e':                { actorTypes: ['character'],             defaultItemType: 'miscellaneous', handler: TOR1eSystem },
    'tor2e':                { actorTypes: ['character'],             defaultItemType: 'miscellaneous', handler: TOR2eSystem },
    'weirdwizard':          { actorTypes: ['character'],             defaultItemType: 'equipment',     handler: SotWWSystem },
    'wfrp4e':               { actorTypes: ['character'],             defaultItemType: 'cargo',         handler: WFRP4eSystem },
    'wwn':                  { actorTypes: ['character'],                                               handler: WWNSystem },
};
