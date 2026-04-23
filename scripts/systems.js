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
    'a5e':                  { actorTypes: ['character'],                                      handler: A5eSystem },
    'archmage':             { actorTypes: ['character'],                                      handler: ArchmageSystem },
    'black-flag':           { actorTypes: ['pc'],                                             handler: BlackFlagSystem },
    'castles-and-crusades': { actorTypes: ['character'],                                      handler: CCSystem },
    'cyphersystem':         { actorTypes: ['pc'],                                             handler: CypherSystem },
    'demonlord':            { actorTypes: ['character', 'creature'],                          handler: SotDLSystem },
    'dnd1e':                { actorTypes: ['TBD'],                                            handler: DnD1eSystem },
    'dnd4e':                { actorTypes: ['Player Character'],                               handler: DnD4eSystem },
    'dnd5e':                { actorTypes: ['character'],                                      handler: DnD5eSystem },
    'dungeonworld':         { actorTypes: ['character'],                                      handler: DungeonworldSystem },
    'fate-core-official':   { actorTypes: ['character'],                                      handler: FATESystem },
    'forbidden-lands':      { actorTypes: ['character'],                                      handler: ForbiddenLandsSystem },
    'genesys':              { actorTypes: ['character'],                                      handler: GenesysSystem },
    'hackmaster5e':         { actorTypes: ['character'],                                      handler: Hackmaster5eSystem },
    'ose':                  { actorTypes: ['character'],                                      handler: OSESystem },
    'pbta':                 { actorTypes: ['character'],                                      handler: PbtASystem },
    'pf1':                  { actorTypes: ['character'],             defaultItemType: 'loot', handler: PF1System },
    'pf2e':                 { actorTypes: ['character'],                                      handler: PF2eSystem },
    'sfrpg':                { actorTypes: ['character'],                                      handler: Starfinder1eSystem },
    'shadowdark':           { actorTypes: ['Player'],                                         handler: ShadowdarkSystem },
    'shadowrun5e':          { actorTypes: ['character'],                                      handler: Shadowrun5eSystem },
    'swade':                { actorTypes: ['character'],                                      handler: SWADESystem },
    't2k4e':                { actorTypes: ['character'],                                      handler: T2K4eSystem },
    'tor1e':                { actorTypes: ['character'],                                      handler: TOR1eSystem },
    'tor2e':                { actorTypes: ['character'],                                      handler: TOR2eSystem },
    'weirdwizard':          { actorTypes: ['character'],                                      handler: SotWWSystem },
    'wfrp4e':               { actorTypes: ['character'],                                      handler: WFRP4eSystem },
    'wwn':                  { actorTypes: ['character'],                                      handler: WWNSystem },
};
