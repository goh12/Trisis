function G_Line() {
    this.type = FG_GraphicsObject.prototype.type.WIREFRAME;
    this.getShaderVariableLocations();
    
    this.color = vec4(0.5, 0.5, 0.5, 0.1);
    this.setupBuffer(G_Line.prototype.wireframe);

    this._drawable = null;
}

G_Line.prototype = new FG_GraphicsObject();

G_Line.prototype.wireframe = [
    vec3(0.0, -0.5, 0.0), vec3(0.0, 0.5, 0.0)
];


G_Line.prototype.getDrawable = function() {
    if ( G_Line.prototype._drawable == null ) {
        G_Line.prototype._drawable = new G_Line();
    } 

    return G_Line.prototype._drawable;
}

