const qrcode = require('qrcode-terminal');
const axios = require('axios');

const { MessageMedia } = require('whatsapp-web.js');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
    
    
});

 

 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', async message => {
    const content = message.body
	if(content  === 'pls meme') {
		const meme = await axios("https://meme-api.com/gimme")
    .then(res => res.data)
    client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
	}
    if(content  === 'pls cat') {
		const cat = await axios("https://cataas.com/cat")
    .then(res => res.data)
    client.sendMessage(message.from, await MessageMedia.fromUrl(cat.url))
	}
});



client.initialize();
