import {
    Plugin,
    PluginUnit,
    ComponentInstance,
    ComponentConfig,
    ComponentUnit,
    ComponentConfigInstance,
} from '@leverage/core';
import { Client } from 'discord.js';

export interface DiscordConfig extends ComponentConfig {
    discord?: {
        event?: string;
    };
}

export interface DiscordConfigInstance extends ComponentConfigInstance {
    discord?: {
        event?: string;
    };
}

export interface DiscordComponent extends ComponentUnit {
    config: DiscordConfig;

    discord: (payload: any) => void;
}

export interface DiscordComponentInstance extends ComponentInstance {
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

        this.client.on(component.config.discord!.event!, component.discord);
    }

    login (token: string) {
        if (!this.authenticated) {
            this.client.login(token);
        }
    }
}

export default Discord;
