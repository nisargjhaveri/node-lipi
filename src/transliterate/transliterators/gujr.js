module.exports = {
    // Gujarati Unicode block: 0A80-0AFF
    // From this range, 0A80-0AF0 is a strict subset of the corresponding range in Devanagari

    toDevanagari(str) {
        return str
            // Replace everything between 0A80-0AF0 first
            .replace(/[\u0A80-\u0AF0]/ug, (match) => {
                return String.fromCodePoint(match.codePointAt(0) - 0x0A80 + 0x0900);
            })
            // Replace 0AF1 GUJARATI RUPEE SIGN
            .replace(/\u0AF1/ug, "\u20B9")
            // 0AF2-0AFF are not supported
    },

    fromDevanagari(str) {
        let moveCodePoint = (match) => {
            return String.fromCodePoint(match.codePointAt(0) - 0x0900 + 0x0A80);
        }

        return str
            // DEVANAGARI SIGN INVERTED CANDRABINDU ==> DEVANAGARI SIGN CANDRABINDU
            .replace(/\u0900/ug, "\u0901")
            // DEVANAGARI LETTER SHORT A ==> DEVANAGARI LETTER A
            .replace(/\u0904/ug, "\u0905")
            // DEVANAGARI LETTER SHORT E ==> DEVANAGARI LETTER E
            .replace(/\u090E/ug, "\u090F")
            // DEVANAGARI LETTER SHORT O ==> DEVANAGARI LETTER O
            .replace(/\u0912/ug, "\u0913")
            // DEVANAGARI LETTER NNNA ==> DEVANAGARI LETTER NA + DEVANAGARI SIGN NUKTA
            .replace(/\u0929/ug, "\u0928\u093C")
            // DEVANAGARI LETTER RRA ==> DEVANAGARI LETTER RA + DEVANAGARI SIGN NUKTA
            .replace(/\u0931/ug, "\u0930\u093C")
            // DEVANAGARI LETTER LLLA ==> DEVANAGARI LETTER LLA + DEVANAGARI SIGN NUKTA
            .replace(/\u0934/ug, "\u0933\u093C")
            // DEVANAGARI VOWEL SIGN SHORT E ==> DEVANAGARI VOWEL SIGN E
            .replace(/\u0946/ug, "\u0947")
            // DEVANAGARI VOWEL SIGN SHORT O ==> DEVANAGARI VOWEL SIGN O
            .replace(/\u094A/ug, "\u094B")
            // DEVANAGARI VOWEL SIGN AW ==> DEVANAGARI VOWEL SIGN AU
            .replace(/\u094F/ug, "\u094C")
            // Devanagari is normalized for Gujarati, As much as possible and currently supported
            // 0900, 0904, 090E, 0912, 0929, 0931, 0934 are normalized above
            .replace(/[\u0900-\u0939]/ug, moveCodePoint)
            // 093A-093B are not supported
            // 0946, 094A are normalized above
            .replace(/[\u093C-\u094D]/ug, moveCodePoint)
            // 0946, 094A is normalized above
            .replace(/[\u0950]/ug, moveCodePoint)
            // 0951-0957 are not supported
            // 0958-095F Does not occur in NFC normalized
            .replace(/[\u0960-\u0963]/ug, moveCodePoint)
            // 0964-0965 Danda, keep as is
            .replace(/[\u0966-\u0970]/ug, moveCodePoint)
            // 0971-097F are not supported
    }
};
