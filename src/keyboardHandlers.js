function attachKeyboardHandlers() {
    // Event listener for keyboard
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 38:	// upp ör
                zView += 0.2;
                break;
            case 40:	// niður ör
                zView -= 0.2;
                break;
            case 90:	// z 
                break;
            case 88:	// x 
                break;
            case 65:	// a 
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