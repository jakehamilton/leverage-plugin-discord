import { Plugin } from 'leverage-js'
import Discord from 'discord.js'

const client = new Discord.Client()

class P extends Plugin {
    constructor () {
        super()

        this.identifiers = {}
        this.authenticated = false

        this.config = {
            type: 'discord',
            identifier: component => {
                if (!this.identifiers[component.__config__.discord.event]) {
                    this.identifiers[component.__config__.discord.event] = 0
                }

                return `${component.__config__.discord.event}-${this.identifiers[component.__config__.discord.event]++}`
            }
        }
    }

    discord (component) {
        client.on(component.__config__.discord.event, component.discord)
    }

    login (token) {
        if (!this.authenticated) {
            client.login(token)
        }
    }
}

export default new P()
