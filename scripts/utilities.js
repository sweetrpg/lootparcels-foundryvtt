import { Logging } from "./logging.js";

export class Utils {
	/**
	 * Get rid of HTML tag in a string, and ensure paragraphs are separated by line breaks.
	 *
	 * @static
	 * @param 	{ String } html
	 * @return 	{ String }
	 * @memberof Utils
	 */
	static getLinesFromHtml(html) {
		var oldHtml;

		const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
		const tagOrComment = new RegExp(
			'<(?:'
			// Comment body.
			+ '!--(?:(?:-*[^->])*--+|-?)'
			// Special "raw text" elements whose content should be elided.
			+ '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
			+ '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
			// Regular name
			+ '|/?[a-z]'
			+ tagBody
			+ ')>',
			'gi'
		);

		do {
			oldHtml = html;
			html = html.replaceAll('</p>', '</p>\n').replace(tagOrComment, '');
		} while (html !== oldHtml);

		return html.replace(/</g, '&lt;').split('\n').filter(n => n);
	};

	/**
	 * Sanitize a string by removing all characters that are not letters, numbers, or some special characters.
	 *
	 * @static
	 * @param 	{ String } str
	 * @return 	{ String }
	 * @memberof Utils
	 */
	static sanitizeString(str) {
		str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
		return str.trim();
	};

	/**
	 * Capitalize first letter of a string (https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript/53930826#53930826)
	 *
	 * @static
	 * @param {*} [ first, ...rest ]
	 * @param {*} [locale=navigator.language]
	 * @memberof Utils
	 */
	static capitalizeFirstLetter = (str, locale = navigator.language) =>
		str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));

	/**
	 * Get the quantity of an item from a value or die specification.
	 *
	 * @static
	 * @param {string} valueOrDieSpec
	 * @returns {number|null} The total quantity, or null if the specification is invalid.
	 * @memberof Utils
	 */
	static async determineQuantity(valueOrDieSpec) {
		Logging.debug('determineQuantity', valueOrDieSpec);

		try {
			let r = new Roll(valueOrDieSpec)
			await r.evaluate();

			Logging.debug("total", r.total);
			return r.total;
		}
		catch (error) {
			return null;
		}
	}

	/**
	 * Parse a link in the format @UUID[<UUID>]{<name>}
	 *
	 * @static
	 * @param {string} text The text to parse
	 * @returns {object|null} If successfully parsed, an object with the following properties:
	 * - source: The original text that was matched.
	 * - id: The UUID of the linked item.
	 * - name: The name of the linked item.
	 * @memberof Utils
	 */
	static parseLink(text) {
		Logging.debug('parseLink', text);

		const linkExpr = /@UUID\[(\S+)\]\{(.+?)\}/;
		let matchResult = text.match(linkExpr);
		if (matchResult === undefined || matchResult === null) {
			return null;
		}

		return {
			source: matchResult[0],
			id: matchResult[1],
			name: matchResult[2],
		};
	}

	/**
	 * Determine if an item should be stacked.
	 *
	 * @static
	 * @param {Item} item The item to check
	 * @param {Array} types An array of item types to check against.
	 * @param {function|null} callback A callback function that takes an item as an argument and returns a boolean indicating if the item should be stacked.
	 *                               If provided, this callback will be used instead of the default type checking.
	 * @returns {Boolean} Indicates if the item should be stacked.
	 * @memberof Utils
	 */
	static shouldStackItem(item, types, callback) {
		Logging.debug('Utils.shouldStackItem', item, types, callback);

		if(callback) {
			Logging.debug("Using stacked item callback");
			return callback(item);
		}

		const itemType = item.type.toLowerCase();
		const itemSubtype = item.system.subtype?.toLowerCase() || null;

		for (let type of types) {
			Logging.debug('type', type);
			const typeSubtype = type.split(':');
			Logging.debug("typeSubtype", typeSubtype);

			if (typeSubtype[0] === itemType) {
				Logging.debug(`Item's type ${itemType} matches`);

				if (typeSubtype.length > 1) {
					Logging.debug("Registered type requires a subtype", typeSubtype[1]);

					if (typeSubtype[1] === itemSubtype) {
						Logging.debug(`Item's subtype ${itemSubtype} matches`);
						return true;
					}

					Logging.debug("Subtype was required but did not match");
					return false;
				}

				Logging.debug("Subtype was not required");
				return true;
			}
		}

		Logging.debug("No item types matched");
		return false;
	}

};
