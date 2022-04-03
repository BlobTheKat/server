//11
let broadcast = () => {}
try{
	const URL = fs.readFileSync('../discord.txt') + ""


	const {WebhookClient} = require("discord.js")

	const client = new WebhookClient({url: URL})

	broadcast = (...embeds) => {
		client.send({embeds})
	}
}catch(e){}