'use strict';

var DIMENSION = 20;

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
var less = function(a, b) {
    return a < b;
};
var greater = function(a, b) {
    return a > b;
};
var withinLine = function(point, start, end) {
    return greater(point, start) && less(point, end);
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
    var xdiff = this.x % DIMENSION;
    xdiff = less(xdiff, DIMENSION / 2) ? xdiff * -1 : sub(DIMENSION, xdiff);
    this.x += xdiff + 1;

    var ydiff = this.y % DIMENSION;
    ydiff = ydiff < DIMENSION / 2 ? ydiff * -1 : (DIMENSION - ydiff);
    this.y += ydiff + 1;
};

/**
 * Three
 */
var Three = function(x, y) {
    Area.call(this, x, y, 3*DIMENSION-1, 3*DIMENSION-1, PURPLE);
};
Three.prototype = Object.create(Area.prototype);
Three.prototype.constructor = Three;

/**
 * Four
 */
var Four = function(x, y) {
    Area.call(this, x, y, 4*DIMENSION-1, 4*DIMENSION-1, YELLOW);
};
Four.prototype = Object.create(Area.prototype);
Four.prototype.constructor = Four;

/**
 * Five
 */
var Five = function(x, y) {
    Area.call(this, x, y, 5*DIMENSION-1, 5*DIMENSION-1, RED);
};
Five.prototype = Object.create(Area.prototype);
Five.prototype.constructor = Five;

/**
 * Six
 */
var Six = function(x, y) {
    Area.call(this, x, y, 6*DIMENSION-1, 6*DIMENSION-1, GREEN);
};
Six.prototype = Object.create(Area.prototype);
Six.prototype.constructor = Six;

/**
 * Eight
 */
var Eight = function(x, y) {
    Area.call(this, x, y, 8*DIMENSION-1, 8*DIMENSION-1, BLUE);
};
Eight.prototype = Object.create(Area.prototype);
Eight.prototype.constructor = Eight;

/**
 * Trash
 */
var Trash = function(x, y) {
    Area.call(this, x, y, 5*DIMENSION-1, 5*DIMENSION-1, 'rgb(238, 238, 238)');
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
