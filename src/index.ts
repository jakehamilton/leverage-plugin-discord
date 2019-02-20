import {
    Plugin,
    PluginUnit,
    ComponentInstance,
    ComponentConfig,
    ComponentUnit,
    ComponentConfigInstance,
} from '@leverage/core';
import { Client, Message } from 'discord.js';

interface DiscordConfig extends ComponentConfig {
    discord?: {
        event?: string;
        command?: string;
    };
}

interface DiscordConfigInstance extends ComponentConfigInstance {
    discord?: {
        event?: string;
        command?: string;
    };
}

interface DiscordComponent extends ComponentUnit {
    config: DiscordConfig;

    discord: (payload: any) => void;
}

interface DiscordComponentInstance extends ComponentInstance {
    config: DiscordConfigInstance;
}

export class Discord extends Plugin implements PluginUnit {
    type = 'discord';
    client = new Client();
    authenticated = false;

    discord (component: DiscordComponentInstance) {
        if (!('discord' in component.config)) {
            component.config.discord = {};
        }

        if (!('event' in component.config.discord!)) {
            component.config.discord!.event = 'message';
        }

        if (!('discord' in component)) {
            throw new Error(
                `[Discord] Discord components must have a \`discord()\` method`,
            );
        }

        if (
            'command' in component.config.discord! &&
            component.config.discord!.event! === 'message'
        ) {
            this.client.on(
                component.config.discord!.event!,
                (message: Message) => {
                    if (
                        message.content.startsWith(
                            component.config.discord!.command!,
                        )
                    ) {
                        component.discord(message);
                    }
                },
            );
        } else {
            this.client.on(component.config.discord!.event!, component.discord);
        }
    }

    login (token: string) {
        if (!this.authenticated) {
            this.client.login(token);
        }
    }
}

export default Discord;

export {
    DiscordConfig,
    DiscordConfigInstance,
    DiscordComponent,
    DiscordComponentInstance,
};
