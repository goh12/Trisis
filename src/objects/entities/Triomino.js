function Triomino() {
    this.kubbar = createArray(3);
    this.color = vec4(Math.random(), Math.random(), Math.random(), 1);
    this.shouldMove = 1;
    this.xFlag = true;

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
    this.shouldMove -= DeltaTime; // should move verður < 0 á sek fresti
    
    if (this.shouldMove < 0 && this.canMoveDown()) {
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
    if (this.xFlag) {
        this.kubbar[0].setCell(1, 0, 1);
        this.kubbar[2].setCell(-1, 0, -1);
        this.xFlag = false;        
    } else {
        this.kubbar[0].setCell(-1, 0, -1);
        this.kubbar[2].setCell(1, 0, 1);
        this.xFlag = true;        
    }
}


Triomino.prototype.rotateY = function() {
    
}


Triomino.prototype.rotateZ = function() {
    
}

Triomino.prototype.moveX = function(val) {

    let allClear = this.canMove(val, 0, 0);

    if (allClear) {
        for (let i = 0; i < this.kubbar.length; i++) {
            this.kubbar[i].move(val, 0, 0);
        }
    }
}


Triomino.prototype.moveZ = function(val) {

    let allClear = this.canMove(0, 0, val);
    
    if (allClear) {
        for (let i = 0; i < this.kubbar.length; i++) {
            this.kubbar[i].move(0, 0, val);
        }  
    }
}

Triomino.prototype.canMove = function(x, y, z) {
    
    let allClear = this.kubbar[0].canMove(x, y, z) && this.kubbar[1].canMove(x, y, z) 
                    && this.kubbar[2].canMove(x, y, z);
    
    // TODO: laga rotation skorðu
    if (allClear) {
        return allClear;
    }

    return false;
}

/**
 * í þessu falli búum við til nýjan triomino því kubburinn
 * kemst ekki neðar
 */
Triomino.prototype.canMoveDown = function() {
    
    // true ef allir kubbar komist niður um hæð
    let allClear = this.kubbar[0].canMove(0, -1, 0) && this.kubbar[1].canMove(0, -1, 0) 
                    && this.kubbar[2].canMove(0, -1, 0);
    
    // TODO: laga rotation skorðu
    if (this.kubbar[1].getYCell() > 17 && allClear) {
        return allClear;
    }

    CONTAINER.newTriomino(this.kubbar);
    return false;
}


Triomino.prototype.moveDown = function() {
    for (let i = 0; i < this.kubbar.length; i++) {
        this.kubbar[i].move(0, 1, 0);
    }
}
