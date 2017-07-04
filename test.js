import fs from 'fs'
import path from 'path'
import discord from './src'
import { manager, Component } from 'leverage-js'

class Ping extends Component {
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

manager.add(new Ping())

discord.login(fs.readSync(path.resolve(__dirname, 'token.txt')))
