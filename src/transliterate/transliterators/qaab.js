module.exports = {
    // ISO 15919
    // Only supports from devanagari and not to devanagari

    /**
     * @param {string} str String in Devanagari
     * @param {Object} options Additional options
     * @param {boolean} options.disableDisambiguation Disable disambiguation with ":". Default `false`.
     * @param {boolean} options.deleteFinalSchwa Delete schwa at the end of the word. Default `false`.
     * @param {boolean} options.useCHandCHH Use "ch" for "च" and "chh" for "छ" instead of "c" and "ch". Default `false`.
     * @param {boolean} options.autoConvertAnuswaraToChandrabindu Convert Anuswara to Chandrabindu when it occurs before a vowel or at word-final position. Default `false`.
     */
    fromDevanagari(str, options = {}) {
        str = str.normalize();

        options =  {
            disableDisambiguation: false,
            deleteFinalSchwa: false,
            useCHandCHH: false,
            autoConvertAnuswaraToChandrabindu: false,
            ...options
        }

        const charMap = [
            "",		//U+0900	ऀ	DEVANAGARI SIGN INVERTED CANDRABINDU
            "m̐",	//U+0901	ँ	DEVANAGARI SIGN CANDRABINDU
            "ṁ",	//U+0902	ं	DEVANAGARI SIGN ANUSVARA
            "ḥ",	//U+0903	ः	DEVANAGARI SIGN VISARGA
            //
            "a",	//U+0904	ऄ	DEVANAGARI LETTER SHORT A
            "a",	//U+0905	अ	DEVANAGARI LETTER A
            "ā",	//U+0906	आ	DEVANAGARI LETTER AA
            "i",	//U+0907	इ	DEVANAGARI LETTER I
            "ī",	//U+0908	ई	DEVANAGARI LETTER II
            "u",	//U+0909	उ	DEVANAGARI LETTER U
            "ū",	//U+090A	ऊ	DEVANAGARI LETTER UU
            "r̥",	//U+090B	ऋ	DEVANAGARI LETTER VOCALIC R
            "l̥",	//U+090C	ऌ	DEVANAGARI LETTER VOCALIC L
            "ê",	//U+090D	ऍ	DEVANAGARI LETTER CANDRA E
            "e",	//U+090E	ऎ	DEVANAGARI LETTER SHORT E
            "ē",	//U+090F	ए	DEVANAGARI LETTER E
            "ai",	//U+0910	ऐ	DEVANAGARI LETTER AI
            "ô",	//U+0911	ऑ	DEVANAGARI LETTER CANDRA O
            "o",	//U+0912	ऒ	DEVANAGARI LETTER SHORT O
            "ō",	//U+0913	ओ	DEVANAGARI LETTER O
            "au",	//U+0914	औ	DEVANAGARI LETTER AU
            //
            "k",	//U+0915	क	DEVANAGARI LETTER KA
            "kh",	//U+0916	ख	DEVANAGARI LETTER KHA
            "g",	//U+0917	ग	DEVANAGARI LETTER GA
            "gh",	//U+0918	घ	DEVANAGARI LETTER GHA
            "ṅ",	//U+0919	ङ	DEVANAGARI LETTER NGA
            options.useCHandCHH ? "ch" : "c",	//U+091A	च	DEVANAGARI LETTER CA
            options.useCHandCHH ? "chh" : "ch",	//U+091B	छ	DEVANAGARI LETTER CHA
            "j",	//U+091C	ज	DEVANAGARI LETTER JA
            "jh",	//U+091D	झ	DEVANAGARI LETTER JHA
            "ñ",	//U+091E	ञ	DEVANAGARI LETTER NYA
            "ṭ",	//U+091F	ट	DEVANAGARI LETTER TTA
            "ṭh",	//U+0920	ठ	DEVANAGARI LETTER TTHA
            "ḍ",	//U+0921	ड	DEVANAGARI LETTER DDA
            "ḍh",	//U+0922	ढ	DEVANAGARI LETTER DDHA
            "ṇ",	//U+0923	ण	DEVANAGARI LETTER NNA
            "t",	//U+0924	त	DEVANAGARI LETTER TA
            "th",	//U+0925	थ	DEVANAGARI LETTER THA
            "d",	//U+0926	द	DEVANAGARI LETTER DA
            "dh",	//U+0927	ध	DEVANAGARI LETTER DHA
            "n",	//U+0928	न	DEVANAGARI LETTER NA
            "ṉ",	//U+0929	ऩ	DEVANAGARI LETTER NNNA
            "p",	//U+092A	प	DEVANAGARI LETTER PA
            "ph",	//U+092B	फ	DEVANAGARI LETTER PHA
            "b",	//U+092C	ब	DEVANAGARI LETTER BA
            "bh",	//U+092D	भ	DEVANAGARI LETTER BHA
            "m",	//U+092E	म	DEVANAGARI LETTER MA
            "y",	//U+092F	य	DEVANAGARI LETTER YA
            "r",	//U+0930	र	DEVANAGARI LETTER RA
            "ṟ",	//U+0931	ऱ	DEVANAGARI LETTER RRA
            "l",	//U+0932	ल	DEVANAGARI LETTER LA
            "ḷ",	//U+0933	ळ	DEVANAGARI LETTER LLA
            "ḻ",	//U+0934	ऴ	DEVANAGARI LETTER LLLA
            "v",	//U+0935	व	DEVANAGARI LETTER VA
            "ś",	//U+0936	श	DEVANAGARI LETTER SHA
            "ṣ",	//U+0937	ष	DEVANAGARI LETTER SSA
            "s",	//U+0938	स	DEVANAGARI LETTER SA
            "h",	//U+0939	ह	DEVANAGARI LETTER HA
            //
            "",		//U+093A	ऺ	DEVANAGARI VOWEL SIGN OE
            "",		//U+093B	ऻ	DEVANAGARI VOWEL SIGN OOE
            "",		//U+093C	़	DEVANAGARI SIGN NUKTA
            ":’",	//U+093D	ऽ	DEVANAGARI SIGN AVAGRAHA
            "ā",	//U+093E	ा	DEVANAGARI VOWEL SIGN AA
            "i",	//U+093F	ि	DEVANAGARI VOWEL SIGN I
            "ī",	//U+0940	ी	DEVANAGARI VOWEL SIGN II
            "u",	//U+0941	ु	DEVANAGARI VOWEL SIGN U
            "ū",	//U+0942	ू	DEVANAGARI VOWEL SIGN UU
            "r̥",	//U+0943	ृ	DEVANAGARI VOWEL SIGN VOCALIC R
            "l̥",	//U+0944	ॄ	DEVANAGARI VOWEL SIGN VOCALIC RR
            "ê",	//U+0945	ॅ	DEVANAGARI VOWEL SIGN CANDRA E
            "e",	//U+0946	ॆ	DEVANAGARI VOWEL SIGN SHORT E
            "ē",	//U+0947	े	DEVANAGARI VOWEL SIGN E
            "ai",	//U+0948	ै	DEVANAGARI VOWEL SIGN AI
            "ô",	//U+0949	ॉ	DEVANAGARI VOWEL SIGN CANDRA O
            "o",	//U+094A	ॊ	DEVANAGARI VOWEL SIGN SHORT O
            "ō",	//U+094B	ो	DEVANAGARI VOWEL SIGN O
            "au",	//U+094C	ौ	DEVANAGARI VOWEL SIGN AU
            "",		//U+094D	्	DEVANAGARI SIGN VIRAMA
            "",		//U+094E	ॎ	DEVANAGARI VOWEL SIGN PRISHTHAMATRA E
            "",		//U+094F	ॏ	DEVANAGARI VOWEL SIGN AW
            "ॐ",	//U+0950	ॐ	DEVANAGARI OM
            "",		//U+0951	॑	DEVANAGARI STRESS SIGN UDATTA
            "",		//U+0952	॒	DEVANAGARI STRESS SIGN ANUDATTA
            "",		//U+0953	॓	DEVANAGARI GRAVE ACCENT
            "",		//U+0954	॔	DEVANAGARI ACUTE ACCENT
            "",		//U+0955	ॕ	DEVANAGARI VOWEL SIGN CANDRA LONG E
            "",		//U+0956	ॖ	DEVANAGARI VOWEL SIGN UE
            "",		//U+0957	ॗ	DEVANAGARI VOWEL SIGN UUE
            "",		//U+0958	क़	DEVANAGARI LETTER QA
            "",		//U+0959	ख़	DEVANAGARI LETTER KHHA
            "",		//U+095A	ग़	DEVANAGARI LETTER GHHA
            "",		//U+095B	ज़	DEVANAGARI LETTER ZA
            "",		//U+095C	ड़	DEVANAGARI LETTER DDDHA
            "",		//U+095D	ढ़	DEVANAGARI LETTER RHA
            "",		//U+095E	फ़	DEVANAGARI LETTER FA
            "",		//U+095F	य़	DEVANAGARI LETTER YYA
            "r̥̄",	//U+0960	ॠ	DEVANAGARI LETTER VOCALIC RR
            "l̥̄",	//U+0961	ॡ	DEVANAGARI LETTER VOCALIC LL
            "l̥",	//U+0962	ॢ	DEVANAGARI VOWEL SIGN VOCALIC L
            "l̥̄",	//U+0963	ॣ	DEVANAGARI VOWEL SIGN VOCALIC LL
            "।",	//U+0964	।	DEVANAGARI DANDA
            "॥",	//U+0965	॥	DEVANAGARI DOUBLE DANDA
            "0",	//U+0966	०	DEVANAGARI DIGIT ZERO
            "1",	//U+0967	१	DEVANAGARI DIGIT ONE
            "2",	//U+0968	२	DEVANAGARI DIGIT TWO
            "3",	//U+0969	३	DEVANAGARI DIGIT THREE
            "4",	//U+096A	४	DEVANAGARI DIGIT FOUR
            "5",	//U+096B	५	DEVANAGARI DIGIT FIVE
            "6",	//U+096C	६	DEVANAGARI DIGIT SIX
            "7",	//U+096D	७	DEVANAGARI DIGIT SEVEN
            "8",	//U+096E	८	DEVANAGARI DIGIT EIGHT
            "9",	//U+096F	९	DEVANAGARI DIGIT NINE
            "",		//U+0970	॰	DEVANAGARI ABBREVIATION SIGN
            "",		//U+0971	ॱ	DEVANAGARI SIGN HIGH SPACING DOT
            "ê",	//U+0972	ॲ	DEVANAGARI LETTER CANDRA A
            "",		//U+0973	ॳ	DEVANAGARI LETTER OE
            "",		//U+0974	ॴ	DEVANAGARI LETTER OOE
            "",		//U+0975	ॵ	DEVANAGARI LETTER AW
            "",		//U+0976	ॶ	DEVANAGARI LETTER UE
            "",		//U+0977	ॷ	DEVANAGARI LETTER UUE
            "",		//U+0978	ॸ	DEVANAGARI LETTER MARWARI DDA
            "",		//U+0979	ॹ	DEVANAGARI LETTER ZHA
            "",		//U+097A	ॺ	DEVANAGARI LETTER HEAVY YA
            "",		//U+097B	ॻ	DEVANAGARI LETTER GGA
            "",		//U+097C	ॼ	DEVANAGARI LETTER JJA
            "",		//U+097D	ॽ	DEVANAGARI LETTER GLOTTAL STOP
            "",		//U+097E	ॾ	DEVANAGARI LETTER DDDA
            "",		//U+097F	ॿ	DEVANAGARI LETTER BBA
        ];

        const nuktaCharMap = {
            0x0915: "q",    // DEVANAGARI LETTER KA
            0x0916: "k͟h",    // DEVANAGARI LETTER KHA
            0x0917: "ġ",    // DEVANAGARI LETTER GA
            0x091C: "z",    // DEVANAGARI LETTER JA
            0x0921: "ṛ",    // DEVANAGARI LETTER DDA
            0x0922: "ṛh",   // DEVANAGARI LETTER DDHA
            0x0928: "ṉ",    // DEVANAGARI LETTER NA
            0x092B: "f",    // DEVANAGARI LETTER PHA
            0x092F: "ẏ",    // DEVANAGARI LETTER YA
            0x0930: "ṟ",    // DEVANAGARI LETTER RA
            0x0933: "ḻ",    // DEVANAGARI LETTER LLA
        };

        const anuswaraCharMap = {
            0x0919: [[0x0915, 0x0919]],
            0x091E: [[0x091A, 0x091E]],
            0x0923: [[0x091F, 0x0923]],
            0x0928: [[0x0924, 0x0929]],
            0x092E: [[0x092A, 0x092E]],
        };

        const disambiguateVowelA = [
            [0x0907, 0x0908],   // DEVANAGARI LETTER I, II
            [0x0909, 0x090A],   // DEVANAGARI LETTER U, UU
        ];

        const disambiguateConsonentH = [
            0x0915,     //DEVANAGARI LETTER KA
            0x0917,     //DEVANAGARI LETTER GA
            0x091A,     //DEVANAGARI LETTER CA
            0x091C,     //DEVANAGARI LETTER JA
            0x091F,     //DEVANAGARI LETTER TTA
            0x0921,     //DEVANAGARI LETTER DDA
            0x0924,     //DEVANAGARI LETTER TA
            0x0926,     //DEVANAGARI LETTER DA
            0x092A,     //DEVANAGARI LETTER PA
            0x092C,     //DEVANAGARI LETTER BA
        ].map(getChar);

        const chandrabindu = 0x0901;
        const anuswara = 0x0902;
        const virama = 0x094D;
        const nukta = 0x093C;
        const consonents = [
            [0x0915, 0x0939],   // main consonent range
        ];
        const vowels = [
            [0x0904, 0x0914],   // main vowel range
            [0x0960, 0x0961],   // DEVANAGARI LETTER VOCALIC RR, LL
            0x0972,             // DEVANAGARI LETTER CANDRA A
        ];
        const matras = [
            [0x093E, 0x094C],   // main vowel range
            [0x0962, 0x0963],   // DEVANAGARI VOWEL SIGN VOCALIC L, LL
        ];

        const wordCharacters = [
            [0x0900, 0x094F],
            // Skip AUM
            [0x0951, 0x0963],
            // Skip dandas, numbers and puncuations
            [0x0972, 0x097F],
        ]

        const inherentVowel = "a";
        const disambiguationCharacter = options.disableDisambiguation ? "" : ":";
        const combiningTilde = "\u0303";

        function is(charCode, ranges) {
            // If ranges is a single number
            if (typeof ranges === 'number') {
                ranges = [ranges];
            }

            // Otherwise assume ranges is an mixed array of array or numbers
            for (const range of ranges) {
                if (typeof range === 'number') {
                    if (charCode === range) {
                        return true;
                    }
                } else if (range.length === 2) {
                    const [start, end] = range;
                    if (start <= charCode && charCode <= end) {
                        return true;
                    }
                }
                // Unexpected, ignoring
            }

            return false;
        }

        function getChar(charCode) {
            const charCodeMoved = charCode - 0x0900;
            if (charCodeMoved in charMap) {
                return charMap[charCodeMoved];
            }

            return String.fromCodePoint(charCode);
        }

        function deleteSchwa(result, currentState) {
            // Remove last 'a' if exists
            if (currentState === state.CONSONENT && result.length && result[result.length - 1] === inherentVowel) {
                result = result.substring(0, result.length - 1);
            }

            return result;
        }

        const state = {
            OTHER: 0,
            VOWEL: 1,
            CONSONENT: 2,
        };

        const source = [...str].map((c) => c.codePointAt(0));
        const length = source.length;
        let result = "";
        let currentState = state.OTHER;
        for (let i = 0; i < length; ++i) {
            const current = source[i];
            const next = (i < length - 1) ? source[i + 1] : 0;

            if (is(current, vowels)) {
                let target = getChar(current);

                // If not start of word, disambiguate the "a"
                if (is(current, disambiguateVowelA) && result[result.length - 1] === "a") {
                    result += disambiguationCharacter;
                }

                result += target;

                currentState = state.VOWEL;
            }
            else if (is(current, consonents)) {
                let target = getChar(current);

                // Consume the next nukta
                if (is(next, nukta)) {
                    ++i;

                    if (current in nuktaCharMap) {
                        target = nuktaCharMap[current];
                    }
                }

                // Disambiguate the "h"
                if (target[0] === "h" && disambiguateConsonentH.indexOf(result[result.length - 1]) >= 0) {
                    result += disambiguationCharacter;
                }

                result += target;

                if (!options.deleteFinalSchwa || is(next, wordCharacters)) {
                    // Add inherent vowel
                    result += inherentVowel;
                }

                currentState = state.CONSONENT;
            }
            else if (is(current, matras) || is(current, virama)) {
                // Remove last 'a' if exists
                result = deleteSchwa(result, currentState);

                result += getChar(current);

                currentState = is(current, matras) ? state.VOWEL : state.OTHER;
            }
            else if (is(current, anuswara)) {
                let isHandled = false;
                for (const [classNasal, classRange] of Object.entries(anuswaraCharMap)) {
                    if (is(next, classRange)) {
                        result += getChar(classNasal);

                        isHandled = true;
                        break;
                    }
                }

                if (options.autoConvertAnuswaraToChandrabindu) {
                    if ((is(next, vowels) || !is(next, wordCharacters))
                        && (currentState === state.VOWEL || currentState === state.CONSONENT))
                    {
                        result += combiningTilde;
                        isHandled = true;
                    }
                }

                if (!isHandled) {
                    result += getChar(current);
                }

                currentState = state.OTHER;
            }
            else if (is(current, chandrabindu)) {
                if (currentState === state.VOWEL || currentState === state.CONSONENT) {
                    result += combiningTilde;
                } else {
                    result += getChar(current);
                }

                currentState = state.OTHER;
            }
            else {
                // Just add the converted character
                result += getChar(current);

                currentState = state.OTHER;
            }
        }

        return result;
    }
};
