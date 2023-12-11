# GigaChat Telegram Bot

Телеграм бот с GigaChat API 

# Установка Linux
Для начала нужно подключить сертификат НУЦ Минцифры к Node приложению: https://developers.sber.ru/docs/ru/gigachat/certificates

Там есть сертификат для линукса, нажимаешь `прямой ссылке` (либо тыкни здесь [скачать](https://gu-st.ru/content/Other/doc/russiantrustedca.pem)), скачается сертификат с расширением `pem`, его нужно закинуть в любое место на машинку с ботом

## Подключение сертификата к Node приложению 

1. `npm install npm -g --ca=null` Если вылезла ошибка - это нормально
2. `export NODE_TLS_REJECT_UNAUTHORIZED=0`
3. `npm config set cafile ПУТЬ/К/СЕРТИФИКАТУ.pem`
4. `npm config set strict-ssl false`

Готово, сертификат подключен к приложению

## Дополнительно

Документация GigaChat: https://developers.sber.ru/docs/ru/gigachat/api/authorization

В файле `bot.js` полный бот, осталось прописать только данные авторизации гигачата, апи ключ тг бота и scope гигачата

Scope: если для физ лица, то `GIGACHAT_API_PERS`, если юр лицо `GIGACHAT_API_CORP`


## Управление
/start - Получение апи ключа гигачат

любое сообщение - отправка сообщения в гигачат
