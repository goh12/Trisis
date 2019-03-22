function Container() {
    this.cells = createArray(6, 20, 6);
    
    this.staticBlocks = [];
    this.movingTriomino = null;

        
   /* for(let y = 0; y < 1; y++) {
        const xCell = Math.floor(Math.random() * 6);
        const yCell = Math.floor(Math.random() * 20);
        const zCell = Math.floor(Math.random() * 6);
        this.staticBlocks.push(new Block(xCell, yCell, zCell));
    }*/

    this.drawable = new G_Container();
}

Container.prototype.update = function(DeltaTime) {

    if (this.movingTriomino === null) {
        this.newTriomino();
    } else {
        this.movingTriomino.update(DeltaTime);
    }
}

Container.prototype.render = function(projectionMatrix, MV) {
    this.drawable.draw(projectionMatrix, MV, this);

    for(let i = 0; i < this.staticBlocks.length; i++) {
        this.staticBlocks[i].render(projectionMatrix, MV);
    }

    if (this.movingTriomino !== null) {
        this.movingTriomino.render(projectionMatrix, MV);
    }
}

Container.prototype.newTriomino = function(currTriominoBlocks) {
    // add current triomino to static array, if exists
    if (currTriominoBlocks) {
        for(let i = 0; i < currTriominoBlocks.length; i++) {
            const currBlock = currTriominoBlocks[i];
            const xCell = currBlock.getXCell();
            const yCell = currBlock.getYCell();
            const zCell = currBlock.getZCell();
            // graphic
            this.staticBlocks.push(new Block(xCell, yCell, zCell, currBlock.color));
            // logic
            this.cells[xCell][yCell][zCell] = 1;            
        }
    }
    
    this.movingTriomino = new Triomino();
    
}

Container.prototype.checkEvents = function() {
    
}

Container.prototype.canMove = function (x, y, z) {
    
}
