function BentTriomino() {
    this.kubbar = createArray(3);
    this.color = vec4(Math.random(), Math.random(), Math.random(), 1);
    this.shouldMove = 1;

    this.setStartPosition();
}

BentTriomino.prototype = new Triomino();

/**
 * All possible states of rotation for BentTriomino.
 */
BentTriomino.prototype.rotationStates = {
    YZ: 0, yZ: 1, yz: 2, Yz: 3,
    ZX: 4, Zx: 5, zx: 6, zX: 7,
    YX: 8, yX: 9, yx: 10, Yx: 11
}

/**
 * Find random start positon.
 */
BentTriomino.prototype.setStartPosition = function() {
    this.currentRotationState = this.rotationStates.ZX;
    this.kubbar[0] = new Block(2, 19, 3, this.color);
    this.kubbar[1] = new Block(2, 19, 2, this.color);
    this.kubbar[2] = new Block(3, 19, 2, this.color);
}


BentTriomino.prototype.canMoveFirst = function(dx, dy, dz) {
    if (this.kubbar[0].canMove(dx, dy, dz)) return true;
    return false;
}

BentTriomino.prototype.canMoveSecond = function(dx, dy, dz) {
    if (this.kubbar[1].canMove(dx, dy, dz)) return true;
    return false;
}

BentTriomino.prototype.canMoveThird = function(dx, dy, dz) {
    if (this.kubbar[2].canMove(dx, dy, dz)) return true;
    return false;
}

BentTriomino.prototype.moveFirst = function(dx, dy, dz) {
    this.kubbar[0].move(dx, dy, dz);
}

BentTriomino.prototype.moveSecond = function(dx, dy, dz) {
    this.kubbar[1].move(dx, dy, dz);
}

BentTriomino.prototype.moveThird = function(dx, dy, dz) {
    this.kubbar[2].move(dx, dy, dz);
}

BentTriomino.prototype.swapEnds = function() {
    const tmp = this.kubbar[2];
    this.kubbar[2] = this.kubbar[0];
    this.kubbar[0] = tmp;
}


