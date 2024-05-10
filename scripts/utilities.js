import { Logging } from "./logging.js";

/*------------------------------------------------------------------------------------------------
------------------------------------------- Class(es) --------------------------------------------
------------------------------------------------------------------------------------------------*/

export class Utils {
	/**
	 * @description Get ride of HTML tag in a string, and ensure paragraphs are separated by line breaks.
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
	 * @description Sanitize a string
	 * @static
	 * @param 	{ String } str
	 * @return 	{ String }
	 * @memberof UTILITIES
	 */
	static sanitizeString(str) {
		str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
		return str.trim();
	};

	/**
	 * @description Capitalize first letter of a string (https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript/53930826#53930826)
	 * @static
	 * @param { * } [ first, ...rest ]
	 * @param { * } [locale=navigator.language]
	 * @memberof UTILITIES
	 */
	static capitalizeFirstLetter = (str, locale = navigator.language) =>
		str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));

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
	 *
	 * @param {Item} item
	 * @param {Array} types
	 * @returns
	 */
	static shouldStackItem(item, types) {
		Logging.debug('Utils.shouldStackItem', item, types);

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
