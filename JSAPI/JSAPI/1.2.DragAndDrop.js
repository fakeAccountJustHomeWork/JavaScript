(function () {
    "use strict";

    var trashObjectsCount = 10,
        topResultsLimit = 5,
        trashObjectsList = [],
        startTime,
        randomNumber,
        index = 0,
        modalWindow = document.getElementById("modalWindow"),
        gameField = document.getElementById("gameField"),
        bucket = document.getElementsByClassName("bucketClosed")[0],
        restartButton = document.getElementById("restartGame"),
        clearHighSchore = document.getElementById("clearHighScore"),
        mainWrapper = document.getElementById("mainWrapper"),
        saveButton = document.querySelector("#modalWindow > button"),
        fragments = document.createDocumentFragment(),
        trashImages = {
            first: "url(img/paperball/PaperBall_1.png) no-repeat",
            second: "url(img/paperball/PaperBall_2.png) no-repeat",
            third: "url(img/paperball/PaperBall_3.png) no-repeat"
        },
        backgroundImages = {
            first: "url(img/background/BeachSand.png) no-repeat",
            second: "url(img/background/BeachSandLight.png) no-repeat",
            third: "url(img/background/Forest.png) no-repeat",
            fourth: "url(img/background/SeaSand.png) no-repeat",
            fifth: "url(img/background/SeaSandLight.png) no-repeat",
            sixth: "url(img/background/StandartGrass.png) no-repeat",
            seventh: "url(img/background/WindowsXP.png) no-repeat"
        };

    modalWindow.style.width = mainWrapper.offsetWidth + "px";
    modalWindow.style.height = mainWrapper.offsetHeight + "px";
    mainWrapper.appendChild(modalWindow);

    function getCurrentTime() {
        var year = new Date().getYear() + 1900,
            month = new Date().getMonth() + 1,
            day = new Date().getDate(),
            hour = new Date().getHours(),
            minutes = new Date().getMinutes(),
            seconds = new Date().getSeconds(),
            miliseconds = new Date().getMilliseconds(),
            currentTime = new Date(year, month, day, hour, minutes, seconds, miliseconds);

        return currentTime;
    }

    function getRandomNumber(multiple) {
        return Math.random() * multiple;
    }

    function endGame() {
        // calculate playerResult
        var userResult = ((getCurrentTime() - startTime) / 1000).toFixed(2);
        document.getElementById("lastResult").innerHTML = userResult + " ";

        document.getElementById("modalWindow").style.display = "block";
    }

    function removeTrashObjects() {
        var gameField = document.querySelectorAll("#gameField > div");

        for (index = 1; index < gameField.length; index += 1) {
            gameField[index].parentNode.removeChild(gameField[index]);
        }
    }

    function getBackgroundImage() {
        randomNumber = getRandomNumber(100);

        if (randomNumber <= 15) {
            gameField.style.background = backgroundImages.first;
        } else if (randomNumber > 15 && randomNumber <= 30) {
            gameField.style.background = backgroundImages.second;
        } else if (randomNumber > 30 && randomNumber <= 45) {
            gameField.style.background = backgroundImages.third;
        } else if (randomNumber > 45 && randomNumber <= 60) {
            gameField.style.background = backgroundImages.fourth;
        } else if (randomNumber > 60 && randomNumber <= 75) {
            gameField.style.background = backgroundImages.fifth;
        } else if (randomNumber > 75 && randomNumber <= 90) {
            gameField.style.background = backgroundImages.sixth;
        } else {
            gameField.style.background = backgroundImages.seventh;
        }
    }

    function getPlayerName() {
        return document.querySelector("#modalWindow > input").value;
    }

    function getPlayerResult() {
        return document.getElementById("lastResult").innerHTML;
    }

    function getTopResults() {
        var topResults = JSON.parse(window.localStorage.highScore || "[]"),
            highScoreElement = document.getElementById("topResults"),
            limit = (topResults.length < topResultsLimit) ? topResults.length : topResultsLimit;

        topResults.sort(function (first, second) {
            return first.result - second.result;
        });

        highScoreElement.innerHTML = "";

        for (index = 0; index < limit; index += 1) {
            highScoreElement.innerHTML += index + 1 + "." + topResults[index].userName + " - " +
                topResults[index].result + " seconds" + "<br />";
        }
    }

    function saveToStorage() {
        var userResult = {
            userName: getPlayerName(),
            result: getPlayerResult()
        },
            oldScore = JSON.parse(window.localStorage.getItem("highScore")) || [];

        oldScore.push(userResult);

        window.localStorage.setItem("highScore", JSON.stringify(oldScore));

        document.getElementById("modalWindow").style.display = "none";

        getTopResults();
    }

    function clearHighScore() {
        window.localStorage.clear();
        getTopResults();
    }

    function drag(event) {
        event.dataTransfer.setData("dragged", event.target.id);
    }

    function drop(event) {
        event.preventDefault();

        var data = event.dataTransfer.getData("dragged");

        gameField = document.getElementById("gameField");
        gameField.removeChild(document.getElementById(data));
        trashObjectsCount -= 1;

        if (trashObjectsCount === 0) {
            endGame();
        }
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function onDragEnter(event) {
        event.preventDefault();
        event.target.className = "bucketOpened";
    }

    function onMouseOut(event) {
        event.preventDefault();
        if (event.target.className !== "bucketClosed") {
            event.target.className = "bucketClosed";
        }
    }

    function generateTrash() {
        removeTrashObjects();

        trashObjectsCount = 10;
        startTime = getCurrentTime();

        var trashDiv;

        for (index = 0; index < trashObjectsCount; index += 1) {
            trashDiv = document.createElement("div");

            // sets some trash styles
            trashDiv.style.width = "50px";
            trashDiv.style.height = "50px";
            trashDiv.style.position = "absolute";
            trashDiv.style.top = (getRandomNumber(300) + 200) + "px";
            trashDiv.style.left = (getRandomNumber(300) + 50) + "px";
            trashDiv.id = "trashDiv" + index;
            trashDiv.draggable = true;
            trashDiv.addEventListener("dragstart", drag);

            // gets random trash image
            randomNumber = getRandomNumber(100);

            if (randomNumber <= 33) {
                trashDiv.style.background = trashImages.first;
            } else if (randomNumber > 33 && randomNumber < 66) {
                trashDiv.style.background = trashImages.second;
            } else {
                trashDiv.style.background = trashImages.third;
            }

            trashObjectsList.push(trashDiv);
            fragments.appendChild(trashDiv);
        }

        gameField.appendChild(fragments);
        getBackgroundImage();
    }

    clearHighSchore.addEventListener("click", clearHighScore);
    restartButton.addEventListener("click", generateTrash);
    bucket.addEventListener("dragover", allowDrop);
    bucket.addEventListener("drop", drop);
    bucket.addEventListener("dragenter", onDragEnter);
    bucket.addEventListener("mouseout", onMouseOut);
    saveButton.addEventListener("click", saveToStorage);

    getTopResults();
}());