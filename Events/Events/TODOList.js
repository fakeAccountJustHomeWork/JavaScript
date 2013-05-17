var bodyElement = document.querySelector("body"),
    addItemButton = document.getElementById("addItem"),
    removeItemButton = document.getElementById("removeItem"),
    showItemButton = document.getElementById("showItem"),
    hideItemButton = document.getElementById("hideItem");

function onSelect(event) {
    // remove all items with class "selected"
    var currentClicked = event.target;
    if (currentClicked.className === "selected") {
        currentClicked.className = "deselected";
    } else {
        // add class to the li item which is selected
        event.target.className = "selected";
    }
}

function onAddItemButtonClick(event) {
    var ul = document.querySelector("body ul"),
        li = document.createElement("li"),
        inputTextField = document.getElementById("inputText").value;

    if (inputTextField === null || inputTextField === "") {
        alert("Text field should contain some text.");
        return;
    }

    if (!ul) {
        ul = document.createElement("ul");
        ul.id = "todoList";
        bodyElement.appendChild(ul);
    }

    li.innerHTML = inputTextField;
    li.addEventListener("click", onSelect);
    li.style.listStyle = "none";
    li.className = "deselected";
    ul.appendChild(li);
    document.getElementById("inputText").value = "";
}

function onKeyEnterPressed(event) {
    if (event.keyCode === 13) {
        onAddItemButtonClick(event);
        return false;
    }
   
}

function onRemoveItemButtonClick(event) {

    var selected = document.querySelectorAll(".selected"),
        ul = document.querySelector("body ul");
    for (var index = 0; index < selected.length; index++) {
        ul.removeChild(selected[index]);
    }
}

function onShowItemButtonClick(event) {
    var selected = document.querySelectorAll(".hidden");
    for (var index = 0; index < selected.length; index++) {
        selected[index].style.display = "block";
        selected[index].className = "deselected";
    }
}

function onHideItemButtonClick(event) {
    var selected = document.querySelectorAll(".selected");
    for (var index = 0; index < selected.length; index++) {
        selected[index].className = "hidden";
        selected[index].style.display = "none";
    }
}



addItemButton.addEventListener("click", onAddItemButtonClick);
removeItemButton.addEventListener("click", onRemoveItemButtonClick);
showItemButton.addEventListener("click", onShowItemButtonClick);
hideItemButton.addEventListener("click", onHideItemButtonClick);

