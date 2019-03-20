function BuildFishModel(pos = vec3(0, 0, 0), color, color2) {
    //Entity hlutir halda utan um hegðun fyrir hvern hlut
    //ásamt stöðu, lit, snúning etc.
    const fishScale = 0.5;
    const finTheta = Math.floor(Math.random() * 360);
    const BOUND = 100;
    
    const tail = _fishModel_MakeTail(fishScale, color2, finTheta);
    const rightFin = _fishModel_MakeRightFin(fishScale, color2, finTheta);
    const leftFin = _fishModel_MakeLeftFin(fishScale, color2, finTheta);
    const body = new FG_Entity(pos, vec3(fishScale*10, fishScale*10, fishScale*10)); {
        body.color = color;
        body.updateSelf = function() {  //Passar að vera innan ákveðinna marka.
            if(this.position[0] > BOUND) {
                this.position = vec3(-(BOUND - 1), this.position[1], this.position[2]);
            } else if (this.position[0] < -BOUND) {
                this.position = vec3((BOUND - 1), this.position[1], this.position[2]);
            }
            
            if(this.position[1] > BOUND) {
                this.position = vec3(this.position[0], -(BOUND - 1), this.position[2]);
            } else if (this.position[1] < -BOUND) {
                this.position = vec3(this.position[0], (BOUND - 1), this.position[2]);
            }

            if(this.position[2] > BOUND) {
                this.position = vec3(this.position[0], this.position[1], -(BOUND - 1));
            } else if (this.position[2] < -BOUND) {
                this.position = vec3(this.position[0], this.position[1], (BOUND - 1));
            }
        }
    }
    const eye = new FG_Entity(vec3(fishScale*10, fishScale*2, 0), vec3(fishScale*2, fishScale*2, fishScale*3)); {
        eye.color = vec4(0, 0, 0, 1.0);
    }

    //Grafískir hlutir sem eru teiknaðir
    const g_fin = new G_Fin();
    const g_body = new G_FishBody(FG_GraphicsObject.prototype.type.ARRAY_BUFFER);
    const g_eye = new G_Quad(FG_GraphicsObject.prototype.type.ARRAY_BUFFER);

    //Búa til nodes fyrir grafískt módel notaðar fyrir traverse.
    const rightFin_node = new FG_GraphicsModelNode(rightFin, g_fin, null, null);
    const leftFin_node = new FG_GraphicsModelNode(leftFin, g_fin, null, rightFin_node);
    const eye_node = new FG_GraphicsModelNode(eye, g_eye, null, leftFin_node);
    const tail_node = new FG_GraphicsModelNode(tail, g_fin, null, eye_node);
    const body_node = new FG_GraphicsModelNode(body, g_body, tail_node, null);

    const graphicsModel = new FG_GraphicsModel(body_node); //Búa til grafískt módel
    const model = new FG_EntityModel([body, tail, eye, leftFin, rightFin], graphicsModel, body); //Búa til entity módel
    model.velocity = vec3(0, 0, 0);
    
    return model;
}

//Fall fyrir hreyfingu ugga.
function _finMovement() {
    const yRotation = this.yRotation + this.sinPrefix * 20*Math.sin(this.theta);
    this.updateRotation(true, yRotation, true);
    this.theta += 0.1;
}

//Býr til entity hlut fyrir sporð.
function _fishModel_MakeTail(fishScale, color, finTheta) {
    const fin = new FG_Entity(scale(fishScale, vec3(-10, 0, 0)), scale(fishScale, vec3(10, 10, 10)));
    fin.color = color;
    fin.theta = finTheta; fin.yRotation = 0; fin.sinPrefix = 1;
    fin.updateSelf = _finMovement;

    return fin;
}

function _fishModel_MakeLeftFin(fishScale, color, finTheta) {
    const fin2 = new FG_Entity(
        scale(fishScale, vec3(2, -4.5, -2.5)), 
        scale(fishScale, vec3(5, 5, 5)),
        vec3(0, 90, 0)
    );
    fin2.setAnchor(vec3(1.0, 1.0, 0.0));
    fin2.theta = finTheta; fin2.yRotation = 140; fin2.sinPrefix = 1;
    fin2.color = color;
    fin2.updateSelf = _finMovement;

    return fin2;
}

function _fishModel_MakeRightFin(fishScale, color, finTheta) {
    const fin3 = new FG_Entity(
        scale(fishScale, vec3(2, -4.5, 2.5)), 
        scale(fishScale, vec3(5, 5, 5)),
        vec3(0, 270, 0)
    );
    fin3.setAnchor(vec3(1.0, 1.0, 0.0));
    fin3.theta = finTheta; fin3.yRotation = 220; fin3.sinPrefix = -1;
    fin3.color = color;
    fin3.updateSelf = _finMovement;

    return fin3;
}
