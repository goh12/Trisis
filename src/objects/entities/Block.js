function Block(x, y, z) {
    this.xCell = x;
    this.yCell = y;
    this.zCell = z;

    this.drawable = G_Block.prototype.getDrawable();
    this.color = vec4(Math.random(), Math.random(), Math.random(), 1);
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

Block.prototype.render = function(MV) {
    MV = mult(MV, translate(this.calcLocation()));
    this.drawable.prepare();
    this.drawable.draw(MV, this);
}

//Færir blokk um x, y, z
Block.prototype.move = function(x, y, z) {

}

// Athugar hvort blokk geti fært isg
Block.prototype.canMove = function () {
    
}

function TestSuite() {
    this.block = new Block();
}

TestSuite.prototype.render = function(mv) {
    this.block.render(mv);
}
