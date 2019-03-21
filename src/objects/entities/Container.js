function Container() {
    this.cells = createArray(6, 20, 6);
    this.staticBlocks = [];
    this.movingTriomino = null;

    for(let y = 0; y < 50; y++) {
        const xCell = Math.floor(Math.random() * 6);
        const yCell = Math.floor(Math.random() * 20);
        const zCell = Math.floor(Math.random() * 6);
        this.staticBlocks.push(new Block(xCell, yCell, zCell));
    }

    this.color = vec4(1.0, 1.0, 1.0, 1.0);
    this.drawable = new G_Container();
}

Container.prototype.update = function() {

    if (this.movingTriomino === null) {
        this.newTriomino();
    }
}

Container.prototype.render = function(projectionMatrix, MV) {
    this.drawable.draw(projectionMatrix, MV, this);

    for(let i = 0; i < this.staticBlocks.length; i++) {
        this.staticBlocks[i].render(projectionMatrix, MV);
    }
}

Container.prototype.newTriomino = function() {

    this.movingTriomino = new Triomino();
    
}

Container.prototype.checkEvents = function() {
    
}

Container.prototype.canMove = function (x, y, z) {
    
}
