# Loot Parcels

![](https://img.shields.io/badge/Foundry-v11-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/sweetrpg/lootparcels-foundryvtt/latest/module.zip)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Floot-parcels&colorB=4aa94a)

Create parcels of loot to hand out to the PCs

## Supported Systems

The following systems are currently supported:

* Advanced 5E (Level Up)
* Black Flag Roleplaying
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
3. Add links of items to the parcel, one per line:
```
@UUID[...]{Detonation} l=1d6
@UUID[...]{Leather jerkin} q=4
```
4. Drag the journal page onto an actor to give them the loot!

### Example

```
$parcel
$currency shins q=1d6
@UUID[...]{Leather jerkin}
@UUID[...]{Light sword} q=1d3
@UUID[...]{A really cool cypher} l=1d6
Parts q=1d10
```

## Documentation

### Breakdown of a parcel item

Each line of the journal that is marked as parcel contains an item. There are three different ways to
specify the item, which are covered here.

#### Item link

An item link entry will look something like this:

```
@UUID[...]{Light sword} q=1d3
```

This type of entry is the recommended way of populating your parcels. Item links mean that all the item
data can be copied to the actor.

#### Free text

A free text entry will look something like this:

```
Parts q=1d10
```

This type of entry allows you to create ad-hoc items on the actor. No lookup is performed, so you don't get
any information about the item, because this type of entry only knows the item's name. The module will
attempt to do the right thing in creating the item. You can provide modifiers (see below) to influence
or coerce how the item is created.

#### Directive

A directive is a text token that starts with the character `$` and is followed immediately by alphanumeric
characters with no spaces. A directive entry will look something like this:

```
$currency gp q=1d100
```

There is a common directive that works for most game systems, but for the most part, using Loot Parcels in a
particular system may enable other directives (see below).

#### Modifiers

Parcel items can also include zero or more optional modifiers, in the form of key/value pairs separated by an
equal sign (`=`), for example, `q=3`. The currently supported modifiers are described below.

| Modifier | Value | Description |
| - | - | - |
| `quantity` or `q` | `number` or die spec | Specifies a quantity for the parcel item. If omitted, the quantity defaults to 1. Supports using a die spec. |
| `level` or `l` | `number` or die spec | Indicates the level of the parcel item. If omitted, the level defaults to 1. Supports using a die spec. |
| `type` | any | Allows you to specify the type of a parcel item. This is usually needed when using the free text form. |
| `stacked` | `boolean` | Specifies that you want the item added to the actor by stacking with any existing items of the same name instead of creating a new instance. |

### Directives

When using the directive form of a parcel item entry, the directive is the first part of each line in a parcel.
A directive begins with a `$`.

Some directives support additional arguments. An optional argument is enclosed in square brackets, like `[this]`,
whereas a required argument is enclosed in angle brackets, like `<this>`. Arguments are explained in the
description for the directive.

| Directive | Arguments | System | Description |
| - | - | - | - |
| `$currency` | `<name>` | All | This is for money. The `name` is the type of currency. To specify quantity, use the `q` modifier. |
