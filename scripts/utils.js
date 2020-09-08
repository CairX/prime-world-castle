/* exported round */

'use strict';

var round = function(number, round) {
    var diff = number % round;
    if (diff < (round / 2)) {
        return number - diff;
    } else {
        return number + (round - diff);
    }
};
