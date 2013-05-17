// the code is taken from:
// http://forums.academy.telerik.com/82535/js-%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%BE-dom-manipulation-3-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0?start=10#a_list_title
// original : http://ajaxian.com/archives/creating-a-queryselector-for-ie-that-runs-at-native-speed
// credits: psotirov.

(function () {
    "use strict";
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selector) {
            var head = document.documentElement.firstChild,
                styleTag = document.createElement("STYLE");

            head.appendChild(styleTag);
            document.arrayOfSelectorNodes = [];

            styleTag.styleSheet.cssText = selector + "{x:expression(document.arrayOfSelectorNodes.push(this))}";
            window.scrollBy(1, 0);
            head.removeChild(styleTag);
            window.scrollBy(-1, 0);

            return document.arrayOfSelectorNodes;
        };
    }

    if (!document.querySelector) {
        document.querySelector = function (selector) {
            return document.querySelectorAll(selector)[0];
        };
    }

    // DEMO
    var element = document.querySelectorAll(".cls .clsA.clsB > span");
    alert(element[0].innerHTML + " is selected.");
}());