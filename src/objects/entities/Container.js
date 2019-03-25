function Container() {
    this.cells = createArray(6, 20, 6);
    
    this.staticBlocks = [];
    this.movingTriomino = null;


    this.drawable = new G_Container();
    this.newTriomino();
}

Container.prototype.getLookAt = function() {
    const mt = this.movingTriomino;
    return vec3(0, mt.kubbar[1].getYCell() - 10, 0);
}

Container.prototype.getViewPoint = function() {
    const mt = this.movingTriomino;
    return vec3(0, mt.kubbar[1].getYCell() - 10, zView);
}


Container.prototype.update = function(DeltaTime) {

    if (this.movingTriomino === null) {
        this.newTriomino();
    } else {
        this.movingTriomino.update(DeltaTime);
    }

    this.checkFullPlane();
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
    
    if (Math.random() < 0.5) {
        this.movingTriomino = new StraightTriomino();
    } else {
        this.movingTriomino = new BentTriomino();
    }
}

Container.prototype.checkEvents = function() {
    
}

Container.prototype.canMove = function (x, y, z) {
    
}

let shiftDownFlag = false;

Container.prototype.checkFullPlane = function () {

    for (let y = 0; y < 20; y++) {
        
        let currHeight = 0;

        for (let x = 0; x < 6; x++) {
            
            for (let z = 0; z < 6; z++) {
                currHeight += this.cells[x][y][z];
            }
        }

        if (currHeight === 36) {
            this.updateScore(); // hækkum stig spilara
            shiftDownFlag = true;

            for (let x = 0; x < 6; x++) {
                for (let z = 0; z < 6; z++) {
                    this.cells[x][y][z] = 0; 
                }
            }

            for (let i = this.staticBlocks.length - 1; i >= 0; i--) {
                // fjarlægja fulla röð
                if (this.staticBlocks[i].yCell === y) {
                    this.staticBlocks.splice(i, 1);
                } else if (this.staticBlocks[i].yCell > y) {
                    // færa kubba fyrir ofan niður
                    this.staticBlocks[i].yCell -= 1;
                }                
            }
        }
        
        // færum kubba fyrir ofan niður í cell fylki
        if (shiftDownFlag && y + 1 < 19) {
            for (let x = 0; x < 6; x++) {
                for (let z = 0; z < 6; z++) {
                    this.cells[x][y][z] = this.cells[x][y+1][z];
                }
            }
        }
    }
    shiftDownFlag = false;
    
}


Container.prototype.updateScore = function () {
    var score = document.getElementById('score');
    let number = score.innerHTML;
    number++;
    score.innerHTML = number;
}
