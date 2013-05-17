var domModule = (function () {
    'use strict';

    var fragmentsBuffer = {},
        BUFFER_LIMIT = 100;

    function appendChild(child, selector) {
        var selectedElement = document.querySelector(selector);
        selectedElement.appendChild(child);
    }

    function removeElement(parentSelector, childSelector) {
        var parentElement = document.querySelector(parentSelector),
            childElement = parentElement.querySelector(childSelector);
        parentElement.removeChild(childElement);
    }

    function attachEventHandler(selector, eventType, eventHandler) {
        var element = document.querySelector(selector);

        if (document.addEventListener) {
            element.addEventListener(eventType, eventHandler, false);
        } else if (document.attachEvent) {
            element.attachEvent("on" + eventType, eventHandler);
        } else {
            element["on" + eventType] = eventHandler;
        }
    }

    function addElementTroughBuffer(selector, elementToAppend) {
        if (!fragmentsBuffer[selector]) {
            var selectedElement = document.querySelector(selector),
                fragment = document.createDocumentFragment();

            fragmentsBuffer[selector] = {
                node: selectedElement,
                fragment: fragment,
                length: 0
            };
        }

        fragmentsBuffer[selector].fragment.appendChild(elementToAppend);
        fragmentsBuffer[selector].length += 1;

        if (fragmentsBuffer[selector].length === BUFFER_LIMIT) {
            fragmentsBuffer[selector].node.appendChild(fragmentsBuffer[selector].fragment);
            delete fragmentsBuffer[selector];
        }
    }

    function querySelectorAll(selector) {
        return document.querySelectorAll(selector);
    }

    return {
        appendChild: appendChild,
        removeElement: removeElement,
        attachEventHandler: attachEventHandler,
        addElementTroughBuffer: addElementTroughBuffer,
        querySelectorAll: querySelectorAll
    };
}());