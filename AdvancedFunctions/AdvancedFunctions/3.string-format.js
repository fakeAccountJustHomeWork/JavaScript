(function (undefined) {
    "use strict";  /* throw exceptions if problem occurs */

    /**
    * Check if the index is within the array.
    *
    * @method isInRange
    * @param {Array} array
    * @param {Number} index
    * @return {Boolean} Returns true on success
    */
    function isInRange(array, index) {
        return index < array.length;
    }

    /**
    * Check if the given character is a digit.
    *
    * @method isDigit
    * @param {String} character
    * @return {Boolean} Returns true on success
    */
    function isDigit(character) {
        var charCode = character.charCodeAt();
        return charCode >= 48 && charCode <= 58;
    }

    /**
    * Replace the placeholder with the value for it.
    *
    * @method replaceToken
    * @param {Arguments} args
    * @return {Void}
    */
    function replaceToken(placeHolderNumber, args) {
        placeHolderNumber++;

        if (isInRange(args, placeHolderNumber)) {
            return args[placeHolderNumber].toString();
        } else {
            if (args.length > 1) {
                throw new TypeError("Argument for {" + placeHolderNumber + "} is not defined.");
            }
        }
    }

    /**
    * Concatinate the format with the arguments in one array
    *
    * @method concatinateFormatAndArguments
    * @param {String} Format string
    * @param {Array} Arguments
    * @return {Array} Arguments
    */
    function concatinateFormatAndArguments(format, args) {
        args.push(format);

        /* Swap the first and the last argument */
        var temp = args[0];
        args[0] = args[args.length - 1];
        args[args.length - 1] = temp;

        return args;
    }

    /**
    * Format a string with array of arguments.
    *
    * @method stringFormatWithArrayOfArgs
    * @param {String} Format string
    * @param {Array} Arguments
    * @return {String} Formatted result
    */
    function stringFormatWithArrayOfArgs(format, args) {
        args = concatinateFormatAndArguments(format, args);
        return stringFormat.apply(undefined, args);
    }

    /**
    * Format a string
    *
    * @method stringFormat
    * @param {String} Format string
    * @param {Array} Arguments
    * @return {String} Formatted result
    */
    function stringFormat(format, args) {
        if (format == null) {
            throw new TypeError("Format is not defined");
        }

        if (args instanceof Array) {
            return stringFormatWithArrayOfArgs(format, args);
        }

        var inPlaceHolder = false,
            placeHolderNumber = "",
            result = "",
            length = format.length;

        for (var i = 0; i < length; i += 1) {
            var character = format[i];

            if (character == '{') {
                /*  We are in placeHolder if the next char exists and it is a digit. */
                if (isInRange(format, i + 1) && isDigit(format[i + 1])) {
                    inPlaceHolder = true;
                    continue;
                }
            }

            /* If we are in placeholder */
            if (inPlaceHolder) {
                if (character == '}') {
                    inPlaceHolder = false;
                    result += replaceToken(placeHolderNumber, arguments);
                    placeHolderNumber = "";
                    continue;
                }

                if (isDigit(character)) {
                    placeHolderNumber += character;
                    continue;
                }
            }

            result += character;
        }

        return result;
    }

    if (!String.format) {
        String.format = stringFormat;
    } else {
        this.stringFormat = stringFormat;
    }
}).call(window);