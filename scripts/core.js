/* global Outline, Grid, Three, Four, Five, Six, Eight, Trash */

'use strict';

var areas = [];
areas.push(new Three(Grid.start(0), Grid.start(0)));
areas.push(new Four(Grid.start(3), Grid.start(0)));
areas.push(new Five(Grid.start(7), Grid.start(0)));
areas.push(new Six(Grid.start(12), Grid.start(0)));
areas.push(new Eight(Grid.start(18), Grid.start(0)));

var trash = new Trash(Grid.start(43), Grid.start(0));

var draw = function(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    Grid.draw(context);
    Outline.draw(context);
    trash.draw(context);

    for (var i = 0; i < areas.length; i++) {
        areas[i].draw(context);
    }
};

var load = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 961;
    canvas.height = 801;

    var resize = function () {
        draw(canvas, context);
    };

    resize();
    window.onresize = resize;

    var active = false;
    canvas.addEventListener('mousedown', function(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        for (var i = 0; i < areas.length; i++) {
            if (areas[i].within(x, y)) {
                active = areas[i];
                active.offset(x, y);
                break;
            }
        }
    });
    canvas.addEventListener('mouseup', function(event) {
        if (active) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            if (trash.within(x, y)) {
                areas.splice(areas.indexOf(active), 1);
            } else {
                active.snap();
            }

            draw(canvas, context);
            active = false;
        }
    });
    canvas.addEventListener('mousemove', function(event) {
        if (active) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            active.move(x, y);
            draw(canvas, context);
        }
    });

    var menu = document.getElementById('menu');
    menu.addEventListener('click', function (event) {
        switch (event.target.getAttribute('data-type')) {
            case '3':
                areas.push(new Three(1, 1));
                break;
            case '4':
                areas.push(new Four(1, 1));
                break;
            case '5':
                areas.push(new Five(1, 1));
                break;
            case '6':
                areas.push(new Six(1, 1));
                break;
            case '8':
                areas.push(new Eight(1, 1));
                break;
        }

        draw(canvas, context);
    });
};

window.addEventListener('load', load);
