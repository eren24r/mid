import {session, Telegraf, Markup} from 'telegraf'
import { message } from 'telegraf/filters'
import timeout from 'p-timeout'
import {code, link} from 'telegraf/format'
import config from 'config'
import { ogg } from './ogg.js'
import { removeFile } from './utils.js'
import {chatMidGen} from './apiMed.js'
import {kerDown} from "./imgdownloader.js";
import {chatMidGen2} from './apiMedGiveImg.js'
import {buttons} from './buttonsMid.js'
import {buttonsVVV} from './buttonsMidVVVV.js'
import {buttonGetId} from './getButtonId.js'
import { initCommand, newChatKer, chatGen, transcription, generateIamge, INITIAL_SESSION } from './openai.js'
import path, {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import fs, {createWriteStream} from "fs";
import axios from "axios";
const __dirname = dirname(fileURLToPath(import.meta.url))

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

// говорим боту, чтобы он использовал session
bot.use(session())

// при вызове команды new и start бот регистрирует новую беседу,
// новый контекс
bot.command('start', initCommand)

let msgId = null;

bot.on(message('text'), async (ctx) => {
    try {
        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('U1', 'U1'),
                Markup.button.callback('U2', 'U2'),
                Markup.button.callback('U3', 'U3'),
                Markup.button.callback('U4', 'U4'),
            ],
            [
                Markup.button.callback('V1', 'V1'),
                Markup.button.callback('V2', 'V2'),
                Markup.button.callback('V3', 'V3'),
                Markup.button.callback('V4', 'V4')
            ],
            [
                Markup.button.callback('🔄', 'button7'),
            ]
        ]);

        const tmp = ctx.message.text

        msgId = await chatMidGen(ctx, tmp);

        await ctx.reply("Запрос отправлен!");
        console.log(msgId);

        let imageUr = await chatMidGen2(ctx, msgId);
        await kerDown(imageUr, msgId);

        //await ctx.replyWithPhoto({ source: `img/${msgId}.png` },   Extra.markup(keyboard ));
        await ctx.telegram.sendPhoto(ctx.message.chat.id, { source: `img/${msgId}.png` }, keyboard)

        await ctx.reply(tmp);
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
})

