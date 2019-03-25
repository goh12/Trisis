let GL = null;
let PROGRAM = null;
let PROGRAM_WIREFRAME = null;
let canvas = null;

let DeltaTime = 0;

let watertank = null;
let flock = null;

let projectionMatrixLoc = null;
projectionMatrix = null;

let lightPosition = vec4(-10, 30, 5, 0.0 );
let lightAmbient = vec4(0.8, 0.8, 0.8, 1.0 );
let lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
let lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

let shininess = 80.0;

let CONTAINER = null;
let testSuite = null;
let playerScore = 0;

function init() {
    canvas = document.getElementById("gl-canvas");

    GL = WebGLUtils.setupWebGL(canvas);
    if(!GL) {
        alert("WebGL is not available");
    }
    
    PROGRAM = initShaders(GL, "vertex-shader", "fragment-shader");
    PROGRAM_WIREFRAME = initShaders(GL, "vertex-shader-wireframe", "fragment-shader");
    GL.useProgram(PROGRAM);

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
    
    attachMouseHandlers(canvas, 0, 0, 20, 20);
    attachKeyboardHandlers()
    render(0);
}

let time = 0;
function render(delta) {
    DeltaTime = (delta - time)/1000;
    time = delta;
    //console.log(DeltaTime);

    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    
    const PROJECTION = perspective(60, 4/3, 0.1, 500.0);
    const CAMERA = lookAt(vec3(0, 0, zView), vec3(0, 0, 0), vec3(0.0, 1.0, 0.0));
    const projectionMatrix = mult(PROJECTION, CAMERA);
    GL.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    let MV = mult(rotateX(spinX), rotateY(spinY));
    MV = mult(MV, translate(negate(CONTAINER.getLookAt())));
    MV = mult(MV, translate(-3.0, -10, -3,0));
    
    CONTAINER.render(projectionMatrix, MV);
    //testSuite.render(MV);

    // TODO: færa update úr render?
    CONTAINER.update(DeltaTime);

    requestAnimationFrame(render);
}


window.onload = init;