function StraightTriomino() {
    this.kubbar = createArray(3);
    this.color = vec4(Math.random(), Math.random(), Math.random(), 1);
    this.shouldMove = 1;
    this.setStartPosition();
}

StraightTriomino.prototype = new Triomino();

/**
 * All possible states of rotation for StraightTriomino.
 */
StraightTriomino.prototype.rotationStates = {
    X: 0, Y: 1, Z: 2
}

/**
 * Find random start positon.
 */
StraightTriomino.prototype.setStartPosition = function() {
    this.currentRotationState = this.rotationStates.X;
    // miðju kubbur á random stað
    let xCell = Math.floor(Math.random() * 4) + 1;
    let yCell = 19; 
    let zCell = Math.floor(Math.random() * 4) + 1;
    this.kubbar[1] = (new Block(xCell, yCell, zCell, this.color));

    for (let i = 0; i < this.kubbar.length; i++) {
        
        if (i === 1) {
            continue;
        }

        xCell = i === 0 ? this.kubbar[1].getXCell() - 1 : this.kubbar[1].getXCell() + 1;
        this.kubbar[i] = (new Block(xCell, yCell, zCell, this.color));        
    }
}


StraightTriomino.prototype.canMoveFirst = function(dx, dy, dz) {
    if (this.kubbar[0].canMove(dx, dy, dz)) return true;
    return false;
}

StraightTriomino.prototype.canMoveSecond = function(dx, dy, dz) {
    if (this.kubbar[1].canMove(dx, dy, dz)) return true;
    return false;
}

StraightTriomino.prototype.canMoveThird = function(dx, dy, dz) {
    if (this.kubbar[2].canMove(dx, dy, dz)) return true;
    return false;
}

StraightTriomino.prototype.moveFirst = function(dx, dy, dz) {
    this.kubbar[0].move(dx, dy, dz);
}

StraightTriomino.prototype.moveSecond = function(dx, dy, dz) {
    this.kubbar[1].move(dx, dy, dz);
}

StraightTriomino.prototype.moveThird = function(dx, dy, dz) {
    this.kubbar[2].move(dx, dy, dz);
}

StraightTriomino.prototype.swapEnds = function() {
    const tmp = this.kubbar[2];
    this.kubbar[2] = this.kubbar[0];
    this.kubbar[0] = tmp;
}


StraightTriomino.prototype.rotateX = function(direction) {
    switch (this.currentRotationState) {
        case this.rotationStates.X: //-----------------------------------
            // snýr á X ás == do nothing
            break;

        case this.rotationStates.Y: //-----------------------------------
            if (this.canMoveFirst(1, 1, 0) && this.canMoveThird(-1, -1, 0)) {
                this.moveFirst(1, 1, 0);
                this.moveThird(-1, -1, 0);
                this.currentRotationState = this.rotationStates.X;
            }
            break;

        case this.rotationStates.Z: //-----------------------------------1
            if (this.canMoveFirst(1, 0, -1) && this.canMoveThird(-1, 0, 1)) {
                this.moveFirst(1, 0, -1);
                this.moveThird(-1, 0, 1);
                this.currentRotationState = this.rotationStates.X;
            }
            break;

    }
}



StraightTriomino.prototype.rotateY = function(direction) {
    switch (this.currentRotationState) {
        case this.rotationStates.X: //-----------------------------------
            if (this.canMoveFirst(-1, -1, 0) && this.canMoveThird(1, 1, 0)) {
                this.moveFirst(-1, -1, 0);
                this.moveThird(1, 1, 0);
                this.currentRotationState = this.rotationStates.Y;
            }
            break;

        case this.rotationStates.Y: //-----------------------------------
            break;

        case this.rotationStates.Z: //-----------------------------------1
            if (this.canMoveFirst(0, -1, -1) && this.canMoveThird(0, 1, 1)) {
                this.moveFirst(0, -1, -1);
                this.moveThird(0, 1, 1);
                this.currentRotationState = this.rotationStates.Y;
            }
            break;

    }
}


StraightTriomino.prototype.rotateZ = function(direction) {
    switch (this.currentRotationState) {
        case this.rotationStates.X: //-----------------------------------
            if (this.canMoveFirst(-1, 0, 1) && this.canMoveThird(1, 0, -1)) {
                this.moveFirst(-1, 0, 1);
                this.moveThird(1, 0, -1);
                this.currentRotationState = this.rotationStates.Z;
            }
            break;

        case this.rotationStates.Y: //-----------------------------------
            if (this.canMoveFirst(0, 1, 1) && this.canMoveThird(0, -1, -1)) {
                this.moveFirst(0, 1, 1);
                this.moveThird(0, -1, -1);
                this.currentRotationState = this.rotationStates.Z;
            }
            break;

        case this.rotationStates.Z: //-----------------------------------1
            break;

    }
}