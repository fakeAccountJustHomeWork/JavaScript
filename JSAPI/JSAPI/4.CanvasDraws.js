(function () {
    "use strict";

    var context = document.getElementById("canvas").getContext("2d"),
        drawBikeButton = document.getElementById("drawBike"),
        drawHeadButton = document.getElementById("drawHead"),
        drawHouseButton = document.getElementById("drawHouse");

    context.fillStyle = "rgb(144,202,215)";
    context.strokeStyle = "rgb(51,125,143)";
    context.lineWidth = 5;

    function clearCanvas() {
        var canvasToDelete = document.getElementById("canvas"),
            wrapperElement = document.getElementById("wrapper");

        if (canvasToDelete) {
            wrapperElement.removeChild(canvasToDelete);
        }
    }

    function createCanvas() {
        var canvas = document.createElement("canvas"),
            wrapperElement = document.getElementById("wrapper");

        canvas.setAttribute("width", 900);
        canvas.setAttribute("height", 900);
        canvas.id = "canvas";
        canvas.innerHTML = "This text is displayed if your browser does not support HTML5 Canvas.";
        wrapperElement.appendChild(canvas);
        context = canvas.getContext("2d");
        context.fillStyle = "rgb(144,202,215)";
        context.strokeStyle = "rgb(51,125,143)";
        context.lineWidth = 5;
    }

    function drawBike() {

        clearCanvas();
        createCanvas();

        //first tyre
        context.beginPath();
        context.arc(191, 340, 90, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();

        //second tyre
        context.beginPath();
        context.arc(540, 340, 90, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();

        //third circle
        context.beginPath();
        context.arc(350, 340, 25, 0, 2 * Math.PI, false);
        context.stroke();

        // two lines near the third circle
        context.moveTo(330, 320);
        context.lineTo(310, 300);
        context.moveTo(370, 360);
        context.lineTo(390, 380);
        context.stroke();

        //front stick
        context.moveTo(540, 340);
        context.lineTo(510, 110);
        context.lineTo(580, 50);
        context.moveTo(510, 110);
        context.lineTo(420, 130);
        context.stroke();

        // start from third to first circle line
        // four lines forming four sided figure (trapezoid?) and rear stick
        context.moveTo(350, 340);
        context.lineTo(191, 340);
        context.lineTo(305, 210);
        context.lineTo(520, 210);
        context.lineTo(350, 340);
        context.lineTo(275, 150);
        context.moveTo(315, 150);
        context.lineTo(235, 150);
        context.stroke();
    }

    function drawHouse() {
        clearCanvas();
        createCanvas();

        //the bottom rectangle - the base
        context.fillRect(250, 250, 450, 330);
        context.strokeRect(253, 253, 450, 330);

        //upper triangle - the roof
        context.beginPath();
        context.moveTo(251, 253);
        context.lineTo(465, 1);
        context.lineTo(704, 253);
        context.fill();
        context.stroke();
        context.closePath();

        //windows
        //first window above the door
        context.beginPath();
        context.lineWidth = 50;
        //first above
        context.moveTo(300, 300);
        context.lineTo(380, 300);
        //second above part
        context.moveTo(385, 300);
        context.lineTo(465, 300);
        //first bottom
        context.moveTo(300, 355);
        context.lineTo(380, 355);
        //second bottom
        context.moveTo(385, 355);
        context.lineTo(465, 355);
        context.stroke();

        //second window above 
        //first above
        context.moveTo(515, 300);
        context.lineTo(595, 300);
        //second above part
        context.moveTo(600, 300);
        context.lineTo(680, 300);
        //first bottom
        context.moveTo(515, 355);
        context.lineTo(595, 355);
        //second bottom
        context.moveTo(600, 355);
        context.lineTo(680, 355);
        context.stroke();

        //third window down
        //first above
        context.moveTo(515, 445);
        context.lineTo(595, 445);
        //second above part
        context.moveTo(600, 445);
        context.lineTo(680, 445);
        //first bottom
        context.moveTo(515, 500);
        context.lineTo(595, 500);
        //second bottom
        context.moveTo(600, 500);
        context.lineTo(680, 500);
        context.stroke();
        context.closePath();


        //chimney rectangle
        context.beginPath();
        context.lineWidth = 4;
        context.fillRect(575, 70, 50, 135);
        context.strokeRect(575, 70, 50, 135);
        context.stroke();
        context.closePath();
        //chimney ellipses
        context.lineWidth = 9;
        //save before scale
        context.save();
        //after scale command all figures will be scaled
        context.scale(0.95, 0.3);
        context.beginPath();
        context.arc(632, 230, 24, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
        context.fillRect(585, 670, 80, 80);
        context.fill();
        context.closePath();
        //important to restore sizes before scale command
        context.restore();

        //door
        //rectangle
        context.beginPath();
        context.lineWidth = 5;
        context.strokeRect(325, 457, 124, 125);
        //the arc of the door
        context.save();
        context.scale(1, 0.6);
        context.beginPath();
        context.arc(387, 770, 62, 0, Math.PI, true);
        context.fill();
        context.stroke();
        context.closePath();
        //important to restore sizes before scale command
        context.restore();
        //line and two small circles at the door
        context.beginPath();
        context.moveTo(387, 423);
        context.lineTo(387, 580);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(367, 540, 7, 0, 2 * Math.PI, true);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(407, 540, 7, 0, 2 * Math.PI, true);
        context.stroke();
    }

    function drawHead() {
        clearCanvas();
        createCanvas();

        // big circle
        context.beginPath();
        context.save();
        context.scale(1, 0.9);
        context.arc(300, 300, 110, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
        context.closePath();
        //important to restore sizes before scale command
        context.restore();

        //mouth
        context.save();
        context.beginPath();
        context.lineWidth = 6;
        context.setTransform(1, 0.2, 0, 0.4, 0, 0);
        context.arc(270, 650, 40, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
        context.closePath();
        //important to restore sizes before scale command
        context.restore();

        //nose
        context.beginPath();
        context.lineWidth = 4;
        context.moveTo(295, 270);
        context.lineTo(270, 270);
        context.lineTo(295, 220);
        context.stroke();
        context.closePath();

        //eyes
        //big ellipsis of the eyes
        context.save();
        context.beginPath();
        context.lineWidth = 5;
        context.scale(1, 0.6);
        context.arc(240, 400, 20, 0, 2 * Math.PI, true);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.save();
        context.arc(330, 400, 20, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
        context.closePath();
        context.restore();

        //small ellipsis of the eyes - pupils
        context.save();
        context.beginPath();
        context.lineWidth = 5;
        context.fillStyle = "rgb(34,84,95)";
        context.scale(0.3, 1);
        context.arc(1070, 400, 16, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.closePath();
        context.beginPath();
        context.save();
        context.arc(770, 400, 16, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.closePath();
        context.restore();

        // hat
        // bottom circle      
        context.fillStyle = "rgb(57,102,147)";
        context.strokeStyle = "rgb(0,0,0)";
        context.beginPath();
        context.lineWidth = 30;
        context.scale(1, 0.1);
        context.arc(1000, 2900, 400, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.closePath();
        context.restore();

        //rectangle
        context.save();
        context.beginPath();
        context.fillStyle = "rgb(57,102,147)";
        context.strokeStyle = "rgb(0,0,0)";
        context.lineWidth = 5;
        context.fillRect(245, 95, 110, 180);
        context.strokeRect(245, 95, 110, 180);
        context.closePath();
        context.restore();

        //ellipses
        context.save();
        context.beginPath();
        context.lineWidth = 15;
        context.fillStyle = "rgb(57,102,147)";
        context.strokeStyle = "rgb(0,0,0)";
        context.scale(1, 0.4);
        context.arc(300, 250, 51, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.closePath();

        context.beginPath();
        context.save();
        context.arc(300, 710, 52, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
        context.closePath();
        context.restore();

        context.beginPath();
        context.save();
        context.arc(300, 691, 52, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        context.restore();
    }

    drawBikeButton.addEventListener("click", drawBike);
    drawHouseButton.addEventListener("click", drawHouse);
    drawHeadButton.addEventListener("click", drawHead);
}());