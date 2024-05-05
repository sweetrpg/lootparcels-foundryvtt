# Loot Parcels

Create parcels of loot to hand out to the PCs

## Supported Systems

The following systems are currently supported:

* Cypher System
* Dungeons & Dragons, 5th edition
* Shadow of the Demon Lord
* Shadow of the Weird Wizard
* The One Ring, 2nd edition

If you would like to see a system added, please open an [issue](https://github.com/sweetrpg/lootparcels-foundryvtt/issues).

## How to Create a Parcel

1. Create a Journal entry and page
2. At the top of the page, on a line by itself, enter:
```
$parcel
```
3. Add more lines, one line per item in the parcel:
```
$cypher Detonation l=1d6
$armor Leather jerkin q=4
```
4. Drag the journal page onto an actor to give them the loot!

### Example

```
$parcel
$currency shins 1d6
$armor Leather jerkin
$weapon Light sword q=1d3
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
| `$armor` | `<name>` | All | Armor or shields. |
| `$weapon` | `<name>` | All | A weapon. |
| `$equipment` or `$item` | `<name>` | All | A piece of gear. |
| `$loot` | `<name>` | D&D5e | Miscellaneous items, like trinkets. |
| `$tool` | `<name>` | D&D5e | Tools and items use to support other activities. |
| `$container` | `<name>` | D&D5e | Something that can hold other items. |
| `$consumable` | `<name>` | D&D5e | Anything that can be used up, like ammo, potions, scrolls, etc. |
| `$ammo` | `<name>` | Shadow of the Demon Lord | Stuff for your weapon. |
| `$iotum` | `<name>` | Cypher System | A specific type of iotum. |
| `$parts` | `<quantity>` | Cypher System | A quantity of parts. |
| `$cypher` | `<name>` | Cypher System | A cypher. |
| `$artifact` | `<name>` | Cypher System | An artifact. |

Most parcel items, where the `name` is specified, support using a link instead. The link is in the standard form,
`@UUID[<id>]{<name>}`. If a link is provided, the module will look up the item and use all the relevant information
from the item when adding it to the actor. If no item is found, the module will just add an entry to the actor.

Where `quantity` is used, either in an argument or quantifier (see below), a die spec can be provided to generate
a random amount of that item.

Parcel items can also include zero or more optional quantifiers, in the form of key/value pairs separated by an
equal sign (`=`), for example, `q=3`. The currently supported quantifiers are described below.

| Quantifier | Description |
| - | - |
| `q` | Specifies a quantity for the parcel item. If omitted, the quantity defaults to 1. |
| `l` | Indicates the level of the parcel item. If omitted, the level defaults to 1. |
