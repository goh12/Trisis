function Block(x, y, z, color) {
    this.xCell = x;
    this.yCell = y;
    this.zCell = z;

    this.drawable = G_Block.prototype.getDrawable();
    this.color = color;
}



Block.prototype.setCell = function(x, y, z) {
    this.xCell += x;
    this.yCell += y;
    this.zCell += z;
}

Block.prototype.calcLocation = function() {
    return vec3(
        this.xCell + 0.5, 
        this.yCell + 0.5,
        this.zCell + 0.5,
        0.0
    );
}

Block.prototype.render = function(projectionMatrix, MV) {
    MV = mult(MV, translate(this.calcLocation()));
    this.drawable.draw(projectionMatrix, MV, this);
}

//Færir blokk um x, y, z
Block.prototype.move = function(x, y, z) {
    this.xCell -= x;
    this.yCell -= y;
    this.zCell -= z;
}

// Athugar hvort blokk geti fært sig
Block.prototype.canMove = function (x, y, z) {

    let nextCell = 0;
    
    // athugm hvort tilfærslur séu out of bounds
    if (x < 0 || z < 0) {
        if (this.xCell - x > 5 || this.yCell - y > 20 || this.zCell - z > 5) {
            return false;
        }    
    } else if (x > 0 || z > 0) {
        if (this.xCell - x < 0 || this.yCell + y < 0 || this.zCell - z < 0) {
            return false;
        }
    } else if (this.yCell + y < 0) {
        return false;
    } else {
        nextCell = CONTAINER.cells[this.xCell + x][this.yCell + y][this.zCell + z];
    }


    return nextCell !== 1;
}

Block.prototype.getXCell = function () {
    return this.xCell;
}

Block.prototype.getYCell = function () {
    return this.yCell;
}

Block.prototype.getZCell = function () {
    return this.zCell;
}

Block.prototype.getCells = function() {
    return vec3(this.xCell, this.yCell, this.zCell);
}