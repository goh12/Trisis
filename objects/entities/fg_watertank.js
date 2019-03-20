function BuildWaterTank() {
    const SCALE = 200;
    const wireframe = new FG_Entity(vec3(0,0,0), vec3(SCALE, SCALE, SCALE));
    wireframe.color = vec4(1.0, 1.0, 0, 1.0);

 
    const g_wireframe = new G_Quad(FG_GraphicsObject.prototype.type.WIREFRAME);

    const wireframeNode = new FG_GraphicsModelNode(wireframe, g_wireframe, null, null);

    const graphicsModel = new FG_GraphicsModel(wireframeNode);
    const model = new FG_EntityModel([wireframe], graphicsModel);

    return model;
}
