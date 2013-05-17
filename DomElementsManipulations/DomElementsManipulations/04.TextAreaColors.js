(function () {
    'use strict';

    var changeColors = function onChangeColors() {
        var fontColor = document.getElementById("firstInput").value,
            backgroundColor = document.getElementById("secondInput").value,
            textArea = document.getElementsByTagName("textarea")[0];

        textArea.style.color = fontColor;
        textArea.style.backgroundColor = backgroundColor;
    },
        buttonChange = document.getElementById("buttonChange");

    buttonChange.onclick = changeColors;
}());