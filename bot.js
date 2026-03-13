const https = require('https');

// Unga Config
const TG_TOKEN = "8685608225:AAH9_ncjvU38F3XxAlnXqbgmwqO7s0rIysU";
const TG_CHAT_ID = "-1003558999419";
const API_URL = "https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json?gameCode=WinGo_30S";

async function startEngine() {
    https.get(API_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            const json = JSON.parse(data);
            const last = json.data.list[0];
            const nextPeriod = (BigInt(last.issueNumber) + 1n).toString();
            const predict = parseInt(last.number) >= 5 ? "BIG 🔴" : "SMALL 🟢";
            
            const msg = `🚀 DHARIK AI 24/7 🚀\n\n📌 Period: ${nextPeriod}\n🎯 Prediction: ${predict}\n💰 Strategy: LEVEL 1`;
            
            // Telegram-ku anuppum logic
            https.get(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(msg)}`);
            console.log("Signal Sent for: " + nextPeriod);
        });
    });
}

startEngine();
