//11
const URL = fs.readFileSync('../discord.txt') + ""


const {WebhookClient} = require("discord.js")

const client = new WebhookClient({url: URL})

const broadcast = (...embeds) => {
	client.send({embeds})
}