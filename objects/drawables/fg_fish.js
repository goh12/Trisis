function G_FishBody(type) {
    this.type = type;
    this.color = this.color = vec4(0.5, 0.9, 0.2, 1.0);
    this.getShaderVariableLocations();

    switch(this.type) {
        case FG_GraphicsObject.prototype.type.WIREFRAME:
            this.isWireframe = 1;
            this.setupBuffer(G_FishBody.prototype.wireframeArrayBuffer);
            break;
        case FG_GraphicsObject.prototype.type.ARRAY_BUFFER:
            this.isWireframe = 0;
            this.setupBuffer(G_FishBody.prototype.vArrayBuffer, G_FishBody.prototype.normals);
            break;
    }

    
}

G_FishBody.prototype = new FG_GraphicsObject();

G_FishBody.prototype.vertices = [
    vec3(0.0, 0.5, 0.0),
    vec3(1.0, 0.5, 0.0),
    vec3(1.0, -0.5, 0.0),
    vec3(0.0, -0.5, 0.0),
    vec3(-1.0, -0.5, 0.0),
    vec3(-1.0, 0.5, 0.0),

    vec3(0.5, 0.0, 0.3), //6
    vec3(-0.5, 0.0, 0.3),
    vec3(0.5, 0.0, -0.3),
    vec3(-0.5, 0.0, -0.3),

    vec3(1.4, 0.0, 0.0),
    vec3(-1.2, 0.0, 0.0)
];

G_FishBody.prototype.wireframe = [
    0, 1, 2, 3, 3, 4, 5, 0,
    1, 6, 1, 8, 2, 6, 2, 8, 6, 7, 8, 9,
    4, 7, 4, 9, 5, 7, 5, 9,
    1, 10, 2, 10, 4, 11, 5, 11
];

G_FishBody.prototype.indices = [
    0, 6, 1, 0, 7, 6, 0, 5, 7,
    7, 5, 11, 7, 11, 4,
    3, 2, 6, 3, 6, 7, 3, 7, 4,
    6, 10, 1, 6, 2, 10,
    0, 1, 8, 0, 8, 9, 0, 9, 5,
    9, 11, 5, 9, 4, 11,
    2, 3, 8, 3, 9, 8, 3, 4, 9,
    8, 1, 10, 8, 10, 2
];

let fishBody_buffers = fg_unpackIndices(G_FishBody.prototype.indices, G_FishBody.prototype.vertices);
G_FishBody.prototype.vArrayBuffer = fishBody_buffers.buffer;
G_FishBody.prototype.normals = fishBody_buffers.normals;

G_FishBody.prototype.wireframeArrayBuffer = 
    fg_unpackIndices(G_FishBody.prototype.wireframe, G_FishBody.prototype.vertices);
