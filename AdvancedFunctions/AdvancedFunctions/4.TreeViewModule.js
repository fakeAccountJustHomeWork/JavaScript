var control = (function () {
    "use strict";

    // constructor accepts dom element and boolean state regarding the type of the element
    function TreeView(element) {
        this.commonContainer = element;
        var isUl = this.commonContainer instanceof window.HTMLUListElement;
        this.ulContainer = isUl ? this.commonContainer : null;
    }

    TreeView.treeView = function (selector) {
        var element = document.querySelector(selector);
        if (!element) {
            throw new ReferenceError("Can not select an element by the given selector!");
        }
        return new TreeView(element);
    };

    TreeView.prototype.addNode = function () {
        var li = document.createElement("li");

        if (!this.ulContainer) {
            this.ulContainer = document.createElement("ul");
            this.commonContainer.appendChild(this.ulContainer);
        }

        this.ulContainer.appendChild(li);

        return new TreeView(li);
    };

    TreeView.prototype.addContent = function (content) {
        this.commonContainer.innerHTML += content;
    };

    return {
        treeView: TreeView.treeView
    };
}());