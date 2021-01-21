const eqt = function(x1, y1, x2, y2) {
    return function(x) {
        return ((y2 - y1) / (x2 - x1)) * (x - x1) + y1;
    }
}

getY = eqt(1, 1, 2, 3);
console.log(getY(3));