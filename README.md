# Discord for [Leverage](http://github.com/jakehamilton/leverage)!

This is a plugin for Leverage that handles the `discord` type of components
to be created.

## Discord Component

A Discord Component has the following interface:

```typescript
import { ComponentConfig, ComponentUnit } from '@leverage/core';

export interface DiscordConfig extends ComponentConfig {
    discord?: {
        event?: string; // A `Discord.js` event name (defaults to 'message')
    };
}

export interface DiscordComponent extends ComponentUnit {
    config: DiscordConfig;

    discord: (payload: any) => void;
}
```

## Example

```js
import { manager } from '@leverage/core';
import { Discord, DiscordComponent } from '@leverage/plugin-discord';

const discord = new Discord();

const component: DiscordComponent = {
    is: 'component',
    type: 'discord',
    discord ({ channel }) {
        channel.send('Hello, World!');
    },
};

manager.add(discord, component);

discord.login('<YOUR_BOT_TOKEN>');
```

## Questions

Have a question? Feel free to [file an issue](https://github.com/jakehamilton/leverage-plugin-discord/issues/new)!
