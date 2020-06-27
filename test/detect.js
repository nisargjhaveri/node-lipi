const assert = require('assert');

const { detect } = require("../index");

describe('detect', function () {
    describe('Basic sanity', function () {
        const tests = [
            ["Devanagari", "देवनागरी", "deva"],
            ["Bengali", "বাংলা", "beng"],
            ["Gurumukhi", "ਗੁਰਮੁਖੀ", "guru"],
            ["Gujarati", "ગુજરાતી", "gujr"],
            ["Oriya", "କଳିଙ୍ଗ", "orya"],
            ["Tamil", "தமிழ்", "taml"],
            ["Telugu", "తెలుగు", "telu"],
            ["Kannada", "ಕನ್ನಡ", "knda"],
            ["Malayalam", "മലയാളം", "mlym"],
            ["Mixed, Unknown", "देवनागरी বাংলা ਗੁਰਮੁਖੀ ગુજરાતી କଳିଙ୍ଗ தமிழ் తెలుగు ಕನ್ನಡ മലയാളം", "qaaa"],
            ["English", "English", "qaaa"],
        ];

        for (const [name, text, script] of tests) {
            it(name, function () {
                assert.equal(detect(text), script);
            });
        }
    });

    describe('Long text', function () {
        it('Gujarati', function () {
            assert.equal(detect("ગુજરાતી (/ɡʊdʒəˈrɑːti/[૭]) ભારત દેશના ગુજરાત રાજ્યની ઇન્ડો-આર્યન ભાષા છે. તે ઇન્ડો-યુરોપિયન ભાષા કુટુંબનો ભાગ છે. ગુજરાતીનો ઉદ્ભવ જૂની ગુજરાતી ભાષા (આશરે ઇ.સ. ૧૧૦૦-૧૫૦૦)માંથી થયો છે. તે ગુજરાત રાજ્ય અને દીવ, દમણ અને દાદરા-નગર હવેલી કેન્દ્રશાસિત પ્રદેશોની અધિકૃત ભાષા છે."), "gujr");
        });
        it('Gujarati, Unknown, Confused', function () {
            assert.equal(detect("ગુજરાતી  (/ɡʊdʒəˈrɑːti/[૭])(Gujarati) ભારત દેશના ગુજરાત રાજ્યની ઇન્ડો-આર્યન ભાષા છે.."), "qaaa");
        });
    });
});
