/*
    G_Quad - týpa af FG_Object.

    Hægt að teikna bæði sem WIREFRAME eða ARRAY_BUFFER hlut.

    WIREFRAME notar uniform breytu fyrir lit.
    ARRAY_BUFFER notar color buffer.
*/

function G_Quad(fg_objectType) {
    this.type = fg_objectType;

    this.getShaderVariableLocations();
    
    switch(this.type) {
        case FG_GraphicsObject.prototype.type.ARRAY_BUFFER:
            this.color = vec4(1.0, 1.0, 1.0, 1.0);
            this.isWireframe = 0;
            this.setupBuffer(G_Quad.prototype.vArrayBuffer,  G_Quad.prototype.normals);
            break;
        case FG_GraphicsObject.prototype.type.WIREFRAME:    
            this.color = vec4(0.5, 0.9, 0.2, 1.0);
            this.isWireframe = 1;
            this.setupBuffer(G_Quad.prototype.wireframeArrayBuffer);
            break;
    }

}

G_Quad.prototype = new FG_GraphicsObject();

G_Quad.prototype.vertices = [
    vec3(-0.5, -0.5, -0.5),
    vec3(0.5, -0.5, -0.5),
    vec3(0.5, 0.5, -0.5),
    vec3(-0.5, 0.5, -0.5),
    vec3(-0.5, -0.5, 0.5),
    vec3(0.5, -0.5, 0.5),
    vec3(0.5, 0.5, 0.5),
    vec3(-0.5, 0.5, 0.5)
];

G_Quad.prototype.indices = [
    2, 1, 0,
    3, 2, 0,
    6, 5, 1,
    2, 6, 1,
    6, 7, 5,
    5, 7, 4,
    3, 0, 4,
    7, 3, 4,
    6, 2, 3,
    7, 6, 3,
    1, 5, 0,
    5, 4, 0
];

let quad_buffers = fg_unpackIndices(G_Quad.prototype.indices, G_Quad.prototype.vertices, false);
G_Quad.prototype.vArrayBuffer = quad_buffers.buffer;
G_Quad.prototype.normals = quad_buffers.normals;

G_Quad.prototype.wireframe = [
    0, 1, 1, 2, 2, 3, 3, 0,
    0, 4, 1, 5, 2, 6, 3, 7,
    4, 5, 5, 6, 6, 7, 7, 4
];

G_Quad.prototype.wireframeArrayBuffer =
    fg_unpackIndices(G_Quad.prototype.wireframe, G_Quad.prototype.vertices, true);
