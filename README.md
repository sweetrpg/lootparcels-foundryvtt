# Loot Parcels

Create parcels of loot to hand out to the PCs

## Supported Systems

The following systems are currently supported:

* Cypher System

If you would like to see a system added, please open an [issue](https://github.com/sweetrpg/lootparcels-foundryvtt/issues).

## How to Create a Parcel

1. Create a Journal entry and page
2. At the top of the page, on a line by itself, enter:
```
$loot
```
3. Add more lines, one line per item in the parcel:
```
$cypher Detonation l=1d6
$armor Leather jerkin q=4
```
4. Drag the journal page onto an actor to give them the loot!

## Documentation

### Directives

Directives are the first part of each line in a parcel, indicating what type of item is in the parcel.
A directive begins with a `$`.

Some directives support additional arguments. An optional argument is enclosed in square brackets, like `[this]`,
whereas a required argument is enclosed in angle brackets, like `<this>`. Arguments are explained in the
description for the directive.

| Directive | Arguments | System | Description |
| - | - | - | - |
| `$loot` | None | All | Marks the journal page as a loot parcel |
| `$currency` | `[name] <quantity>` | All | This is for money. The `name` is the type of currency, if the system supports more than one kind. If omitted, the default currency for the system is used. `quantity` indicates the amount. |
| `$armor` | `<name>` | All | Armor or shields. |
| `$weapon` | `<name>` | All | A weapon. |
| `$equipment` | `<name>` | All | A piece of gear. |
| `$iotum` | `<name>` | Cypher | A specific type of iotum. |
| `$parts` | `<name>` | Cypher | A quantity of parts. |
| `$cypher` | `<name>` | Cypher | A cypher. |
| `$artifact` | `<name>` | Cypher | An artifact. |

Most parcel items, where the `name` is specified, support using a link instead. The link is in the standard form,
`@UUID[<id>]{<name>}`. If a link is provided, the module will look up the item and use all the relevant information
from the item when adding it to the actor. If no item is found, the module will just add an entry to the actor.

Parcel items can also include zero or more optional quantifiers, in the form of key/value pairs separated by an
equal sign (`=`), for example, `q=3`. The currently supported quantifiers are described below.

| Quantifier | Description |
| - | - |
| `q` | Specifies a quantity for the parcel item. If omitted, the quantity defaults to 1. |
| `l` | Indicates the level of the parcel item. If omitted, the level defaults to 1. |
