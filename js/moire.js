"use strict";

var lastDistance = 0,
  direction = 1;

function calculateDistance(coordA, coordB) {
  return Math.sqrt(Math.pow((coordA[0] - coordB[0]), 2), Math.pow((coordA[1] - coordB[1]), 2));
}

$('body').mousemove(function(e) {
  var rightElement = $('.right'),
    mouseCoords = [
      e.pageX, e.pageY
    ],
    offset = rightElement.offset(),
    width = rightElement.width(),
    height = rightElement.height(),
    centerX = offset.left + width / 2,
    centerY = offset.top + height / 2,
    distance = calculateDistance([
      centerX, centerY
    ], mouseCoords),
    maxDistance = 50000,
    leftMultiplier = Math.floor(Math.random() * 110000) + 100000,
    rightMultiplier = Math.floor(Math.random() * 110000) + 100000;

  if (lastDistance >= maxDistance || lastDistance < 0) {
    direction *= -1;
  }

  lastDistance += (distance * direction * .3);

  rightElement.css({
    transform: 'rotate(' + (
    lastDistance / rightMultiplier) + 'rad)'
  });
  $('.left').css({
    transform: 'rotate(' + (
    lastDistance / leftMultiplier) + 'rad)'
  });

});
