function Container() {
    this.cells = createArray(6, 20, 6);
    this.staticTriominos = [];
    this.movingTriomino = null;
}

Container.prototype.update = function() {
    
}

Container.prototype.render = function() {
    
}

Container.prototype.newTriomino = function() {
    
}

Container.prototype.checkEvents = function() {
    
}

Container.prototype.canMove = function (x, y, z) {
    
}


/**
 * Getum upphafsstillt multi-dimensional array 
 * @param {} length 
 */
function createArray(length) {
    let arr = new Array(length || 0),
        i = length;
  
    if (arguments.length > 1) {
      let args = Array.prototype.slice.call(arguments, 1);
      while(i--) {
          arr[i] = createArray.apply(this, args);
      } 
    }        
    return arr;
}