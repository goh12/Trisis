function Block(x, y, z) {
    this.xCell = x;
    this.yCell = y;
    this.zCell = z;
}

Block.prototype.setCell = function(x, y, z) {
    this.xCell = x;
    this.yCell = y;
    this.zCell = z;
}

Block.prototype.calcLocation = function() {

}

//Færir blokk um x, y, z
Block.prototype.move = function(x, y, z) {

}

// Athugar hvort blokk geti fært isg
Block.prototype.canMove = function () {
    
}