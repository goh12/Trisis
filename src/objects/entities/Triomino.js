function Triomino() { }

Triomino.prototype.update = function(DeltaTime) {
    this.shouldMove -= DeltaTime * this.fallSpeedMultiplier; // should move verður < 0 á sek fresti
    
    if (this.shouldMove < 0 && this.canMoveDown()) {
        this.moveDown();
        this.shouldMove = 1;
    }
}


Triomino.prototype.render = function(projectionMatrix, MV) {
    for(let i = 0; i < this.kubbar.length; i++) {
        this.kubbar[i].render(projectionMatrix, MV);
        this.kubbar[i].renderGuideline(projectionMatrix, MV);
    }
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
    
    if (this.kubbar[1].getYCell() > 0 && allClear) {
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

Triomino.prototype.shootDown = function () {
    this.fallSpeedMultiplier = 100;
}
