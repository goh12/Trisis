
/**
 * 
 * @param {Entity} entity 
 * @param {FG_Object} fg_object
 * @param {FG_ModelNode} child 
 * @param {FG_ModelNode} sibling 
 */
function FG_GraphicsModelNode(entity, fg_object, child, sibling) {
    this.isModelNode = true;
    this.entity = entity;
    this.fg_object = fg_object;
    this.child = child;
    this.sibling = sibling;
}

/**
 *
 * @param {mat4} worldTransform samansafn of projection, lookat etc..
 * @param {mat4} displacement Færsla vegna staðsetningu hlutar í keðjunni.
 */
FG_GraphicsModelNode.prototype.traverse = function(worldTransform, displacement) {
    const transform = this.entity.getTransform();
    let mv = mult(worldTransform, displacement);
    mv = mult(mv, transform);
    if(this.child) {
        const childDisplacement = mult(displacement, this.entity.getChildDisplacement());
        this.child.traverse(worldTransform, childDisplacement);
    }
    if(this.sibling) {
        this.sibling.traverse(worldTransform, displacement);
    }

    this.fg_object.prepare();
    this.fg_object.draw(mv, this.entity);
}

/**
 * 
 * @param {FG_GraphicsModelNoe} root rótin í trénu sem á að teikna. 
 */
function FG_GraphicsModel(root) {
    if(!root.isModelNode) throw "Model root should be of type FG_ModelNode";
    this.root = root;
}

/**
 * Byrjar að ferðast í gegnum tréð.
 */
FG_GraphicsModel.prototype.traverse = function(parentTransform) {
    this.root.traverse(parentTransform, mat4());
}