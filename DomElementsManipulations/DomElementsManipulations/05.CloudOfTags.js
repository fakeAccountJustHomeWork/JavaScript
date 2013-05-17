(function () {
    "use strict";

    function getTagFrequencyCount(tagArray) {
        var dictionary = {},
            index,
            currentTag;

        for (index = 0; index < tagArray.length; index++) {
            currentTag = tagArray[index].toLowerCase();

            if (dictionary[currentTag]) {
                dictionary[currentTag]++;
            } else {
                dictionary[currentTag] = 1;
            }
        }

        return dictionary;
    }

    function getMostFrequentTagCount(dictionary) {
        var mostFrequentTagCount = 0,
            item;

        for (item in dictionary) {
            if (dictionary[item] > mostFrequentTagCount) {
                mostFrequentTagCount = dictionary[item];
            }
        }

        return mostFrequentTagCount;
    }

    function generateTagCloud(tagsArray, minFontSize, maxFontSize) {
        var dictionary = getTagFrequencyCount(tagsArray),
            mostFrequentTagCount = getMostFrequentTagCount(dictionary),
            fragments = document.createDocumentFragment(),
            item,
            fontSize,
            currentTagElement,
            tagElement;

        for (item in dictionary) {
            fontSize = (dictionary[item] / mostFrequentTagCount) * (maxFontSize - minFontSize) + minFontSize;
            currentTagElement = document.createElement("strong");
            currentTagElement.innerHTML = item;
            currentTagElement.style.fontSize = fontSize + 'px';

            if (Math.random() < 0.5) {
                tagElement = document.createElement("sub");
                tagElement.appendChild(currentTagElement);
            } else {
                tagElement = document.createElement("sup");
                tagElement.appendChild(currentTagElement);
            }

            fragments.appendChild(tagElement);
        }

        return fragments;
    }

    window.generateTagCloud = generateTagCloud;
}());