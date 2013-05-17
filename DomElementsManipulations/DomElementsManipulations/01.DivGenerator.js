(function () {
    'use strict';

    var colorRange = 255,
    //class random
        random = {
            getColor: function () {
                var red = Math.floor((Math.random() * colorRange)),
                    green = Math.floor((Math.random() * colorRange)),
                    blue = Math.floor((Math.random() * colorRange));

                return 'rgb(' + red + ',' + green + ',' + blue + ')';
            },
            getNumberInRange: function (min, max) {
                return Math.floor((Math.random() * (max - min) + min));
            }
        };

    function generateDivs() {
        var fragments = document.createDocumentFragment(),
            divCount = 100,
            maxDivLimit = 100,
            minDivLimit = 20,
            maxDivBorderSize = 20,
            minDivBorderSize = 1,
            maxBorderRadius = 20,
            maxOffset = 100,
            div,
            strong,
            index;

        for (index = 0; index < divCount; index++) {
            div = document.createElement("div");
            strong = document.createElement("strong");

            strong.style.color = random.getColor();
            strong.innerHTML = "div";

            div.appendChild(strong);

            div.style.textAlign = 'center';
            div.style.width = random.getNumberInRange(minDivLimit, maxDivLimit) + 'px';
            div.style.height = random.getNumberInRange(minDivLimit, maxDivLimit) + 'px';
            div.style.backgroundColor = random.getColor();
            div.style.position = 'absolute';
            div.style.left = random.getNumberInRange(0, maxOffset) + '%';
            div.style.top = random.getNumberInRange(0, maxOffset) + '%';
            div.style.borderRadius = random.getNumberInRange(0, maxBorderRadius) + 'px';
            div.style.border = random.getNumberInRange(minDivBorderSize, maxDivBorderSize) + 'px' + ' solid ' + random.getColor();

            fragments.appendChild(div);
        }

        document.body.appendChild(fragments);
    }

    window.onload = generateDivs;
}());