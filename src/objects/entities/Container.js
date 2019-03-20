function Container() {
    this.cells = createArray(6, 20, 6);
    this.staticTriominos = [];
    this.movingTriomino = null;
}

Container.prototype.update = function() {

    if (this.movingTriomino === null) {
        this.newTriomino();
    }
    
}

Container.prototype.render = function() {
    
}

Container.prototype.newTriomino = function() {

    this.movingTriomino = new Triomino();
    
}

Container.prototype.checkEvents = function() {
    
}

Container.prototype.canMove = function (x, y, z) {
    
}
