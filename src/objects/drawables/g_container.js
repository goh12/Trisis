

function G_Container() {
    this.type = FG_GraphicsObject.prototype.type.WIREFRAME;
    this.getShaderVariableLocations();
    
    this.color = vec4(0.5, 0.5, 0.5, 0.1);
    this.setupBuffer(G_Container.prototype.wireframe);
}


const __containerVertices = [];

for(let y = 0; y <= 20; y+=20) {
    for (let i = 0; i <= 6; i++) {
        __containerVertices.push(vec3(0.0, y, i));
        __containerVertices.push(vec3(6.0, y, i));
        __containerVertices.push(vec3(i, y, 0.0));
        __containerVertices.push(vec3(i, y, 6.0))
    }
}

__containerVertices.push(
    vec3(0.0, 0.0, 0.0), vec3(0.0, 20.0, 0.0),
    vec3(6.0, 0.0, 0.0), vec3(6.0, 20.0, 0.0),
    vec3(0.0, 0.0, 6.0), vec3(0.0, 20.0, 6.0),
    vec3(6.0, 0.0, 6.0), vec3(6.0, 20.0, 6.0),
);

G_Container.prototype = new FG_GraphicsObject();

G_Container.prototype.wireframe = __containerVertices;
