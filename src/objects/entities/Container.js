function Container() {
    this.cells = createArray(6, 20, 6);
    this.staticBlocks = [];
    this.movingTriomino = null;

    for(let y = 0; y < 20; y++) {
        for(let z = 0; z < 6; z++) {
            for(let x = 0; x < 6; x++) {
                this.staticBlocks.push(new Block(x, y, z));
            }
        }
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
