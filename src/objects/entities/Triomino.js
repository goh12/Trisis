function Triomino() {
    this.kubbar = createArray(3);
    this.color = vec4(Math.random(), Math.random(), Math.random(), 1);
    this.shouldMove = 1;

    // miðju kubbur á random stað
    let xCell = Math.floor(Math.random() * 4) + 1;
    let yCell = 19; // TODO: á kubbur að birtast í hæð 19 ? 
    let zCell = Math.floor(Math.random() * 4) + 1;
    this.kubbar[1] = (new Block(xCell, yCell, zCell, this.color));

    for (let i = 0; i < this.kubbar.length; i++) {
        
        if (i === 1) {
            continue;
        }

        // TODO: kubbur snýr alltaf eins á x/z-ás. Breyta því?
        xCell = i === 0 ? this.kubbar[1].getXCell() - 1 : this.kubbar[1].getXCell() + 1;
        this.kubbar[i] = (new Block(xCell, yCell, zCell, this.color));        
    }

}


Triomino.prototype.update = function(DeltaTime) {
    this.shouldMove -= DeltaTime;
    
    if (this.shouldMove < 0 && this.canMove()) {
        this.moveDown();
        this.shouldMove = 1;
    }
    
}


Triomino.prototype.render = function(projectionMatrix, MV) {
        

    for(let i = 0; i < this.kubbar.length; i++) {
        this.kubbar[i].render(projectionMatrix, MV);
    }
}


Triomino.prototype.rotateX = function() {
    
}


Triomino.prototype.rotateY = function() {
    
}


Triomino.prototype.rotateZ = function() {
    
}

Triomino.prototype.moveX = function() {
    
}


Triomino.prototype.moveZ = function() {
    
}

Triomino.prototype.canMove = function() {
    
    // true ef allir kubbar komist niður um hæð
    let allClear = this.kubbar[0].canMove() && this.kubbar[1].canMove() && this.kubbar[2].canMove();
    
    // TODO: laga rotation skorðu
    if (this.kubbar[1].getYCell() > 17 && allClear) {
        return allClear;
    }

    CONTAINER.newTriomino(this.kubbar);
    return false;
}


Triomino.prototype.moveDown = function() {
    for (let i = 0; i < this.kubbar.length; i++) {
        this.kubbar[i].lowerYCell();
    }
}