BentTriomino.prototype.rotateX = function(direction) {
    switch (this.currentRotationState) {
        case this.rotationStates.ZX: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(0, 1, 1)) {
                    this.moveFirst(0, 1, 1);
                    this.currentRotationState = this.rotationStates.yX;
                }
                
            } else {
                if (this.canMoveFirst(0, -1, 1)) {
                    this.moveFirst(0, -1, 1);
                    this.currentRotationState = this.rotationStates.YX;
                }
            }
            break;

        case this.rotationStates.zX: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(0, -1, -1)) {
                    this.moveFirst(0, -1, -1);
                    this.currentRotationState = this.rotationStates.YX;
                }
                
            } else {
                if (this.canMoveFirst(0, 1, -1)) {
                    this.moveFirst(0, 1, -1);
                    this.currentRotationState = this.rotationStates.yX;
                }
            }
            break;

        case this.rotationStates.zx: //-----------------------------------1
            if (direction) {
                if (this.canMoveFirst(0, -1, -1)) {
                    this.moveFirst(0, -1, -1);
                    this.currentRotationState = this.rotationStates.Yx;
                }
                
            } else {
                if (this.canMoveFirst(0, 1, -1)) {
                    this.moveFirst(0, 1, -1);
                    this.currentRotationState = this.rotationStates.yx;
                }
            }
            break;

        case this.rotationStates.Zx: //-----------------------------------1
            if (direction) {
                if (this.canMoveFirst(0, 1, 1)) {
                    this.moveFirst(0, 1, 1);
                    this.currentRotationState = this.rotationStates.yx;
                }
                
            } else {
                if (this.canMoveFirst(0, -1, 1)) {
                    this.moveFirst(0, -1, 1);
                    this.currentRotationState = this.rotationStates.Yx;
                }
            }
            break;

            //---------------------------------------------------------------------------------------------------------

            case this.rotationStates.YX: //-----------------------------------
            if(direction) {
                if (this.canMoveFirst(0, 1, -1)) {
                    this.moveFirst(0, 1, -1);
                    this.currentRotationState = this.rotationStates.ZX;
                }
            } else {
                if (this.canMoveFirst(0, 1, 1)) {
                    this.moveFirst(0, 1, 1);
                    this.currentRotationState = this.rotationStates.zX;
                }
            }
            break;

        case this.rotationStates.yX: //-----------------------------------
            if(direction) {
                if (this.canMoveFirst(0, -1, 1)) {
                    this.moveFirst(0, -1, 1);
                    this.currentRotationState = this.rotationStates.zX;
                }
            } else {
                if (this.canMoveFirst(0, -1, -1)) {
                    this.moveFirst(0, -1, -1);
                    this.currentRotationState = this.rotationStates.ZX;
                }
            }
            break;
        
        case this.rotationStates.Yx: //-----------------------------------
            if(direction) {
                if (this.canMoveFirst(0, 1, -1)) {
                    this.moveFirst(0, 1, -1);
                    this.currentRotationState = this.rotationStates.Zx;
                }
            } else {
                if (this.canMoveFirst(0, 1, 1)) {
                    this.moveFirst(0, 1, 1);
                    this.currentRotationState = this.rotationStates.zx;
                }
            }
            break;

        case this.rotationStates.yx: //-----------------------------------
            if(direction) {
                if (this.canMoveFirst(0, -1, 1)) {
                    this.moveFirst(0, -1, 1);
                    this.currentRotationState = this.rotationStates.zx;
                }
            } else {
                if (this.canMoveFirst(0, -1, -1)) {
                    this.moveFirst(0, -1, -1);
                    this.currentRotationState = this.rotationStates.Zx;
                }
            }
            break;


        // ---------------------------------------------------------------------------------------------

        case this.rotationStates.YZ: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(0, 1, -1) && this.canMoveThird(0, 1, 1)) {
                    this.moveFirst(0, 1, -1); this.moveThird(0, 1, 1);
                    this.currentRotationState = this.rotationStates.yZ;
                    this.swapEnds();
                }
            } else {
                if (this.canMoveFirst(0, 1, 1) && this.canMoveThird(0, -1, 1)) {
                    this.moveFirst(0, 1, 1); this.moveThird(0, -1, 1);
                    this.currentRotationState = this.rotationStates.Yz;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.Yz: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(0, 1, -1 && this.canMoveThird(0, -1, -1))) {
                    this.moveFirst(0, 1,-1); this.moveThird(0, -1, -1);
                    this.currentRotationState = this.rotationStates.YZ;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveFirst(0, 1, 1) && this.canMoveThird(0, 1, -1)) {
                    this.moveFirst(0, 1, 1); this.moveThird(0, 1, -1);
                    this.currentRotationState = this.rotationStates.yz;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.yZ: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(0, -1, 1) && this.canMoveThird(0, 1, 1)) {
                    this.moveFirst(0, -1, 1); this.moveThird(0, 1, 1);
                    this.currentRotationState = this.rotationStates.yz;
                    this.swapEnds();
                }
            } else {
                 if (this.canMoveFirst(0, -1, -1) && this.canMoveThird(0, -1, 1)) {
                    this.moveFirst(0, -1, -1); this.moveThird(0, -1, 1);
                    this.currentRotationState = this.rotationStates.YZ;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.yz: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(0, -1, 1) && this.canMoveThird(0, -1, -1)) {
                    this.moveFirst(0, -1, 1); this.moveThird(0, -1, -1);
                    this.currentRotationState = this.rotationStates.Yz;
                    this.swapEnds();
                }
            } else {
                 if (this.canMoveFirst(0, -1, -1) && this.canMoveThird(0, 1, -1)) {
                    this.moveFirst(0, -1, -1); this.moveThird(0, 1, -1);
                    this.currentRotationState = this.rotationStates.yZ;
                    this.swapEnds();
                }
            }
            break;

    }
}



