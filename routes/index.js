var express = require('express');
const {chatCall} = require("../openai");
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Home');
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post('/rephrase', function(req, res, next) {
    let text = req.body.text;
    text = '{\n' + text + '\n}';

    const lang = req.body.lang ?? "English"; 

    const chatReq = `This is a JSON file used for i18n of a website in ${lang}. 
    Please polish the values of this json in ${lang}. Don't change too much. Give me a string with JSON format back.`;

    const content = chatReq + text;
    console.log(`/rephrase request content:\n` + content);

    callTillSucceeded(content, res);
});

const callTillSucceeded = (content, res) => {
    chatCall(content)
        .then(v => {
            console.log('rephrase response, ', v.data.choices);
            console.log('\n');

            let anstext = v.data.choices[0].text;

            console.log('response: ', anstext);
            res.send({"text": anstext});
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
            callTillSucceeded(content, res);
        })
} 

router.post('/translate', function(req, res, next) {
    let  text = req.body.text;
    const lang = req.body.lang;

    text = '{\n' + text + '\n}';
    let lan = lanMap[lang];

    const chatReq = `This is a JSON file used for i18n of a website. Please translate the text values to ${lan} and don't change the keys. 
    Please be careful about the different plural forms in different languages and add keys if necessary.
    Give me a string with JSON format back.\n`;
    const content = chatReq + text;
    console.log(`/translate request content:\n` + content);

    callTillSucceeded(content, res);
});

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
