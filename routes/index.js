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

    const chatReq = "This is a JSON file used for i18n of a website.\n" +
        "Please polish the values of this json. Don't change too much.\n" +
        "Give me a string with JSON format back. \n";
    const content = chatReq + text;
    console.log(`/rephrase request content:\n` + content);

    chatCall(content)
        .then(v => {
        console.log('rephrase response, ', v.data.choices);
        console.log('\n');

        let anstext = v.data.choices[0].text;

        console.log('response: ', anstext);
        res.send({"text": anstext});
    })
});

router.post('/translate', function(req, res, next) {
    let  text = req.body.text;
    const lang = req.body.lang;

    text = '{\n' + text + '\n}';
    let lan = lanMap[lang];

    const chatReq = `This is a JSON string for i18n of a website. Please translate each of the text value to ${lan}. Don't change the keys. 
    Pay attention to the different plural forms in different languages, so you should add/remove keys if necessary. For example, "books" might have multiple plural forms in Russian.
    Give me a string as JSON literal.\n`;
    const content = chatReq + text;
    console.log(`/translate request content:\n` + content);

    chatCall(content).then(v => {
        console.log('translate response, ', v.data.choices);
        console.log('\n');

        let anstext = v.data.choices[0].text;

        console.log('response: ', anstext);
        res.send({"text": anstext});
    })
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