BentTriomino.prototype.rotateY = function(direction) {
    switch (this.currentRotationState) {
        case this.rotationStates.ZX: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(1, 0, 1) && this.canMoveFirst(-1, 0, 1)) {
                    this.moveFirst(-1, 0, 1); this.moveThird(1, 0, 1);
                    this.currentRotationState = this.rotationStates.zX;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveFirst(1, 0, 1) && this.canMoveThird(1, 0, -1)) {
                    this.moveFirst(1, 0, 1); this.moveThird(1, 0, -1);
                    this.currentRotationState = this.rotationStates.Zx;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.zX: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(1, 0, -1 && this.canMoveThird(1, 0, 1))) {
                    this.moveFirst(1, 0, -1); this.moveThird(1, 0, 1);
                    this.currentRotationState = this.rotationStates.zx;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveFirst(-1, 0, -1) && this.canMoveThird(1, 0, -1)) {
                    this.moveFirst(-1, 0, -1); this.moveThird(1, 0, -1);
                    this.currentRotationState = this.rotationStates.ZX;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.zx: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(1, 0, -1) && this.canMoveThird(-1, 0, -1)) {
                    this.moveFirst(1, 0, -1); this.moveThird(-1, 0, -1);
                    this.currentRotationState = this.rotationStates.Zx;
                    this.swapEnds();
                }
            } else {
                 if (this.canMoveFirst(-1, 0, -1) && this.canMoveThird(-1, 0, 1)) {
                    this.moveFirst(-1, 0, -1); this.moveThird(-1, 0, 1);
                    this.currentRotationState = this.rotationStates.zX;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.Zx: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(-1, 0, 1) && this.canMoveThird(-1, 0, -1)) {
                    this.moveFirst(-1, 0, 1); this.moveThird(-1, 0, -1);
                    this.currentRotationState = this.rotationStates.ZX;
                    this.swapEnds();
                }
            } else {
                 if (this.canMoveFirst(1, 0, 1) && this.canMoveThird(-1, 0, 1)) {
                    this.moveFirst(1, 0, 1); this.moveThird(-1, 0, 1);
                    this.currentRotationState = this.rotationStates.zx;
                    this.swapEnds();
                }
            }
            break;

        //--------------------------------------------------------------------------------------------------

        case this.rotationStates.YX: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(1, 0, 1)) {
                    this.moveThird(1, 0, 1);
                    this.currentRotationState = this.rotationStates.Yz;
                }
                
            } else {
                if (this.canMoveThird(1, 0, -1)) {
                    this.moveThird(1, 0, -1);
                    this.currentRotationState = this.rotationStates.YZ;
                }
            }
            break;

        case this.rotationStates.Yx: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(-1, 0, -1)) {
                    this.moveThird(-1, 0, -1);
                    this.currentRotationState = this.rotationStates.YZ;
                }
                
            } else {
                if (this.canMoveThird(-1, 0, 1)) {
                    this.moveThird(-1, 0, 1);
                    this.currentRotationState = this.rotationStates.Yz;
                }
            }
            break;

        case this.rotationStates.yX: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(1, 0, 1)) {
                    this.moveThird(1, 0, 1);
                    this.currentRotationState = this.rotationStates.yz;
                }
            } else {
                 if (this.canMoveThird(1, 0, -1)) {
                    this.moveThird(1, 0, -1);
                    this.currentRotationState = this.rotationStates.yZ;
                }
            }
            break;

        case this.rotationStates.yx: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(-1, 0, -1)) {
                    this.moveThird(-1, 0, -1);
                    this.currentRotationState = this.rotationStates.yZ;
                }
            } else {
                 if (this.canMoveThird(-1, 0, 1)) {
                    this.moveThird(-1, 0, 1);
                    this.currentRotationState = this.rotationStates.yz;
                }
            }
            break;

        //--------------------------------------------------------------------------------------

        case this.rotationStates.YZ: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(-1, 0, 1)) {
                    this.moveThird(-1, 0, 1);
                    this.currentRotationState = this.rotationStates.YX;
                }
                
            } else {
                if (this.canMoveThird(1, 0, 1)) {
                    this.moveThird(1, 0, 1);
                    this.currentRotationState = this.rotationStates.Yx;
                }
            }
            break;

        case this.rotationStates.Yz: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(1, 0, -1)) {
                    this.moveThird(1, 0, -1);
                    this.currentRotationState = this.rotationStates.Yx;
                }
                
            } else {
                if (this.canMoveThird(-1, 0, -1)) {
                    this.moveThird(-1, 0, -1);
                    this.currentRotationState = this.rotationStates.YX;
                }
            }
            break;

        case this.rotationStates.yZ: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(-1, 0, 1)) {
                    this.moveThird(-1, 0, 1);
                    this.currentRotationState = this.rotationStates.yX;
                }
            } else {
                 if (this.canMoveThird(1, 0, 1)) {
                    this.moveThird(1, 0, 1);
                    this.currentRotationState = this.rotationStates.yx;
                }
            }
            break;

        case this.rotationStates.yz: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(1, 0, -1)) {
                    this.moveThird(1, 0, -1);
                    this.currentRotationState = this.rotationStates.yx;
                }
            } else {
                 if (this.canMoveThird(-1, 0, -1)) {
                    this.moveThird(-1, 0, -1);
                    this.currentRotationState = this.rotationStates.yX;
                }
            }
            break;
    }
}


