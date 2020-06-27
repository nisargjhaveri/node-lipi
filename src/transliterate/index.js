
const transliterators = {
    deva: require("./transliterators/deva"),
    gujr: require("./transliterators/gujr"),
    qaab: require("./transliterators/qaab"),
};

/**
 * Transliterate between supported scripts
 *
 * @param {string} str String to transliterate
 * @param {string} from Script code for the source script
 * @param {string} to Script code for the target script
 */
function transliterate(str, from, to) {
    str = str.normalize();

    if (from === to
        || !(from in transliterators) || typeof transliterators[from].toDevanagari !== "function"
        || !(to in transliterators) || typeof transliterators[to].fromDevanagari !== "function") {
        // We don't support this language pair
        // Early return the normalized string
        return str;
    }

    return transliterators[to].fromDevanagari(transliterators[from].toDevanagari(str));
}

module.exports = transliterate;
