/* exported Grid */
/* global round */

'use strict';

var Grid = (function() {
    var line = 1;
    var space = 19;

    var width = 961;
    var height = 801;

    var draw = function(context) {
        context.strokeStyle = 'rgba(255, 255, 255, 1)';
        context.lineWidth = line;
        context.beginPath();

        for (var x = 0; x < width; x += space + line) {
            context.moveTo(x + 0.5, 0);
            context.lineTo(x + 0.5, height);
        }
        for (var y = 0; y < height; y += space + line) {
            context.moveTo(0, y + 0.5);
            context.lineTo(width, y + 0.5);
        }

        context.stroke();
    };

    var position = function(number) {
        return (number * space) + (number * line);
    };

    var end = function(number) {
        return position(number) - line;
    };

    var start = function(number) {
        return position(number) + line;
    };

    var snap = function(number) {
        return round(number, space + line) + line;
    };

    return {
        'draw': draw,
        'end': end,
        'start': start,
        'snap': snap
    };
})();
