Discord for [Leverage](http://github.com/jakehamilton/leverage)!
====================

This is a plugin for Leverage that allows the `discord` type of components
to be created.

Config
------

```js
{
    event: 'Any event name from Discord.js'
}
```

Example
-------

```js
import { manager, Component } from 'leverage-js'
import discord from 'leverage-plugin-discord'

class Bot extends Component {
    constructor () {
        super()

        this.config = {
            type: 'discord',
            discord: {
                event: 'message'
            }
        }
    }

    discord (message) {
        if (message.content.startsWith('ping')) {
            message.channel.send('pong')
        }
    }
}

manager.plugin(discord)

manager.add(new Bot())

discord.login('<YOUR_BOT_TOKEN>')
```
