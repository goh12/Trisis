/**
 * FG_Entity geymir upplýsingar um einn hlut. T.d. gæti hlutur verið
 * einhver kassi. Entity heldur þá utan um snúning, skala og staðsetningu fyrir
 * þann hlut.
 * @param {vec3} pos position
 * @param {vec3} scale skali
 * @param {vec3} rot rotation 
 */
function FG_Entity(pos = vec3(0, 0, 0), scale = vec3(1, 1, 1), rot = vec3(0, 0, 0)) 
{
    this.position = pos;
    this.scale = scale;
    this.rotation = rot;
    this.anchor = vec3(0.0, 0.0, 0.0, 0.0); //Skilgreinir "origin" hlutar.

    let rotationMatrix = mult(rotateX(rot[0]), rotateY(rot[1]));
    rotationMatrix = mult(rotationMatrix, rotateZ(rot[2]));

    this.rotationMatrix = mult(mult(rotateX(rot[0]), rotateY(rot[1])), rotateZ(rot[2]));
}

/**
 * uppfæra this entity og öll tengd entities
 */
FG_Entity.prototype.update = function() {
    if(this.updateSelf) this.updateSelf();
}

/**
 * Skilar transform fyrir entity
 */
FG_Entity.prototype.getTransform = function() {
    let transform = mult(translate(this.position), this.rotationMatrix);
    transform = mult(transform, scalem(this.scale));
    return mult(transform, translate(this.anchor));
}

/**
 * Uppfærir snúning á entity. Ef parameter er true
 * er snúningur um þann ás sá sami og áður.
 * @param {true|float} x x rotation
 * @param {true|float} y y rotation
 * @param {true|float} z z rotation
 */
FG_Entity.prototype.updateRotation = function(x, y, z) {
    xRot = x === true ? this.rotation[0] : x;
    yRot = y === true ? this.rotation[1] : y;
    zRot = z === true ? this.rotation[2] : z;

    this.rotationMatrix = mult(mult(rotateX(xRot), rotateY(yRot)), rotateZ(zRot));
    this.rotation = vec3(xRot, yRot, zRot);
}

/**
 * Skilar færslunni sem ætti að eiga sér stað fyrir hluti tengda
 * þessum hlut. T.d. ef hlutur er hönd, þá þyrfti að kalla
 * á þetta fall fyrir fingurna til að vita hversu langt á að
 * færa þá miðað við hvar höndin er staðsett.
 */
FG_Entity.prototype.getChildDisplacement = function() {
    return mult(translate(this.position), this.rotationMatrix);
}

/**
 * Setur anchor
 */
FG_Entity.prototype.setAnchor = function(pos) {
    this.anchor = pos;
}



/**
 * Módel inniheldur lista af entities sem tilheyra sama módeli
 * t.d. módel: líkami, entities: limir
 * Það inniheldur líka FG_GraphicsModel sem teiknað er fyrir hlutinn.
 * @param {List<FG_Entity>} entityList 
 * @param {FG_GraphicsModel} modelTree
 * @param {FG_Entity} parentEntity //rótin í stigveldismódeli. (Entity, ekki GraphicsObject)
 */
function FG_EntityModel(entityList, modelTree, rootEntity) {
    this.rootEntity = rootEntity;
    this.entityList = entityList;
    this.modelTree = modelTree;
}

/**
 * Uppfærir öll Entity í módeli.
 */
FG_EntityModel.prototype.update = function() {
    for (let i = 0; i < this.entityList.length; i++) {
        this.entityList[i].update();
    }
}


FG_EntityModel.prototype.draw = function(mv) {
    this.modelTree.traverse(mv);
}

