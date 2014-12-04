/* exported add, sub, div, mult, less, greater, withinLine, round */

'use strict';

var add = function(a, b) {
    return a + b;
};
var sub = function(a, b) {
    return a - b;
};
var div = function(a, b) {
    return a / b;
};
var mult = function(a, b) {
    return a * b;
};

var less = function(a, b) {
    return a < b;
};
var greater = function(a, b) {
    return a > b;
};
var withinLine = function(point, start, end) {
    return greater(point, start) && less(point, end);
};
var round = function(number, round) {
    var diff = number % round;
    if (less(diff, div(round, 2))) {
        return sub(number, diff);
    } else {
        return add(number, sub(round, diff));
    }
};
