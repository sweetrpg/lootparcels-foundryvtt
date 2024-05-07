# Loot Parcels

![](https://img.shields.io/badge/Foundry-v11-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/sweetrpg/lootparcels-foundryvtt/latest/module.zip)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Floot-parcels&colorB=4aa94a)

Create parcels of loot to hand out to the PCs

## Supported Systems

The following systems are currently supported:

* Advanced 5E (Level Up) [pending]
* Black Flag Roleplaying [pending]
* Cypher System
* Dungeons & Dragons, 5th edition
* Genesys
* Pathfinder, 1st edition
* Pathfinder, 2nd edition
* Shadow of the Demon Lord
* Shadow of the Weird Wizard
* Shadowdark
* The One Ring, 1st edition
* The One Ring, 2nd edition
* Twilight:2000, 4th edition

If you would like to see a system added, please open an [issue](https://github.com/sweetrpg/lootparcels-foundryvtt/issues).

## How to Create a Parcel

1. Create a Journal entry and page
2. At the top of the page, on a line by itself, enter:
```
$parcel
```
3. Add more lines, one line per item in the parcel:
```
$cypher @UUID[...]{Detonation} l=1d6
$armor @UUID[...]{Leather jerkin} q=4
```
4. Drag the journal page onto an actor to give them the loot!

### Example

```
$parcel
$currency shins 1d6
$armor @UUID[]{Leather jerkin}
$weapon @UUID[]{Light sword} q=1d3
$cypher @UUID[Compendium.world.cyphers.abc123]{A really cool cypher} l=1d6
$parts 1d10
```

## Documentation

### Directives

Directives are the first part of each line in a parcel, indicating what type of item is in the parcel.
A directive begins with a `$` (you know, for loot).

Some directives support additional arguments. An optional argument is enclosed in square brackets, like `[this]`,
whereas a required argument is enclosed in angle brackets, like `<this>`. Arguments are explained in the
description for the directive.

| Directive | Arguments | System | Description |
| - | - | - | - |
| `$parcel` | None | All | Marks the journal page as a loot parcel |
| `$currency` | `[name] <quantity>` | All | This is for money. The `name` is the type of currency, if the system supports more than one kind. If omitted, the default currency for the system is used. `quantity` indicates the amount. |
| `$armor` | `<link>` | All | Armor or shields. |
| `$weapon` | `<link>` | All | A weapon. |
| `$equipment` or `$item` or `$gear` | `<link>` | All | A piece of gear. |
| `$loot` | `<link>` | D&D5e, A5e | Miscellaneous items, like trinkets. |
| `$tool` | `<link>` | D&D5e, A5e | Tools and items use to support other activities. |
| `$container` | `<link>` | D&D5e, A5e | Something that can hold other items. |
| `$consumable` | `<link>` | D&D5e, A5e, The One Ring | Anything that can be used up, like ammo, potions, scrolls, etc. |
| `$ammo` or `$ammunition` | `<link>` | Shadow of the Demon Lord | Stuff for your weapon. |
| `$iotum` | `<link>` | Cypher System | A specific type of iotum. |
| `$parts` | `<quantity>` | Cypher System | A quantity of parts. |
| `$cypher` | `<link>` | Cypher System | A cypher. |
| `$artifact` | `<link>` | Cypher System | An artifact. |

As a best practice, use a link (it looks something like `@UUID[<id>]{name}` in the editor)
for the parcel item instead of a plain text name. Using a link allows Loot Parcels to copy all relevant information about the
item to the character when the parcel is dropped on them. If you use text, the mod will do its best to create the
appropriate item on the character, but it usually won't have all the useful information that you want.

Where `quantity` is used, either in an argument or modifier (see below), a die spec can be provided to generate
a random amount of that item. It's worth noting that some items you want to have stacked (i.e., if the character already
has a quantity of the item, you just want the quantity to increase) as opposed to creating a new entry on the Actor
sheet. For some systems, this is the difference between using `$item` and `$consumable`. And some systems do not support
`$ammo`, so you probably want to use `$consumable` instead.

Parcel items can also include zero or more optional modifiers, in the form of key/value pairs separated by an
equal sign (`=`), for example, `q=3`. The currently supported modifiers are described below.

| Modifier | Description |
| - | - |
| `q` | Specifies a quantity for the parcel item. If omitted, the quantity defaults to 1. |
| `l` | Indicates the level of the parcel item. If omitted, the level defaults to 1. |
| `t` | Allows you to specify a sub-type of a parcel item. |
