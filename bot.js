const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')
const { v4: uuidv4} = require('uuid')

const tg_api_key = 'YOUR_TELEGRAM_API_KEY' // Телеграм апи ключ
const gigachat_auth_data = 'YOUR_GIGACHAT_AUTH_DATA' // Авторизационные данные GigaChat
const gigachat_scope = 'YOUR_GIGACHAT_SCOPE' // GIGACHAT_API_CORP / GIGACHAT_API_PERS

const bot = new Telegraf(tg_api_key, {handlerTimeout: Infinity})

let gigachat_api_key // Получается автоматически

bot.start(async (ctx) => {

    const obj = await (await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${gigachat_auth_data}`,
            'RqUID': uuidv4(), // генерация уникального uuid для получения апи ключа гигачата
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeURI(`scope=${gigachat_scope}`)

    })).json()

    gigachat_api_key = obj.access_token

    ctx.reply('Добро пожаловать в Телеграм бота GigaChat. Напиши запрос и тебе ответит последняя версия нейросети😎')
})

bot.on('message', async (ctx) => {

    const obj = await (await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions',{ 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${gigachat_api_key}`
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

    ctx.reply(obj.choices[0].message.content)
})

bot.launch()
console.log(`Telegram Bot запущен!`)
