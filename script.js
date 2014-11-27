/* global outline, Three, Four, Five, Six, Eight */

'use strict';

var DIMENSION = 20;

var areas = [];
areas.push(new Three((0 * DIMENSION) + 1, (0 * DIMENSION) + 1));
areas.push(new Four((3 * DIMENSION) + 1, (0 * DIMENSION) + 1));
areas.push(new Five((7 * DIMENSION) + 1, (0 * DIMENSION) + 1));
areas.push(new Six((12 * DIMENSION) + 1, (0 * DIMENSION) + 1));
areas.push(new Eight((18 * DIMENSION) + 1, (0 * DIMENSION) + 1));

var draw = function(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);

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

    for (var i = 0; i < areas.length; i++) {
        areas[i].draw(context);
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

    var active = false;
    canvas.addEventListener('mousedown', function(event) {
        console.log(event);

        for (var i = 0; i < areas.length; i++) {
            if (areas[i].clicked(event.clientX, event.clientY)) {
                active = areas[i];
                active.offset(event.clientX, event.clientY);
                break;
            }
        }
    });
    canvas.addEventListener('mouseup', function(event) {
        console.log(event);

        active.snap();
        draw(canvas, context);
        active = false;
    });
    canvas.addEventListener('mousemove', function(event) {
        if (active) {
            console.log(event);

            active.move(event.clientX, event.clientY);
            draw(canvas, context);
        }
    });
};

window.addEventListener('load', load);