// Обработчик нажатия на кнопку
await bot.action('U1', async (ctx) => {
    try {
        await ctx.reply('U1');
        let buttonId = await buttonGetId(ctx, msgId);
        //U1
        console.log(buttonId)
        let U1 = await buttons(ctx, "U1", buttonId);
        console.log(U1)
        await kerDown(U1, `${buttonId}U1`);
        await ctx.replyWithDocument({ source: `img/${buttonId}U1.png`});
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

// Обработчик нажатия на кнопку
await bot.action('U2', async(ctx) => {
    try {
        await ctx.reply('U2');
        let buttonId = await buttonGetId(ctx, msgId);
        //U2
        console.log(buttonId)
        let U2 = await buttons(ctx, "U2", buttonId);
        console.log(U2)
        await kerDown(U2, `${buttonId}U2`);
        await ctx.replyWithDocument({source: `img/${buttonId}U2.png`});
    }catch(e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

// Обработчик нажатия на кнопку
await bot.action('U3', async(ctx) => {
    try {
        await ctx.reply('U3');
        let buttonId = await buttonGetId(ctx, msgId);
        //U1
        console.log(buttonId)
        let U3 = await buttons(ctx, "U3", buttonId);
        console.log(U3)
        await kerDown(U3, `${buttonId}U3`);
        await ctx.replyWithDocument({source: `img/${buttonId}U3.png`});
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

// Обработчик нажатия на кнопку
await bot.action('U4', async(ctx) => {
    try {
        await ctx.reply('U4');
        let buttonId = await buttonGetId(ctx, msgId);
        //U1
        console.log(buttonId)
        let U4 = await buttons(ctx, "U4", buttonId);
        console.log(U4)
        await kerDown(U4, `${buttonId}U4`);
        await ctx.replyWithDocument({source: `img/${buttonId}U4.png`});
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

// Обработчик нажатия на кнопку
await bot.action('V1', async(ctx) => {
    try {
        await ctx.reply('V1');

        let keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('U1', 'U1'),
                Markup.button.callback('U2', 'U2'),
                Markup.button.callback('U3', 'U3'),
                Markup.button.callback('U4', 'U4'),
            ],
            [
                Markup.button.callback('V1', 'V1'),
                Markup.button.callback('V2', 'V2'),
                Markup.button.callback('V3', 'V3'),
                Markup.button.callback('V4', 'V4')
            ],
            [
                Markup.button.callback('🔄', 'button7'),
            ]
        ]);

        let buttonId = await buttonGetId(ctx, msgId);

        msgId = await buttonsVVV(ctx, "V1", buttonId);
        await bot.telegram.sendPhoto(ctx.chat.id, {source: `img/${buttonId}V1.png`}, keyboard)
        console.log(msgId);
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

// Обработчик нажатия на кнопку
await bot.action('V2', async(ctx) => {
    try {
        await ctx.reply('V2');

        let keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('U1', 'U1'),
                Markup.button.callback('U2', 'U2'),
                Markup.button.callback('U3', 'U3'),
                Markup.button.callback('U4', 'U4'),
            ],
            [
                Markup.button.callback('V1', 'V1'),
                Markup.button.callback('V2', 'V2'),
                Markup.button.callback('V3', 'V3'),
                Markup.button.callback('V4', 'V4')
            ],
            [
                Markup.button.callback('🔄', 'button7'),
            ]
        ]);

        let buttonId = await buttonGetId(ctx, msgId);

        msgId = await buttonsVVV(ctx, "V2", buttonId);
        await bot.telegram.sendPhoto(ctx.chat.id, {source: `img/${buttonId}V2.png`}, keyboard)
        console.log(msgId);
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

// Обработчик нажатия на кнопку
await bot.action('V3', async(ctx) => {
    try {
        await ctx.reply('V3');

        let keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('U1', 'U1'),
                Markup.button.callback('U2', 'U2'),
                Markup.button.callback('U3', 'U3'),
                Markup.button.callback('U4', 'U4'),
            ],
            [
                Markup.button.callback('V1', 'V1'),
                Markup.button.callback('V2', 'V2'),
                Markup.button.callback('V3', 'V3'),
                Markup.button.callback('V4', 'V4')
            ],
            [
                Markup.button.callback('🔄', 'button7'),
            ]
        ]);

        let buttonId = await buttonGetId(ctx, msgId);

        msgId = await buttonsVVV(ctx, "V3", buttonId);
        await bot.telegram.sendPhoto(ctx.chat.id, {source: `img/${buttonId}V3.png`}, keyboard)
        console.log(msgId);
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

// Обработчик нажатия на кнопку
await bot.action('V4', async(ctx) => {
    try {
        await ctx.reply('V4');

        let keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('U1', 'U1'),
                Markup.button.callback('U2', 'U2'),
                Markup.button.callback('U3', 'U3'),
                Markup.button.callback('U4', 'U4'),
            ],
            [
                Markup.button.callback('V1', 'V1'),
                Markup.button.callback('V2', 'V2'),
                Markup.button.callback('V3', 'V3'),
                Markup.button.callback('V4', 'V4')
            ],
            [
                Markup.button.callback('🔄', 'button7'),
            ]
        ]);

        let buttonId = await buttonGetId(ctx, msgId);

        ///let V4 = await buttonsVVV(ctx, "V4", buttonId);
        msgId = await buttonsVVV(ctx, "V4", buttonId);
        await bot.telegram.sendPhoto(ctx.chat.id, {source: `img/${buttonId}V4.png`}, keyboard)
        console.log(msgId);
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

await bot.action('button7', async(ctx) => {
    try {
        await ctx.reply('🔄');

        let keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('U1', 'U1'),
                Markup.button.callback('U2', 'U2'),
                Markup.button.callback('U3', 'U3'),
                Markup.button.callback('U4', 'U4'),
            ],
            [
                Markup.button.callback('V1', 'V1'),
                Markup.button.callback('V2', 'V2'),
                Markup.button.callback('V3', 'V3'),
                Markup.button.callback('V4', 'V4')
            ],
            [
                Markup.button.callback('🔄', 'button7'),
            ]
        ]);

        let buttonId = await buttonGetId(ctx, msgId);

        ///let V4 = await buttonsVVV(ctx, "V4", buttonId);
        msgId = await buttonsVVV(ctx, "🔄", buttonId);
        await bot.telegram.sendPhoto(ctx.chat.id, {source: `img/${buttonId}🔄.png`}, keyboard)
        console.log(msgId);
    }catch (e){
        await ctx.telegram.sendMessage(ctx.chat.id, "МидЖерни не отвечает.\nПовторите поже!")
    }
});

bot.launch()