BentTriomino.prototype.rotateZ = function(direction) {
    switch (this.currentRotationState) {
        case this.rotationStates.ZX: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(1, -1, 0)) {
                    this.moveThird(1, -1, 0);
                    this.currentRotationState = this.rotationStates.YZ;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveThird(1, 1, 0)) {
                    this.moveThird(1, 1, 0);
                    this.currentRotationState = this.rotationStates.yZ;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.zX: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(1, -1, 0)) {
                    this.moveThird(1, -1, 0);
                    this.currentRotationState = this.rotationStates.Yz;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveThird(1, 1, 0)) {
                    this.moveThird(1, 1, 0);
                    this.currentRotationState = this.rotationStates.yz;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.zx: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(-1, 1, 0)) {
                    this.moveThird(-1, 1, 0);
                    this.currentRotationState = this.rotationStates.yz;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveThird(-1, -1, 0)) {
                    this.moveThird(-1, -1, 0);
                    this.currentRotationState = this.rotationStates.Yz;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.Zx: //-----------------------------------
            if (direction) {
                if (this.canMoveThird(-1, 1, 0)) {
                    this.moveThird(-1, 1, 0);
                    this.currentRotationState = this.rotationStates.yZ;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveThird(-1, -1, 0)) {
                    this.moveThird(-1, -1, 0);
                    this.currentRotationState = this.rotationStates.YZ;
                    this.swapEnds();
                }
            }
            break;

        //--------------------------------------------------------------------------------------------------

        case this.rotationStates.YX: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(1, 1, 0) && this.canMoveThird(1, -1, 0)) {
                    this.moveFirst(1, 1, 0); this.moveThird(1, -1, 0);
                    this.currentRotationState = this.rotationStates.Yx;
                    this.swapEnds();

                }
            } else {
                if (this.canMoveFirst(-1, 1, 0) && this.canMoveThird(1, 1, 0)) {
                    this.moveFirst(-1, 1, 0); this.moveThird(1, 1, 0);
                    this.currentRotationState = this.rotationStates.yX;
                    this.swapEnds();

                }
            }
            break;

        case this.rotationStates.Yx: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(1, 1, 0) && this.canMoveThird(-1, 1, 0)) {
                    this.moveFirst(1, 1, 0); this.moveThird(-1, 1, 0);
                    this.currentRotationState = this.rotationStates.yx;
                    this.swapEnds();

                }
            } else {
                if (this.canMoveFirst(-1, 1, 0) && this.canMoveThird(-1, -1, 0)) {
                    this.moveFirst(-1, 1, 0); this.moveThird(-1, -1, 0);
                    this.currentRotationState = this.rotationStates.YX;
                    this.swapEnds();

                }
            }
            break;

        case this.rotationStates.yX: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(-1, -1, 0) && this.canMoveThird(1, -1, 0)) {
                    this.moveFirst(-1, -1, 0); this.moveThird(1, -1, 0);
                    this.currentRotationState = this.rotationStates.YX;
                    this.swapEnds();
                }
            } else {
                if (this.canMoveFirst(1, -1, 0) && this.canMoveThird(1, 1, 0)) {
                    this.moveFirst(1, -1, 0); this.moveThird(1, 1, 0);
                    this.currentRotationState = this.rotationStates.yx;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.yx: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(-1, -1, 0) && this.canMoveThird(-1, 1, 0)) {
                    this.moveFirst(-1, -1, 0); this.moveThird(-1, 1, 0);
                    this.currentRotationState = this.rotationStates.yX;
                    this.swapEnds();
                }
            } else {
                if (this.canMoveFirst(1, -1, 0) && this.canMoveThird(-1, -1, 0)) {
                    this.moveFirst(1, -1, 0); this.moveThird(-1, -1, 0);
                    this.currentRotationState = this.rotationStates.Yx;
                    this.swapEnds();
                }
            }
            break;

        //--------------------------------------------------------------------------------------

        case this.rotationStates.YZ: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(1, 1, 0)) {
                    this.moveFirst(1, 1, 0);
                    this.currentRotationState = this.rotationStates.Zx;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveFirst(-1, 1, 0)) {
                    this.moveFirst(-1, 1, 0);
                    this.currentRotationState = this.rotationStates.ZX;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.Yz: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(1, 1, 0)) {
                    this.moveFirst(1, 1, 0);
                    this.currentRotationState = this.rotationStates.zx;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveFirst(-1, 1, 0)) {
                    this.moveFirst(-1, 1, 0);
                    this.currentRotationState = this.rotationStates.zX;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.yZ: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(-1, -1, 0)) {
                    this.moveFirst(-1, -1, 0);
                    this.currentRotationState = this.rotationStates.ZX;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveFirst(1, -1, 0)) {
                    this.moveFirst(1, -1, 0);
                    this.currentRotationState = this.rotationStates.Zx;
                    this.swapEnds();
                }
            }
            break;

        case this.rotationStates.yz: //-----------------------------------
            if (direction) {
                if (this.canMoveFirst(-1, -1, 0)) {
                    this.moveFirst(-1, -1, 0);
                    this.currentRotationState = this.rotationStates.zX;
                    this.swapEnds();
                }
                
            } else {
                if (this.canMoveFirst(1, -1, 0)) {
                    this.moveFirst(1, -1, 0);
                    this.currentRotationState = this.rotationStates.zx;
                    this.swapEnds();
                }
            }
            break;
    }
}