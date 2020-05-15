const unicodeBlocks = {
    deva: /[\u0900-\u097F]/u,
    beng: /[\u0980-\u09FF]/u,
    guru: /[\u0A00-\u0A7F]/u,
    gujr: /[\u0A80-\u0AFF]/u,
    orya: /[\u0B00-\u0B7F]/u,
    taml: /[\u0B80-\u0BFF]/u,
    telu: /[\u0C00-\u0C7F]/u,
    knda: /[\u0C80-\u0CFF]/u,
    mlym: /[\u0D00-\u0D7F]/u,
}

function inBlock(char, block) {
    return char.match(unicodeBlocks[block]) ? true : false;
}

/**
 * Detect stript of an input string, if the it is one of the supported scripts.
 *
 * @param {string} str - String for which you want to detect the script.
 * @returns {string} 4-letter, ISO 15924 code for the script. 'qaaa' if script not identified.
 */
function detect(str) {
    str = str.normalize();

    const scripts = {};
    let count = 0;

    for (char of [...str]) {
        if (char.match(/[\s`~!@#$%^&*\-_=+<>.,/?;:'"()\[\]{}|\\1-9]/u)) {
            continue;
        }

        for (script in unicodeBlocks) {
            if (inBlock(char, script)) {
                scripts[script] = (scripts[script] ? scripts[script] : 0) + 1;
                break;
            }
        }

        count++;

        // If we have seen at least 10 characters, and if we have at least .9 confidence on a script, return.
        if (count >= 10) {
            for (script in scripts) {
                if (scripts[script] / count >= 0.9) {
                    return script;
                }
            }
        }

        // If we reach 50 characters, and still don't have .9 confidence, break.
        if (count >= 50) {
            break;
        }
    }

    // Either the input string is exhausted or we've seen at least 50 characters
    // Return the script with at least .7 confidence
    for (script in scripts) {
        if (scripts[script] / count >= 0.7) {
            return script;
        }
    }

    return 'qaaa';
}

module.exports = detect;
