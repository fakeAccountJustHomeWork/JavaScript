// cross-browser support
window.requestAnimFrame = (function () {
    "use strict";

    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}());

var rotatorModule = (function () {
    "use strict";

    var rectangTrajectoryDivs = [],
        ellipseTrajectoryDivs = [],
        currentRectAngles = [],
        currentEllipseAngles = [],
        divCount = 0,
        divWidth = 50,
        divHeight = 50;

    function getRandomRGBColor() {
        var red = Math.floor(Math.random() * 255),
            green = Math.floor(Math.random() * 255),
            blue = Math.floor(Math.random() * 255);

        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    function createDiv() {
        var currentDiv = document.createElement("div"),
            strongElement = document.createElement("span");

        strongElement.innerText = divCount;
        currentDiv.style.textAlign = "center";
        currentDiv.appendChild(strongElement);
        currentDiv.style.backgroundColor = getRandomRGBColor();
        currentDiv.style.color = getRandomRGBColor();
        currentDiv.style.border = "1px solid " + getRandomRGBColor();
        currentDiv.style.width = divWidth + "px";
        currentDiv.style.height = divHeight + "px";
        currentDiv.style.position = "absolute";

        document.body.appendChild(currentDiv);
        divCount += 1;

        return currentDiv;
    }

    function addRectangle() {
        rectangTrajectoryDivs.push(createDiv());
        currentRectAngles.push(0);
    }

    function addEllipse() {
        ellipseTrajectoryDivs.push(createDiv());
        currentEllipseAngles.push(0);
    }

    function addElement(type) {
        if (type === "rect") {
            addRectangle();
        } else if (type === "ellipse") {
            addEllipse();
        } else {
            throw new TypeError("Invalid orbit type!");
        }
    }

    function rectangleUpdate(currentDiv, currentAngle) {
        var divX,
            divY,
            rectangleCenterX = 350,
            rectangleCenterY = 350,
            widthOffset = 300,
            heightOffset = 100,
            angleInRadians = currentAngle * (Math.PI / 180),
            cos = Math.cos(angleInRadians),
            sin = Math.sin(angleInRadians),
            absCos = Math.abs(cos),
            absSin = Math.abs(sin);

        divX = rectangleCenterX + widthOffset * (absCos * cos + absSin * sin);
        divY = rectangleCenterY + heightOffset * (absCos * cos - absSin * sin);

        currentDiv.style.top = (divY | 0) + "px";
        currentDiv.style.left = (divX | 0) + "px";
    }

    function ellipseUpdate(currentDiv, currentAngle) {
        var divX,
            divY,
            ellipseCenterX = 350,
            ellipseCenterY = 350,
            majorAxis = 300,
            minorAxis = 100,
            angleInRadians = currentAngle * (Math.PI / 180);

        divX = ellipseCenterX + majorAxis * Math.cos(angleInRadians);
        divY = ellipseCenterY + minorAxis * Math.sin(angleInRadians);

        currentDiv.style.top = (divY | 0) + "px";
        currentDiv.style.left = (divX | 0) + "px";
    }

    function update() {
        var index;

        for (index = 0; index < rectangTrajectoryDivs.length; index += 1) {
            rectangleUpdate(rectangTrajectoryDivs[index], currentRectAngles[index]);
            currentRectAngles[index] += 2;

            if (currentRectAngles[index] >= 360) {
                currentRectAngles[index] -= 360;
            }
        }

        for (index = 0; index < ellipseTrajectoryDivs.length; index += 1) {
            ellipseUpdate(ellipseTrajectoryDivs[index], currentEllipseAngles[index]);
            currentEllipseAngles[index] += 2;

            if (currentEllipseAngles[index] >= 360) {
                currentEllipseAngles[index] -= 360;
            }
        }

        window.requestAnimFrame(update);
    }

    update();

    return {
        addElement: addElement
    };
}());

var addToRectangle = document.getElementById("addRectangle");
addToRectangle.addEventListener("click", function () {
    "use strict";
    rotatorModule.addElement("rect");
}, false);

var addToEllipse = document.getElementById("addEllipse");
addToEllipse.addEventListener("click", function () {
    "use strict";
    rotatorModule.addElement("ellipse");
}, false);