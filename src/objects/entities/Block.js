function Block(x, y, z, color) {
    this.xCell = x;
    this.yCell = y;
    this.zCell = z;

    this.drawable = G_Block.prototype.getDrawable();
    this.color = color;
}



Block.prototype.setCell = function(x, y, z) {
    this.xCell = x;
    this.yCell = y;
    this.zCell = z;
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

}

// Athugar hvort blokk geti fært sig
Block.prototype.canMove = function () {
    
    const cellBelow = CONTAINER.cells[this.xCell][this.yCell-1][this.zCell];
    
    return cellBelow !== 1;
}

Block.prototype.lowerYCell = function () {
    this.yCell--;
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

// TODO: taka út testsuite fyrir production
function TestSuite() {
    this.block = new Block();
}

TestSuite.prototype.render = function(mv) {
    this.block.render(mv);
}
