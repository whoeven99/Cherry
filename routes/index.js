var express = require('express');
const {chatCall} = require("../openai");
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Home');
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post('/rephrase', async function(req, res, next) {
    let text = req.body.text;
    // text = '{\n' + text + '\n}';
    const items = split2Sub(tryParse(text));
    const lang = req.body.lang ?? "English"; 

    const response = await getRephraseResponse(items, lang);

    const returnedObjects = response.map(tryParse);

    const result = {};

    returnedObjects.forEach(o => {
        Object.assign(result, o);
    });

    const resStr = JSON.stringify(result);

    console.log(`/rephrase request content:\n` + resStr);

    res.send({"text": resStr});

    // const lang = req.body.lang ?? "English"; 

    // const chatReq = `This is a JSON string for i18n of a website. Please polish the text values and rephrase in ${lang} if necessary. Don't change the keys.
    // Give me a string as JSON literal.\n`;

    // const content = chatReq + text;
    // console.log(`/rephrase request content:\n` + content);

    // callTillSucceeded(content, res);
});

const getRephraseResponse = async(items, lang) => {
    const res = [];

    const chatReq = `This is a JSON string for i18n of a website. Please polish the text values and rephrase in ${lang} if necessary. Don't change the keys.
    Give me a string as JSON literal.\n`;

    const content = chatReq + JSON.stringify(items[0])

    res.push(await callTillSucceeded(content));

    if(items.length > 1) {
        for(let i = 1; i < items.length; i++) {
            const content = chatReq + JSON.stringify(items[i]);
            res.push(await callTillSucceeded(content));
        }
    }

    return res;
}

const tryParse = (content) => {
    let res;
    try {
        res = JSON.parse(content);
    } catch {
        try {
            res = JSON.parse(`{${content}}`);
        } catch {
            res = {};
        }
    }
    return res;
}

const split2Sub = (items, maxLen = 1000) => {
    const res = [];
    let length = 0;
    let tmp = {};
    Object.keys(items).forEach(key => {
        if(length + key.length + items[key].length + 1 > maxLen) {
            res.push(tmp);
            length = 0;
            tmp = {};
        }
        length += (key.length + items[key].length);
        tmp[key] = items[key];
        
    });
    res.push(tmp);
    return res;
}

const callTillSucceeded = async (content) => {
    let res;
    try {
        res = (await chatCall(content)).data.choices[0].text
    } catch {
        res = await callTillSucceeded(content);
    }
    
    console.log(`request: ${content}\n`)
    console.log(`result: ${res}\n`)
    return res;
} 

router.post('/translate', async function(req, res, next) {
    let  text = req.body.text;
    const lang = req.body.lang;

    const items = split2Sub(tryParse(text));
    let languageName = lanMap[lang];

    const response = await getTranslateResponse(items, languageName);

    const returnedObjects = response.map(tryParse);

    const result = {};

    returnedObjects.forEach(o => {
        Object.assign(result, o);
    });

    const resStr = JSON.stringify(result);

    console.log(`/translate request content:\n` + resStr);

    res.send({"text": resStr});

    // const chatReq = `This is a JSON string for i18n of a website. Please translate each of the text value to ${lan}. Don't change the keys. 
    // Pay attention to the different plural forms in different languages, so you should add/remove keys if necessary. For example, "books" might have multiple plural forms in Russian.
    // Give me a string as JSON literal.\n`;
    // const content = chatReq + text;
    // console.log(`/translate request content:\n` + content);

    // callTillSucceeded(content, res);
});

const getTranslateResponse = async(items, lang) => {
    const res = [];

    const chatReq = `This is a JSON string for i18n of a website. Please translate each of the text value to ${lang}. Don't change the keys. 
    Pay attention to the different plural forms in different languages, so you should add/remove keys if necessary. For example, "books" might have multiple plural forms in Russian.
    Give me a string as JSON literal.\n`;

    const content = chatReq + JSON.stringify(items[0])

    res.push(await callTillSucceeded(content));

    if(items.length > 1) {
        for(let i = 1; i < items.length; i++) {
            const content = chatReq + JSON.stringify(items[i]);
            res.push(await callTillSucceeded(content));
        }
    }

    return res;
}

const lanMap = {
    "am": "Amharic",
    "ar": "Arabic",
    "eu": "Basque",
    "bn": "Bengali",
    "en-GB": "British English",
    "pt-BR": "Brazilian Portuguese",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "chr": "Cherokee",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "en": "English",
    "et": "Estonian",
    "fil": "Filipino",
    "fi": "Finnish",
    "fr": "French",
    "de": "German",
    "el": "Greek",
    "gu": "Gujarati",
    "iw": "Hebrew",
    "hi": "Hindi",
    "hu": "Hungarian",
    "is": "Icelandic",
    "id": "Indonesian",
    "it": "Italian",
    "ja": "Japanese",
    "kn": "Kannada",
    "ko": "Korean",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "ms": "Malay",
    "ml": "Malayalam",
    "mr": "Marathi",
    "no": "Norwegian",
    "pl": "Polish",
    "pt-PT": "Portuguese",
    "ro": "Romanian",
    "ru": "Russian",
    "sr": "Serbian",
    "zh-CN": "Simplified Chinese",
    "sk": "Slovak",
    "sl": "Slovenian",
    "es": "Spanish",
    "sw": "Swahili",
    "sv": "Swedish",
    "ta": "Tamil",
    "te": "Telugu",
    "th": "Thai",
    "zh-TW": "Traditional Chinese",
    "tr": "Turkish",
    "ur": "Urdu",
    "uk": "Ukrainian",
    "vi": "Vietnamese",
    "cy": "Welsh"
}

module.exports = router;
