const qrcode = require('qrcode-terminal');
const express = require('express');
const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  authStrategy: new LocalAuth()
});

app.get('/', (req, res) => {
  // Generate and display the QR code
  client.on('qr', qr => {
    qrcode.generate(qr, { small: true }, qrCode => {
      const html = `
        <html>
          <body>
            <h1>WhatsApp QR Code</h1>
            <pre>${qrCode}</pre>
          </body>
        </html>
      `;
  
      res.send(html);
    });
  });

  // Handle incoming messages
  client.on('message', async message => {
    const content = message.body;
    if (content === 'Pls meme') {
        const meme = await axios("https://meme-api.com/gimme")
          .then(res => res.data);
    
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url));
      }
    if (content === 'pls meme') {
      const meme = await axios("https://meme-api.com/gimme")
        .then(res => res.data);
  
      client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url));
    }
  
    if (content === 'pls cat') {
      const cat = await axios("https://cataas.com/cat")
        .then(res => res.data);
  
      client.sendMessage(message.from, await MessageMedia.fromUrl(cat.url));
    }
     if (content === 'Pls cat') {
        const cat = await axios("https://cataas.com/cat")
          .then(res => res.data);
    
        client.sendMessage(message.from, await MessageMedia.fromUrl(cat.url));
      }
      if (content === 'Animika') {
        client.sendMessage(message.from, 'chatterbux');
      }
      
  });
  
  // Initialize the WhatsApp client
  client.initialize();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
