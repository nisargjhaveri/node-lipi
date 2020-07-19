const assert = require('assert');

const { transliterate } = require("../index");

describe('transliterate', function () {
    describe('Basic sanity', function () {
        const tests = [
            ["Devanagari - Gujarati", "deva", "gujr", "देवनागरी", "દેવનાગરી"],
            ["Gujarati - Devanagari", "gujr", "deva", "ગુજરાતી", "गुजराती"],
            ["Gujarati - ISO 15919", "gujr", "qaab", "ગુજરાતી देवनागरी", "gujarātī dēvanāgarī"],  // This can be considered error.
            ["Devanagari - ISO 15919", "deva", "qaab", "ગુજરાતી देवनागरी", "ગુજરાતી dēvanāgarī"],
        ];

        for (const [name, from, to, text, target] of tests) {
            it(name, function () {
                assert.equal(transliterate(text, from, to), target);
            });
        }
    });

    describe('Long text', function () {
        it('Gujarati - Devanagari', function () {
            assert.equal(
                transliterate("ગુજરાતી (/ɡʊdʒəˈrɑːti/[૭]) ભારત દેશના ગુજરાત રાજ્યની ઇન્ડો-આર્યન ભાષા છે. તે ઇન્ડો-યુરોપિયન ભાષા કુટુંબનો ભાગ છે. ગુજરાતીનો ઉદ્ભવ જૂની ગુજરાતી ભાષા (આશરે ઇ.સ. ૧૧૦૦-૧૫૦૦)માંથી થયો છે. તે ગુજરાત રાજ્ય અને દીવ, દમણ અને દાદરા-નગર હવેલી કેન્દ્રશાસિત પ્રદેશોની અધિકૃત ભાષા છે.", "gujr", "deva"),
                "गुजराती (/ɡʊdʒəˈrɑːti/[७]) भारत देशना गुजरात राज्यनी इन्डो-आर्यन भाषा छे. ते इन्डो-युरोपियन भाषा कुटुंबनो भाग छे. गुजरातीनो उद्भव जूनी गुजराती भाषा (आशरे इ.स. ११००-१५००)मांथी थयो छे. ते गुजरात राज्य अने दीव, दमण अने दादरा-नगर हवेली केन्द्रशासित प्रदेशोनी अधिकृत भाषा छे."
            );
        });

        it('Gujarati - ISO 15919', function () {
            assert.equal(
                transliterate("ગુજરાતી (/ɡʊdʒəˈrɑːti/[૭]) ભારત દેશના ગુજરાત રાજ્યની ઇન્ડો-આર્યન ભાષા છે. તે ઇન્ડો-યુરોપિયન ભાષા કુટુંબનો ભાગ છે. ગુજરાતીનો ઉદ્ભવ જૂની ગુજરાતી ભાષા (આશરે ઇ.સ. ૧૧૦૦-૧૫૦૦)માંથી થયો છે. તે ગુજરાત રાજ્ય અને દીવ, દમણ અને દાદરા-નગર હવેલી કેન્દ્રશાસિત પ્રદેશોની અધિકૃત ભાષા છે.", "gujr", "qaab"),
                "gujarātī (/ɡʊdʒəˈrɑːti/[7]) bhārata dēśanā gujarāta rājyanī inḍō-āryana bhāṣā chē. tē inḍō-yurōpiyana bhāṣā kuṭumbanō bhāga chē. gujarātīnō udbhava jūnī gujarātī bhāṣā (āśarē i.sa. 1100-1500)mānthī thayō chē. tē gujarāta rājya anē dīva, damaṇa anē dādarā-nagara havēlī kēndraśāsita pradēśōnī adhikr̥ta bhāṣā chē."
            );
        });
    });

    describe('ISO 15919', function () {
        const tests = [
            ["disambiguate vowel", "થઇ", "gujr", "tha:i"],
            ["no disambiguation", "થઇ", "gujr", "thai", { disableDisambiguation: true }],
            ["use c and ch", "છાયા ચાર", "gujr", "chāyā cāra"],
            ["use ch and chh", "છાયા ચાર", "gujr", "chhāyā chāra", { useCHandCHH: true }],
            ["chandrabindu", "चाँद सितारे", "deva", "cā̃da sitārē"],
            ["nukta", "ताज़ा ताज़ा", "deva", "tāzā tāzā"],
            ["nukta", "सब अफ़साने", "deva", "saba afasānē"],
            ["anuswara", "काजल, बिंदिया, कंगन, झुमके", "deva", "kājala, bindiyā, kaṅgana, jhumakē"],
            ["virama", "प्यार हुआ इक़रार हुआ प्यार", "deva", "pyāra huā iqarāra huā pyāra"],
            ["delete final schwa", "प्यार हुआ इक़रार हुआ प्यार", "deva", "pyār huā iqarār huā pyār", { deleteFinalSchwa: true }],
            ["empty string", "", "deva", ""],
        ];

        for (const [name, text, from, target, options={}] of tests) {
            it(name, function () {
                assert.equal(transliterate(text, from, "qaab", {"qaab": options}), target);
            });
        }

    });
});
