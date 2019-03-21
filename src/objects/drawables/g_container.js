

function G_Container() {
    this.type = FG_GraphicsObject.prototype.type.WIREFRAME;
    this.getShaderVariableLocations();
    
    this.color = vec4(0.5, 0.5, 0.5, 0.1);
    this.setupBuffer(G_Container.prototype.wireframe);
}


const __containerVertices = [];
/*
for(let y = 0; y <= 20; y++) {
    for (let i = 0; i <= 6; i++) {
        __containerVertices.push(vec3(0.0, y, i));
        __containerVertices.push(vec3(6.0, y, i));
        __containerVertices.push(vec3(i, y, 0.0));
        __containerVertices.push(vec3(i, y, 6.0))
    }
}
*/

for(let y = 0; y <= 20; y++) {
    __containerVertices.push(vec3(0.0, y, 0.0));
    __containerVertices.push(vec3(6.0, y, 0.0));
    __containerVertices.push(vec3(6.0, y, 0.0));
    __containerVertices.push(vec3(6.0, y, 6.0));
    __containerVertices.push(vec3(0.0, y, 0.0));
    __containerVertices.push(vec3(0.0, y, 6.0));
    __containerVertices.push(vec3(0.0, y, 6.0));
    __containerVertices.push(vec3(6.0, y, 6.0));
}

for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 5; j++) {
        __containerVertices.push(vec3(i, 0.0, j));
        __containerVertices.push(vec3(i, 20.0, j));
    }
}


G_Container.prototype = new FG_GraphicsObject();

G_Container.prototype.wireframe = __containerVertices;
