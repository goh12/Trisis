/*
    G_Block - týpa af FG_Object.

    Hægt að teikna bæði sem WIREFRAME eða ARRAY_BUFFER hlut.

    WIREFRAME notar uniform breytu fyrir lit.
    ARRAY_BUFFER notar color buffer.
*/

function G_Block() {
    this.type = FG_GraphicsObject.prototype.type.ARRAY_BUFFER;
    this.getShaderVariableLocations();

    this.color = vec4(0.5, 1.0, 0.5, 1.0);
    this.isWireframe = 0;
    this.setupBuffer(G_Block.prototype.vArrayBuffer,  G_Block.prototype.normals);
}

G_Block.prototype = new FG_GraphicsObject();

G_Block.prototype.vertices = [
    vec3(-0.35,   -0.35,     0.5),//0
    vec3( 0.35,   -0.35,     0.5),//1
    vec3( 0.35,    0.35,     0.5),//2
    vec3(-0.35,    0.35,     0.5),//3
    vec3(-0.35,   -0.35,    -0.5),//4
    vec3( 0.35,   -0.35,    -0.5),//5
    vec3( 0.35,    0.35,    -0.5),//6
    vec3(-0.35,    0.35,    -0.5),//7
    
    vec3(-0.5,   -0.35,     0.35),//8
    vec3( 0.5,   -0.35,     0.35),//9
    vec3( 0.5,    0.35,     0.35),//10
    vec3(-0.5,    0.35,     0.35),//11
    vec3(-0.5,   -0.35,    -0.35),//12
    vec3( 0.5,   -0.35,    -0.35),//13
    vec3( 0.5,    0.35,    -0.35),//14
    vec3(-0.5,    0.35,    -0.35),//15

    vec3(-0.35,   -0.5,     0.35),//16
    vec3( 0.35,   -0.5,     0.35),//17
    vec3( 0.35,    0.5,     0.35),//18
    vec3(-0.35,    0.5,     0.35),//19
    vec3(-0.35,   -0.5,    -0.35),//20
    vec3( 0.35,   -0.5,    -0.35),//21
    vec3( 0.35,    0.5,    -0.35),//22
    vec3(-0.35,    0.5,    -0.35),//23
];


G_Block.prototype.indices = [
    8, 3, 11,
    0, 3, 8,
    7, 12, 15,
    4, 12, 7,
    6, 14, 5,
    14, 13, 5,
    1, 10, 2,
    1, 9, 10,

    1, 17, 9,//Corner
    9, 17, 21,
    9, 21, 13,
    5, 13, 21,//Corner
    20, 5, 21,
    20, 4, 5,
    20, 12, 4,//Corner
    16, 8, 12,
    16, 12, 20,
    0, 8, 16, //Corner
    1, 0, 16,
    1, 16, 17,

    3, 19, 11,//Corner
    11, 19, 23,
    11, 23, 15,
    7, 15, 23,//Corner
    22, 7, 23,
    22, 6, 7,
    22, 14, 6,//Corner
    18, 10, 14,
    18, 14, 22,
    2, 10, 18, //Corner
    3, 2, 18,
    3, 18, 19,

    0, 1, 2,
    0, 2, 3,

    5, 7, 6,
    4, 7, 5,

    9, 13, 14,
    9, 14, 10,

    12, 8, 11,
    12, 11, 15,

    19, 18, 22,
    19, 22, 23,

    16, 21, 17,
    16, 20, 21
];

let quad_buffers = fg_unpackIndices(G_Block.prototype.indices, G_Block.prototype.vertices, false);
G_Block.prototype.vArrayBuffer = quad_buffers.buffer;
G_Block.prototype.normals = quad_buffers.normals;

G_Block.prototype.wireframe = [
    0, 1, 1, 2, 2, 3, 3, 0,
    0, 4, 1, 5, 2, 6, 3, 7,
    4, 5, 5, 6, 6, 7, 7, 4
];

/**
 * Gera singleton.
 */
G_Block.prototype._drawable = null;
G_Block.prototype.getDrawable = function() {
    if (G_Block.prototype._drawable == null) {
        G_Block.prototype._drawable = new G_Block();
    }

    return G_Block.prototype._drawable;
}


G_Block.prototype.wireframeArrayBuffer =
    fg_unpackIndices(G_Block.prototype.wireframe, G_Block.prototype.vertices, true);


