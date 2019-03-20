let GL = null;
let PROGRAM = null;
let canvas = null;

let watertank = null;
let flock = null;

let projectionMatrixLoc = null;
projectionMatrix = null;

let lightPosition = vec4(50.0, 50.0, -10.0, 0.0 );
let lightAmbient = vec4(0.5, 0.5, 0.5, 1.0 );
let lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
let lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

let shininess = 80.0;

let CONTAINER = null;
let testSuite = null;

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

    CONTAINER = new Container();
    //testSuite = new TestSuite();
    
    fg_attachMouseHandlers(canvas, 0, 0, 1, 30);
    render(0);
}

let time = 0;
function render(delta) {
    //console.log(delta - time);
    time = delta;

    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    
    const PROJECTION = perspective(60, 4/3, 0.1, 500.0);
    const CAMERA = lookAt(vec3(3, 20.0, zView), vec3(3.0, 6.0, 3.0), vec3(0.0, 1.0, 0.0));
    projectionMatrix = mult(PROJECTION, CAMERA);
    GL.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    const MV = mult(rotateX(spinX), rotateY(spinY));
    
    CONTAINER.render(MV);
    //testSuite.render(MV);


    requestAnimationFrame(render);
}


window.onload = init;