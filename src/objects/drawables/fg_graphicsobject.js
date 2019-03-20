/*
    FG_GraphicsObject

    Heldur utan um sameiginlega eiginleika grafískra hluta.
    
    Grafískir hlutir ættu að nota FG_GraphicsObject sem prototype
    til að flýta fyrir að setja upp rétt köll.

*/
function FG_GraphicsObject() {
    this.type = null;
    this.usingUniformColor = true;
}

/**
 *  Nær í location fyrir all variables sem eru nauðsynlegir fyrir hlut
 *  að geyma úr shader.
 */
FG_GraphicsObject.prototype.getShaderVariableLocations = function() {
    this.vPositionLoc = GL.getAttribLocation(PROGRAM, "vPosition");
    this.vNormalLoc = GL.getAttribLocation(PROGRAM, "vNormal");
    this.modelViewMatrixLoc = GL.getUniformLocation(PROGRAM, "modelViewMatrix");
    this.colorLoc = GL.getUniformLocation(PROGRAM, "color");
    this.isWireframeLoc = GL.getUniformLocation(PROGRAM, "isWireframe");
}

/**
 * Setur upp nýjan buffer fyrir hlut.
 */
FG_GraphicsObject.prototype.setupBuffer = function(vertice_array, normals) {
    this.buffer = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
    GL.bufferData(GL.ARRAY_BUFFER, flatten(vertice_array), GL.STATIC_DRAW);
    if (this.type !== FG_GraphicsObject.prototype.type.WIREFRAME) {
        this.normalsBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.normalsBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, flatten(normals), GL.STATIC_DRAW);
    }   
}


/**
 * Geymir hvernig týpu hlutir af gerðinni FG_GraphicsObject mega vera.
 */
FG_GraphicsObject.prototype.type = {
    ARRAY_BUFFER: 1,
    WIREFRAME: 2,
}


/**
 * Gerir allt tilbúið til að teikna hlut.
 * Bindur buffera og stillir vertexAttributes.
 */
FG_GraphicsObject.prototype._lastPreparedObject = null;
FG_GraphicsObject.prototype.prepare = function() {
    if(FG_GraphicsObject.prototype._lastPreparedObject === this) {
        //Óþarfi að kalla á öll bindiföll aftur fyrir sama hlut.
        return;
    }
    FG_GraphicsObject.prototype._lastPreparedObject = this;

    GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer); //Binda array.
    GL.vertexAttribPointer(this.vPositionLoc, 3, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(this.vPositionLoc);

    if(this.type !== FG_GraphicsObject.prototype.type.WIREFRAME) {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.normalsBuffer); //Binda array.
        GL.vertexAttribPointer(this.vNormalLoc, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.vNormalLoc);
    }
}


/**
 * Teiknar hlut.
 * @param {mat4} transform ModelView matrix
 */
FG_GraphicsObject.prototype.draw = function(transform, owner) {
    GL.uniformMatrix4fv(this.modelViewMatrixLoc, false, flatten(transform));
    color = owner.color || this.color;
    GL.uniform4fv(this.colorLoc, flatten(color));
    GL.uniform1i(this.isWireframeLoc, this.isWireframe);
    if(this.type === FG_GraphicsObject.prototype.type.ARRAY_BUFFER) {
        GL.drawArrays(GL.TRIANGLES, 0, this.indices.length);
    } else if (this.type === FG_GraphicsObject.prototype.type.WIREFRAME) {
        GL.drawArrays(GL.LINES, 0, this.wireframe.length);
    }
}

/**
 * Setur lit hlutar.
 * @param {vec3} color RGBA.
 */
FG_GraphicsObject.prototype.setColor = function(color) {
    this.color = color;
}