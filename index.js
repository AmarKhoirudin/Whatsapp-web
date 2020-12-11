const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const SESSION_FILE_PATH = './amar-whatsapp-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true })
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
    if (msg.body == "good morning") {
        msg.reply("Selamat pagi");
    }
    if (msg.body == "babi" || msg.body == "babik" || msg.body == "Babi" || msg.body == "Babik" || msg.body == "Bep" || msg.body == "bep" || msg.body == "Beb" || msg.body == "beb") {
        msg.reply("anda berkata kasar");
    }
});

client.initialize();