/* global outline */

'use strict';

var draw = function(canvas, context) {
    var DIMENSION = 20;

    context.beginPath();
    context.strokeStyle = 'rgba(210, 210, 210, 1)';
    context.lineWidth = 1;

    for (var x = 0; x < canvas.width; x += DIMENSION) {
        context.moveTo(x+0.5, 0);
        context.lineTo(x+0.5, canvas.height);
    }
    for (var y = 0; y < canvas.height; y += DIMENSION) {
        context.moveTo(0, y+0.5);
        context.lineTo(canvas.width, y+0.5);
    }

    context.stroke();

    for (var i = 0; i < outline.length; i++) {
        var block = outline[i];
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillRect((block.x * DIMENSION) + 1, (block.y * DIMENSION) + 1, DIMENSION-1, DIMENSION-1);
    }
};

var load = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var resize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        draw(canvas, context);
    };

    resize();
    window.onresize = resize;
};

window.addEventListener('load', load);
