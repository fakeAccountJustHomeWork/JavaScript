var specialConsole = (function () {
    "use strict";
    function writeLine(text, args) {
        console.log(String.format.apply(null, arguments));
    }

    function writeError(text, args) {
        console.error(String.format.apply(null, arguments));
    }

    function writeWarning(text, args) {
        console.warn(String.format.apply(null, arguments));
    }

    return {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning: writeWarning
    };
}());