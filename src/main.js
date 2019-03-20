let GL = null;
let PROGRAM = null;
let canvas = null;

let watertank = null;
let flock = null;

let projectionMatrixLoc = null;
projectionMatrix = null;

let lightPosition = vec4(50.0, 50.0, 0.0, 0.0 );
let lightAmbient = vec4(0.5, 0.5, 0.5, 1.0 );
let lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
let lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

let shininess = 50.0;

let CONTAINER = null;

function init() {
    canvas = document.getElementById("gl-canvas");

    GL = WebGLUtils.setupWebGL(canvas);
    if(!GL) {
        alert("WebGL is not available");
    }
    
    PROGRAM = initShaders(GL, "vertex-shader", "fragment-shader");
    GL.useProgram(PROGRAM);

    projectionMatrixLoc = GL.getUniformLocation(PROGRAM, "projectionMatrix");
    GL.uniform4fv(GL.getUniformLocation(PROGRAM, "lightAmbient"), 
        flatten(lightAmbient));
    GL.uniform4fv(GL.getUniformLocation(PROGRAM, "lightDiffuse"), 
        flatten(lightDiffuse));
    GL.uniform4fv(GL.getUniformLocation(PROGRAM, "lightSpecular"), 
        flatten(lightSpecular));
        GL.uniform4fv(GL.getUniformLocation(PROGRAM, "lightPosition"), 
        flatten(lightPosition));
    GL.uniform1f(GL.getUniformLocation(PROGRAM, "shininess"), 
        shininess);

    
    GL.viewport(0, 0, canvas.width, canvas.height);
    GL.clearColor(0.1, 0.1, 0.1, 1.0);
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LESS);
    GL.enable(GL.CULL_FACE);
    GL.frontFace(GL.CCW);
    GL.enable(GL.BLEND);

    //CONTAINER = new Container();

    fg_attachMouseHandlers(canvas, 0, 0, 1, 40);
    render(0);
}

let time = 0;
function render(delta) {
    //console.log(delta - time);
    time = delta;

    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    
    const PROJECTION = perspective(60, 4/3, 0.1, 500.0);
    const CAMERA = lookAt(vec3(3.0, 10.0, zView), vec3(3.0, 10.0, 3.0), vec3(0.0, 1.0, 0.0));
    projectionMatrix = mult(PROJECTION, CAMERA);
    GL.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    const MV = mult(rotateX(spinX), rotateY(spinY));
    
    //CONTAINER.prepare();
    //CONTAINER.draw(MV, {});

    requestAnimationFrame(render);
}




/*
function attachKeyListeners() {
    const W = "W".charCodeAt(0);
    const S = "S".charCodeAt(0);
    const E = "E".charCodeAt(0);
    const D = "D".charCodeAt(0);
    const R = "R".charCodeAt(0);
    const F = "F".charCodeAt(0);
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case W:
                ALIGN_SCALE += 0.05;
                document.getElementById("alignment").textContent = ALIGN_SCALE.toFixed(2);
                break;
            case S:
                ALIGN_SCALE -= 0.05;
                document.getElementById("alignment").textContent = ALIGN_SCALE.toFixed(2);
                break;
            case E:
                COHESION_SCALE += 0.05;
                document.getElementById("cohesion").textContent = COHESION_SCALE.toFixed(2);
                break;
            case D:
                COHESION_SCALE -= 0.05;
                document.getElementById("cohesion").textContent = COHESION_SCALE.toFixed(2);
                break;
            case R:
                SEPERATION_SCALE += 0.05;
                document.getElementById("seperation").textContent = SEPERATION_SCALE.toFixed(2);
                break;
            case F:
                SEPERATION_SCALE -= 0.05;
                document.getElementById("seperation").textContent = SEPERATION_SCALE.toFixed(2);
                break;
        }
    });
}
*/

window.onload = init;