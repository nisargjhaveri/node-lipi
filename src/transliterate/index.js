
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
 * @param {Object} options Additional options passed for transliteration
 * @param {Object} options[from] Additional options for the source script
 * @param {Object} options[to] Additional options for the target script
 */
function transliterate(str, from, to, options) {
    str = str.normalize();

    if (from === to
        || !(from in transliterators) || typeof transliterators[from].toDevanagari !== "function"
        || !(to in transliterators) || typeof transliterators[to].fromDevanagari !== "function") {
        // We don't support this language pair
        // Early return the normalized string
        return str;
    }

    const fromOptions = options && from in options ? options[from] : undefined;
    const toOptions = options && to in options ? options[to] : undefined;

    return transliterators[to].fromDevanagari(transliterators[from].toDevanagari(str, fromOptions), toOptions);
}

module.exports = transliterate;
