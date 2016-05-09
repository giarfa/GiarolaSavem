var accepts = require('accepts');
var lang = require('./lang');

exports.ensureLang = function(req, res, next) {
    var langs = accepts(req).lang();

    var bestMatch = lang.defaultLang;

    var continueLoop = true;
    langs.forEach(function(l) {
        if (! continueLoop)
            return;
        lang.supportedLangs.forEach(function(sl) {
            if (! continueLoop)
                return;
            if (l === sl) {
                bestMatch = l;
                continueLoop = false;
            }
        });
    });

    req.lang = bestMatch;
    next();
};