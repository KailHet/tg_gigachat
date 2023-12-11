const {Telegraf, Markup, Extra } = require('telegraf')
const fetch = require('node-fetch')
const { v4: uuidv4} = require('uuid')
const fs = require('fs')

const bot = new Telegraf(``, {handlerTimeout: Infinity})

bot.start(async (ctx) => {
    const data = JSON.parse(fs.readFileSync('/root/bots/tg_gigachat/data.json'))

    const uuid = uuidv4()
    console.log(uuid)
    const url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth'
    const obj = await (await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ',
            'RqUID': uuid,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeURI('scope=GIGACHAT_API_CORP')

    })).json()

    data.APIKEY = obj.access_token

    fs.writeFileSync('/root/bots/tg_gigachat/data.json', JSON.stringify(data, undefined, 4))

    ctx.reply('Добро пожаловать в Телеграм бота GigaChat. Напиши запрос и тебе ответит последняя версия нейросети😎')
})

bot.on('message', async (ctx) => {
    const data = JSON.parse(fs.readFileSync('/root/bots/tg_gigachat/data.json'))

    const url = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions'
    const obj = await (await fetch(url,{ 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.APIKEY}`
        },
        body: JSON.stringify({
            "model": 'GigaChat:latest',
            'messages': [
                {
                    "role": 'user',
                    "content": ctx.message.text
                }
            ]
        })
    })).json()

    console.log(obj.choices[0].message.content)

    ctx.reply(obj.choices[0].message.content)
})

bot.launch()
console.log(`Telegram Bot запущен!`)