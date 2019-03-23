function attachKeyboardHandlers() {
    // Event listener for keyboard
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 32:    // bilstöng
                CONTAINER.movingTriomino.shootDown();
                break;
            case 37:    // vinstri ör
                CONTAINER.movingTriomino.moveX(1);
                break;
            case 38:	// upp ör
                CONTAINER.movingTriomino.moveZ(1);
            break;
            case 39:	// hægri ör
                CONTAINER.movingTriomino.moveX(-1);
                break;
            case 40:	// niður ör
                CONTAINER.movingTriomino.moveZ(-1);
                break;
            case 90:	// z - snúa um x-ás
                break;
            case 88:	// x 
                break;
            case 65:	// a  - snúa um x-ás
                CONTAINER.movingTriomino.rotateX();
                break;
            case 83:	// s 
                break;
            case 81:	// q 
                break;
            case 87:	// w 
                break;
        }
    }  );  
}