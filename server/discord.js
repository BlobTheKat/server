//11
const URL = "https://discord.com/api/webhooks/941632057208082462/bQMgSP4B0rNTDFbZG5IbjWZ3Y9J2pfdGr-scMZlBvlFDelBia9u8sqZt58o2vK-hSShJ"


const {WebhookClient} = require("discord.js")

const client = new WebhookClient({url: URL})

const broadcast = (...embeds) => {
	client.send({embeds})
}