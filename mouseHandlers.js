var movement = false;
var spinX = 0;
var spinY = 0;
var origX;
var origY;
var rotateSpeed = 1.0;
var zView = 0;


function fg_attachMouseHandlers(canvas, initX, initY, speed, initZView) {
    spinX = initX;
    spinY = initY;
    rotateSpeed = speed;
    zView = initZView;

    console.log("Attaching mouse rotation events");
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.clientX;
        origY = e.clientY;
        e.preventDefault();         // Disable drag and drop
    } );
    
    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );
    
    canvas.addEventListener("mousemove", function(e){
        if(movement) {
            spinY = ( spinY + rotateSpeed * (e.clientX - origX) ) % 360;
            spinX = ( spinX + rotateSpeed * (e.clientY - origY) ) % 360;
            origX = e.clientX;
            origY = e.clientY;
        }
    });

    window.addEventListener("mousewheel", function(e){
        if( e.wheelDelta > 0.0 ) {
            zView += 2;
        } else {
            zView -= 2;
        }
        e.preventDefault();
        e.returnValue = false;
    });
}
