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
            spinY =  (spinY + DeltaTime * rotateSpeed * (e.clientX - origX) ) % 360;
            spinX =  (spinX + DeltaTime * rotateSpeed * (e.clientY - origY) ) % 360;
            origX = e.clientX;
            origY = e.clientY;
        }
    });

    window.addEventListener("wheel", function(e){
        if( e.deltaY > 0.0 ) {
            zView += DeltaTime * 80;
        } else {
            zView = Math.max(2, zView - DeltaTime * 80);
        }
        e.preventDefault();
        e.returnValue = false;
    });
}
