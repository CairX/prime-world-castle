/* exported withinLine, round */

'use strict';

var withinLine = function(point, start, end) {
    return point > start && point < end;
};
var round = function(number, round) {
    var diff = number % round;
    if (diff < (round / 2)) {
        return number - diff;
    } else {
        return number + (round - diff);
    }
};
