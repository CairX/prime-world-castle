/* global Grid */

'use strict';

var PURPLE = 'rgba(156, 39, 176, 0.5)';
var YELLOW = 'rgba(253, 216, 53, 0.5)';
var RED = 'rgba(244, 67, 54, 0.5)';
var GREEN = 'rgba(0, 150, 136, 0.5)';
var BLUE = 'rgba(3, 169, 244, 0.5)';

var add = function(a, b) {
    return a + b;
};
var sub = function(a, b) {
    return a - b;
};
var div = function(a, b) {
    return a / b;
};
var multi = function(a, b) {
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

/**
 * Base
 */
var Area = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
};
Area.prototype.within = function(x, y) {
    return withinLine(x, this.x, add(this.x, this.width)) &&
           withinLine(y, this.y, add(this.y, this.height));
};
Area.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
};
Area.prototype.move = function(x, y) {
    this.x = sub(x, this.offsetX);
    this.y = sub(y, this.offsetY);
};
Area.prototype.offset = function(x, y) {
    this.offsetX = sub(x, this.x);
    this.offsetY = sub(y, this.y);
};
Area.prototype.snap = function() {
    this.x = Grid.snap(this.x);
    this.y = Grid.snap(this.y);
};

/**
 * Three
 */
var Three = function(x, y) {
    Area.call(this, x, y, Grid.end(3), Grid.end(3), PURPLE);
};
Three.prototype = Object.create(Area.prototype);
Three.prototype.constructor = Three;

/**
 * Four
 */
var Four = function(x, y) {
    Area.call(this, x, y, Grid.end(4), Grid.end(4), YELLOW);
};
Four.prototype = Object.create(Area.prototype);
Four.prototype.constructor = Four;

/**
 * Five
 */
var Five = function(x, y) {
    Area.call(this, x, y, Grid.end(5), Grid.end(5), RED);
};
Five.prototype = Object.create(Area.prototype);
Five.prototype.constructor = Five;

/**
 * Six
 */
var Six = function(x, y) {
    Area.call(this, x, y, Grid.end(6), Grid.end(6), GREEN);
};
Six.prototype = Object.create(Area.prototype);
Six.prototype.constructor = Six;

/**
 * Eight
 */
var Eight = function(x, y) {
    Area.call(this, x, y, Grid.end(8), Grid.end(8), BLUE);
};
Eight.prototype = Object.create(Area.prototype);
Eight.prototype.constructor = Eight;

/**
 * Trash
 */
var Trash = function(x, y) {
    Area.call(this, x, y, Grid.end(5), Grid.end(5), 'rgb(238, 238, 238)');
};
Trash.prototype = Object.create(Area.prototype);
Trash.prototype.constructor = Trash;
Trash.prototype.draw = function(context) {
    Area.prototype.draw.call(this, context);
    context.fillStyle = 'rgba(244, 67, 54, 0.25)';

    context.font = '28px FontAwesome';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('\uf014', (this.x + this.width / 2), (this.y + this.height / 2));
};
