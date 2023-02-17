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
    console.log(`rephrase request, `, text);
    text = '{\n' + text + '\n}';

    const chatReq = "These values of json are for the i18n of a commercial website.\n" +
        "Please polish the values of this json\n" +
        "Don't change too much.\n" +
        "Give me a json string: \n";
    console.log('chatApi req: ', chatReq);
    const ans = chatCall(chatReq + text);
    ans.then(v => {
        console.log('rephrase response, ', v.data.choices);
        console.log('\n');

        let anstext = v.data.choices[0].text;
        anstext = unescape(anstext);
        anstext = anstext.substring(anstext.indexOf('{') + 1);
        anstext = anstext.substring(0, anstext.indexOf('}'));
        anstext = anstext.trim();

        console.log('response: ', anstext);
        res.send({"text": anstext});
    })
});

router.post('/translate', function(req, res, next) {
    let  text = req.body.text;
    const lang = req.body.lang;

    text = '{\n' + text + '\n}';
    let lan = lanMap[lang];
    console.log(`rephrase lang, text, `, lan, text);

    const chatReq = "These values of json are for the i18n of a commercial website.\n" +
        "Please translate the values of this json, translate to " + lan + "\n" +
        "Give me a json string: \n";
    console.log('chatApi req: ', chatReq);
    const ans = chatCall(chatReq + text);

    ans.then(v => {
        console.log('translate response, ', v.data.choices);
        console.log('\n');

        let anstext = v.data.choices[0].text;
        anstext = unescape(anstext);
        anstext = anstext.substring(anstext.indexOf('{') + 1);
        anstext = anstext.substring(0, anstext.indexOf('}'));
        anstext = anstext.trim();

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
