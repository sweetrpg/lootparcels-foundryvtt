/*
	Those scripts are aimed solely for the Cypher Systems on FoundryVTT made by Mrkwnzl and will
	probably (totally in fact) not work with any other systems.

	Those add-ons could be totally added directly inside the Cypher System at a later date
	All of them are well-commented/documented and normally kept as understandable as possible for
	anyone to pick them and modify/patch them as they wish.
	I have no business in keeping anything obfuscated and blind. My main thoughts are that everyone
	has to start somewhere and understanding other code is one way to do so. With this, I aim to
	keep those different scripts as light as possible.

	Moreover, all of my scripts are totally free to use, modify, etc. as they are under the BSD-3-Clause
	license. I just ask for you to try to keep the same scope as me and if possible, a little credit is
	always appreciated ;)
	Also, feel free to make a pull request! I will be more than happy to see what are your QOL too!

	However, everyone has his/her/its/their own way to code and mine is mine, so if you were not able
	to understand something, please feel free to ask me on Discord.

	This is my structure:
	- 'Globales' are var used everywhere in this js and do not need to be re-made each time
	- 'Classes' are either specific or custom classes used for scripts
	- 'Handlers' are scripts that handle (or hook) specific events
	- 'Functions' are functions either called by handlers or anywhere else, they hold most of my scripts
	- 'Utilities' are scripts to do small calculation across other functions

	Cheers,
	Nice to see you (NiceTSY)
*/

'use strict';

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

		let r = new Roll(valueOrDieSpec)
		await r.evaluate();

		Logging.debug("total", r.total);
		return r.total;
	}

	static parseLink(text) {
		Logging.debug('parseLink', text);

		const linkExpr = /@UUID\[(\S+)\]\{(.+?)\}/;
		let matchResult = text.match(linkExpr);
		if (matchResult === undefined || matchResult === null) {
			return null;
		}

		return {
			id: matchResult[1],
			name: matchResult[2],
		};
	}
};