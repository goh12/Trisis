function Container() {
    this.cells = createArray(6, 20, 6);
    this.staticBlocks = [];
    this.movingTriomino = null;


    for (let i = 0; i < 2; i ++) {
        const cellX = Math.floor(Math.random() * 6);
        const cellY = Math.floor(Math.random() * 20);
        const cellZ = Math.floor(Math.random() * 6);

        this.staticBlocks.push(new Block(cellX, cellY, cellZ));
    }

    this.color = vec4(1.0, 1.0, 1.0, 1.0);
    this.drawable = new G_Container();
}

Container.prototype.update = function() {

    if (this.movingTriomino === null) {
        this.newTriomino();
    }
    
}

Container.prototype.render = function(MV) {
    this.drawable.prepare();
    this.drawable.draw(MV, this);

    for(let i = 0; i < this.staticBlocks.length; i++) {
        this.staticBlocks[i].render(MV);
    }
}

Container.prototype.newTriomino = function() {

    this.movingTriomino = new Triomino();
    
}

Container.prototype.checkEvents = function() {
    
}

Container.prototype.canMove = function (x, y, z) {
    
}
