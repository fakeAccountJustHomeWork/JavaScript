(function () {
    "use strict";

    window.requestAnimFrame = (function () {

        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());

    var circleModul = (function () {
        var canvas,
            context,
            circleX = 50,
            circleY = 200,
            speed = 3,
            canvasX = document.getElementById("canvas").offsetWidth,
            canvasY = document.getElementById("canvas").offsetHeight,
            direction = Object.freeze({
                TOP_LEFT: 1,
                TOP_RIGHT: 2,
                BOTTOM_LEFT: 3,
                BOTTOM_RIGHT: 4
            }),
            currentDirection = direction.BOTTOM_RIGHT;

        function getCanvas(selector) {
            canvas = document.querySelector(selector);
            context = canvas.getContext("2d");
            canvasX = canvas.width;
            canvasY = canvas.height;
        }

        function clearCanvas() {
            if (context) {
                context.fillRect(0, 0, canvasX, canvasY);
            }
        }

        function draw() {
            context.fillStyle = "rgb(144,202,215)";
            context.strokeStyle = "rgb(51,125,143)";
            context.lineWidth = 5;

            context.beginPath();
            context.arc(circleX, circleY, 25, 0, 2 * Math.PI, false);
            context.fill();
            context.stroke();

        }

        function xIsWithinTheCanvas(coorX) {
            return coorX >= 0 && coorX <= canvasX;
        }

        function yIsWithinTheCanvas(coorY) {
            return coorY >= 0 && coorY <= canvasY;
        }

        function isWithinCanvasSize(coorX, coorY) {
            return xIsWithinTheCanvas(coorX) && yIsWithinTheCanvas(coorY);
        }

        function calculateCoords() {
            var x, y;

            switch (currentDirection) {
            case direction.TOP_LEFT:
                x = circleX - speed;
                y = circleY - speed;

                if (isWithinCanvasSize(x, y)) {
                    circleX = x;
                    circleY = y;
                } else {
                    if (!xIsWithinTheCanvas(x)) {
                        currentDirection = yIsWithinTheCanvas(y) ? direction.TOP_RIGHT : direction.BOTTOM_RIGHT;
                    } else {
                        currentDirection = direction.BOTTOM_LEFT;
                    }
                }
                break;

            case direction.TOP_RIGHT:
                x = circleX + speed;
                y = circleY - speed;

                if (isWithinCanvasSize(x, y)) {
                    circleX = x;
                    circleY = y;
                } else {
                    if (!xIsWithinTheCanvas(x)) {
                        currentDirection = yIsWithinTheCanvas(y) ? direction.TOP_LEFT : direction.BOTTOM_LEFT;
                    } else {
                        currentDirection = direction.BOTTOM_RIGHT;
                    }
                }
                break;

            case direction.BOTTOM_LEFT:
                x = circleX - speed;
                y = circleY + speed;

                if (isWithinCanvasSize(x, y)) {
                    circleX = x;
                    circleY = y;
                } else {
                    if (!xIsWithinTheCanvas(x)) {
                        currentDirection = yIsWithinTheCanvas(y) ? direction.BOTTOM_RIGHT : direction.TOP_RIGHT;
                    } else {
                        currentDirection = direction.TOP_LEFT;
                    }
                }
                break;

            case direction.BOTTOM_RIGHT:
                x = circleX + speed;
                y = circleY + speed;

                if (isWithinCanvasSize(x, y)) {
                    circleX = x;
                    circleY = y;
                } else {
                    if (!xIsWithinTheCanvas(x)) {
                        currentDirection = yIsWithinTheCanvas(y) ? direction.BOTTOM_LEFT : direction.TOP_RIGHT;
                    } else {
                        currentDirection = direction.TOP_RIGHT;
                    }
                }
                break;
            }
        }

        function animate() {
            calculateCoords();
            clearCanvas();
            draw();
            window.requestAnimFrame(animate);
        }

        return {
            animate: animate,
            getCanvas: getCanvas
        };
    }());

    circleModul.getCanvas("#canvas");
    circleModul.animate();
}());