(function () {
    var next = document.getElementById("next"),
        previous = document.getElementById("previous"),
        currentImageNumber = 1,
        allImages = document.querySelectorAll("#content img");

    function slideImages() {
        function hideImages() {
            allImages = document.querySelectorAll("#content img");
            for (var index = 0; index < allImages.length; index++) {
                allImages[index].style.display = "none";
                allImages[index].style.position = "absolute";
                allImages[index].style.top = "50px";
                allImages[index].style.left = "50px";
                allImages[index].style.width = "600px";

            }
        }

        hideImages();

        allImages[0].style.display = "block";

        next.addEventListener("click", nextClick);

        previous.addEventListener("click", previousClick);

        function nextClick() {
            hideImages();
            allImages[currentImageNumber].style.display = "block";
            currentImageNumber += 1;
            if (currentImageNumber >= allImages.length) {
                currentImageNumber = 0;
            }
        }

        function previousClick() {
            hideImages();
            allImages[currentImageNumber].style.display = "block";
            currentImageNumber -= 1;
            if (currentImageNumber < 0) {
                currentImageNumber = allImages.length - 1;
            }
        }
    }

    window.onload = slideImages;
}());