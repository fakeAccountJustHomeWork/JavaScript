(function myfunction() {
    'use strict';

    function generateDivs() {
        var fragments = document.createDocumentFragment(),
            index = 0,
            divElementsCount = 7,
            centerToDivDistance = 100,
            angleBetweenDivs = 2 * Math.PI / divElementsCount,
            rotationCenterOffset = 150,
            angleOfRotation = 0,
            timeInterval = 50,
            div,
            strong,
            divArray;


        for (index = 0; index < divElementsCount; index++) {
            div = document.createElement("div");
            strong = document.createElement("strong");
            strong.innerHTML = index;
            div.appendChild(strong);
            fragments.appendChild(div);
			
			setInterval(function () {
            for (index = 0; index < divElementsCount; index++) {
                var currentDiv = divArray[index];
                currentDiv.style.top = (rotationCenterOffset + centerToDivDistance * Math.sin(angleBetweenDivs * index + angleOfRotation)) + 'px';
                currentDiv.style.left = (rotationCenterOffset + centerToDivDistance * Math.cos(angleBetweenDivs * index + angleOfRotation)) + 'px';
            }

            angleOfRotation += Math.PI / 200;
        }, timeInterval);
        }

        document.body.appendChild(fragments);
        divArray = document.getElementsByTagName("div");

        
    }

    window.onload = generateDivs;
}());