/* global outline */

'use strict';

var DIMENSION = 20;

var Area = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};
Area.prototype.clicked = function (x, y) {
    return x > this.x && x < (this.x + this.width) &&
           y > this.y && y < (this.y + this.height);
};
Area.prototype.draw = function (context) {
    context.fillStyle = 'rgba(0, 255, 0, 0.5)';
    context.fillRect(this.x, this.y, this.width, this.height);
};
Area.prototype.move = function (x, y) {
    this.x = x -this.offsetX;
    this.y = y - this.offsetY;
};
Area.prototype.offset = function (x, y) {
    this.offsetX = x - this.x;
    this.offsetY = y - this.y;
};
Area.prototype.snap = function () {
    var xdiff = this.x % DIMENSION;
    xdiff = xdiff < DIMENSION / 2 ? xdiff * -1 : (DIMENSION - xdiff);
    this.x += xdiff + 1;

    var ydiff = this.y % DIMENSION;
    ydiff = ydiff < DIMENSION / 2 ? ydiff * -1 : (DIMENSION - ydiff);
    this.y += ydiff + 1;
};

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
};

var load = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var area = new Area((5 * DIMENSION) + 1, (5 * DIMENSION) + 1, 6*DIMENSION-1, 6*DIMENSION-1);

    var resize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        draw(canvas, context);
        area.draw(context);
    };

    resize();
    window.onresize = resize;

    var active = false;
    canvas.addEventListener('mousedown', function(event) {
        console.log(event);
        active = area.clicked(event.clientX, event.clientY);
        if (active) {
            area.offset(event.clientX, event.clientY);
        }
    });
    canvas.addEventListener('mouseup', function(event) {
        console.log(event);
        active = false;
        area.snap();
        draw(canvas, context);
        area.draw(context);
    });
    canvas.addEventListener('mousemove', function(event) {
        if (active) {
            console.log(event);
            area.move(event.clientX, event.clientY);
            draw(canvas, context);
            area.draw(context);
        }
    });
};

window.addEventListener('load', load);
