function fg_buildTestModel() {
    const normalQuad = new G_Quad(FG_GraphicsObject.prototype.type.WIREFRAME);
    normalQuad.useColorAttribute();

    const Eye1 = new FG_Entity(vec3(-5, 5, -15), vec3(5, 5, 5), vec3(0, 90, 0));
    const Eye2 = new FG_Entity(vec3(5, 5, -15), vec3(5, 5, 5), vec3(0, 90, 0));
    const Mouth = new FG_Entity(vec3(0, -10, -15), vec3(5, 5, 15), vec3(0, 90, 0));

    const Head = new FG_Entity(vec3(0, 20, 0), vec3(30, 30, 30), vec3(0, 180, 0));
    Head.updateSelf = function() {
        this.theta += 0.1;
        this.rotationMatrix = mult(mult(rotateX(0), rotateY(this.rotation[1])), rotateZ(Math.sin(this.theta) * 10));
        this.transform = mult(mult(translate(this.position), this.rotationMatrix), scalem(this.scale));
    }

    const update = function() {
        this.theta += 0.1;
        this.rotationMatrix = mult(mult(rotateX(this.rotation[0]), rotateY(this.rotation[1])), rotateZ(Math.sin(this.theta) * 10));
        this.transform = mult(mult(translate(this.position), this.rotationMatrix), scalem(this.scale));
    };
    const neckPiece = new FG_Entity(vec3(0, 25, 0), vec3(10, 10, 10));
    neckPiece.theta = 0;
    neckPiece.updateSelf = update;
    const neckPiece2 = new FG_Entity(vec3(0, 10, 0), vec3(10, 10, 10));
    neckPiece2.theta = 0;
    neckPiece2.updateSelf = update;
    const neckPiece3 = new FG_Entity(vec3(0, 10, 0), vec3(10, 10, 10));
    neckPiece3.theta = 0;
    neckPiece3.updateSelf = update;
    const neckPiece4 = new FG_Entity(vec3(0, 10, 0), vec3(10, 10, 10));
    neckPiece4.theta = 0;
    neckPiece4.updateSelf = update; 
    const Bottom = new FG_Entity(vec3(0.0, -30.0, 0.0), vec3(40, 40, 40), vec3(0, 0, 0));

    
    let mouthNode = new FG_GraphicsModelNode(Mouth, normalQuad, null, null);
    let eye2Node = new FG_GraphicsModelNode(Eye2, normalQuad, null, mouthNode);
    let eye1Node = new FG_GraphicsModelNode(Eye1, normalQuad, null, eye2Node);
    let headNode = new FG_GraphicsModelNode(Head, normalQuad, eye1Node, null);
    let neckPiece4Node = new FG_GraphicsModelNode(neckPiece2, normalQuad, headNode, null);
    let neckPiece3Node = new FG_GraphicsModelNode(neckPiece2, normalQuad, neckPiece4Node, null);
    let neckPiece2Node = new FG_GraphicsModelNode(neckPiece2, normalQuad, neckPiece3Node, null);
    let neckPieceNode = new FG_GraphicsModelNode(neckPiece, normalQuad, neckPiece2Node, null);
    let bottomNode = new FG_GraphicsModelNode(Bottom, normalQuad, neckPieceNode, null);
    const graphicsmodel = new FG_GraphicsModel(bottomNode);

    const model = new FG_EntityModel([Bottom, neckPiece, neckPiece2, neckPiece3, neckPiece4], graphicsmodel);
    return model;
}
