window.onload = function () {
    slideOne();
    slideTwo();
};

var sliderOne = document.getElementById("slider-1");
var sliderTwo = document.getElementById("slider-2");
var displayValOne = document.getElementById("range1");
var displayValTwo = document.getElementById("range2");
var minGap = 0;
var sliderTrack = document.querySelector(".slider-track");
var sliderMaxValue = document.getElementById("slider-1").max;

function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor() {
    percent1 = sliderOne.value / sliderMaxValue * 100;
    percent2 = sliderTwo.value / sliderMaxValue * 100;
    sliderTrack.style.background = "linear-gradient(to right, #dadae5 " + percent1 + "% , #3264fe " + percent1 + "% , #3264fe " + percent2 + "%, #dadae5 " + percent2 + "%)";
}