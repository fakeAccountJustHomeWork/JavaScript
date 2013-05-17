(function () {
    "use strict";
    function changeItemVisibility(event) {
        // prevents to click on the nested lists
        event.stopPropagation();

        //gets the first ul list
        var unsortedList = event.target.getElementsByTagName("ul")[0];

        if (unsortedList) {
            if (unsortedList.style.display === "block") {
                unsortedList.style.display = "none";
            } else {
                unsortedList.style.display = "block";
            }
        }
    }

    var liItems = document.getElementsByTagName("li");
    Array.prototype.map.call(liItems, function (liElement) {
        liElement.addEventListener("click", changeItemVisibility, false);
    });
}());