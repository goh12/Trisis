function G_Fin() {
    this.type = FG_GraphicsObject.prototype.type.ARRAY_BUFFER;
    this.color = vec4(1.0, 1.0, 1.0, 1.0);
    this.isWireframe = 0;

    this.getShaderVariableLocations();
    this.setupBuffer(G_Fin.prototype.vArrayBuffer, G_Fin.prototype.normals);
    
}

G_Fin.prototype = new FG_GraphicsObject();

G_Fin.prototype.vertices = [
    vec3(0.0, 0.0, 0.0),
    vec3(-1.0, 0.4, 0.05),
    vec3(-1.0, 0.4, -0.05),
    vec3(-1.0, -0.4, 0.05),
    vec3(-1.0, -0.4, -0.05)
];

G_Fin.prototype.indices = [
    0, 2, 1,
    0, 1, 3,
    0, 3, 4,
    0, 4, 2,
    1, 2, 4,
    1, 4, 3
];

let fin_buffers = fg_unpackIndices(G_Fin.prototype.indices, G_Fin.prototype.vertices);
G_Fin.prototype.vArrayBuffer = fin_buffers.buffer;
G_Fin.prototype.normals = fin_buffers.normals;
