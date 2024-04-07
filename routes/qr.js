require('../settings');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {makeid, vStore} = require('../lib/scan/Function');
const mongoose = require('mongoose')
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore, } = require("@whiskeysockets/baileys");
function removeFile(FilePath){
const tmpFiles = fs.readdirSync('./routes/'+FilePath)
         if(tmpFiles.length > 0) tmpFiles.map(v => fs.unlinkSync('./routes/'+FilePath+'/'+v))
      };

router.get("/scan", (req, res) => {
  const qrImagePath = path.join(__dirname, "../qr.png");

  try {
    const qrImage = fs.readFileSync(qrImagePath);
    const base64Image = Buffer.from(qrImage).toString("base64");
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>QR Code</title>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        text-align: center;
                    }
                    img {
                        display: block;
                        margin: 0 auto;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>QR Code</h1>
                    <img src="data:image/png;base64,${base64Image}" alt="QR Code" width="300" height="300">
                </div>
            </body>
            </html>
        `);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

//qrgeneration for whatsapp bot

router.get('/api/session/create', async (req, res) => {
console.log(mongoose.connection.readyState);
mongoose.connect(keymongodb2)
 .then(() => console.log('Connected!'))
async function Getqr() {
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  try {
    let qrSent = false;
    let session = makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: Browsers.macOS("Desktop"),
      auth: state
    });
    session.ev.on("connection.update", async (s) => {
      const { connection, lastDisconnect, qr } = s;
      if(qr){
    await QRCode.toFile('./routes/qr.png', qr, {
    errorCorrectionLevel : "H",
    width : 1200,
    color: {
    dark: '#000000', 
    light: '#FFFFFF'
           }
        });
        if (!res.headersSent) {
      await res.sendFile("/routes/qr.png", {root:"."});
      qrSent = true;
    }
      }
      if (connection == "open") {
        await delay(500);
        await vStore(session.user.id);
        let {encryptedPlainText} = await makeid(session.user.id);
  const reply = async () => { 
     await session.sendMessage(session.user.id, {text:'alpha~'+encryptedPlainText})
  }
    await reply();
    await mongoose.connection.close(function(){console.log("test")})
    await removeFile("auth_info_baileys");
    process.exit(1)
      }
      session.ev.on('creds.update', saveCreds)
      if (
        connection === "close" &&
        lastDisconnect &&
        lastDisconnect.error &&
        lastDisconnect.error.output.statusCode != 401
      ) {
        Getqr();
      }
    });
  } catch (err) {
    // console.log(err);
    await removeFile("auth_info_baileys");
    process.exit(1)
  }
}
await Getqr()
//return //'qr.png', { root: "./" });
});
//session id restoration for whatsapp bots
router.get('/api/session/restore', async (req, res) => {
    mongoose.connect(keymongdb2)
     .then(() => console.log('Connected!'))
    const {storedb} = require('../lib/scan/db');
    let id = req.query.id
    await storedb.find({id:id}).then(async(v)=>{
    if(v[0]){
          await res.json({
            status: true,
            creator: `${creator}`,
            result: v
                    })
            } else {
          await res.json({
            status: false,
            creator: `${creator}`,
            result: "no data for your session"
                })
    setTimeout(()=>{
    return mongoose.connection.close(function(){console.log("test")});
    }, 4500);
               }
         })
    })









module.exports = router;
