var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Home');
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post('/rephrase', function(req, res, next) {
    const text = req.body.text;
    console.log(`rephrase text, `, text);
    res.send({"text": text});
});

router.post('/translate', function(req, res, next) {
    const text = req.body.text;
    const lang = req.body.lang;

    console.log(`rephrase lang, text, `, lang, text);
    res.send({"text": text});
});

module.exports = router;
