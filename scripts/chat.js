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
    static async logParcelEntry(actor, items) {
        Logging.debug("Chat.logParcelEntry", "actor", actor, "items", items);

        content = items.map(i => `<li><strong>${i.quantity}x ${i.text}</strong></li>`).join('<br/>');

        const chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ user: game.users.find(u => u.isGM) }),
            whisper: ChatMessage.getWhisperRecipients("GM"),
            content: `<div class="loot-parcel-entry">
                        <strong>${actor.name}</strong> received:<br/>
                        <ul>${content}</ul>
                      </div>`,
        };

        Logging.debug("Chat.logParcelEntry", chatData);
        await ChatMessage.create(chatData);
    }
};
