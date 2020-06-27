module.exports = {
    // Devanagari Unicode block: 0900-097F
    // For Devanagari this is trivial
    // This is here just so that we don't have to make a special case for this
    toDevanagari(str) {
        return str;
    },

    fromDevanagari(str) {
        return str;
    }
};
