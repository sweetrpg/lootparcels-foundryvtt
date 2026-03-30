/**
 * Chat methods.
 */

import { Logging } from "./logging.js";

export class Chat {
    /**
     * Logs a parcel entry to the chat.
     *
     * @param {Actor} actor The actor receiving the parcel entry.
     * @param {Object} args The arguments associated with the parcel entry.
     */
    static async logParcelEntry(actor, args) {
        const chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ user: game.users.find(u => u.isGM) }),
            whisper: ChatMessage.getWhisperRecipients("GM"),
            content: `<div class="loot-parcel-entry">
                        <strong>${actor.name}</strong> received <strong>${args.quantity}x ${args.text}</strong>.
                      </div>`,
        };
        Logging.debug("Chat.logParcelEntry", chatData);
        await ChatMessage.create(chatData);
    }
};
