/**
 * Chat methods.
 */

import { Logging } from "./logging.js";

export class Chat {
    /**
     * Logs a parcel entry to the chat.
     *
     * @param {Actor} actor The actor receiving the parcel entry.
     * @param {String} entryType The type of the parcel entry.
     * @param {Object} args The arguments associated with the parcel entry.
     */
    static async logParcelEntry(actor, entryType, args) {
        const chatData = {
            user: game.user.id,
            speaker: { actor: actor.id, alias: actor.name },
            content: `<div class="loot-parcel-entry"><strong>${entryType}</strong>: ${JSON.stringify(args)}</div>`,
        };
        Logging.debug("Chat.logParcelEntry", chatData);
        await ChatMessage.create(chatData);
    }
};
