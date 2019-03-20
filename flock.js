let ALIGN_SCALE = 1;
let COHESION_SCALE = 1;
let SEPERATION_SCALE = 1.3;

function Flock() {
    const fishs = [];
    const MAX_FISH = 30;
    const FISH_SPEED = 0.4; 
    const MAX_FORCE = 0.02;
    const RAD_TO_DEG = 180 / Math.PI;

    const randPos = function(){ return -40 + 80*Math.random() };
    const randColor = function() {return vec4(Math.random(), Math.random(), Math.random(), 1.0)}


    for (let i = 0; i < MAX_FISH; i++) {
        fishs.push(BuildFishModel(vec3(randPos(), randPos(), randPos()), randColor(), randColor()));
    }

    function limit(vel, lim) {
        const l = length(vel);
        if(l > lim) {
            if(l === 0) return vec3(0, 0, 0);
            return scale(lim, normalize(vel));
        }
        return vel;
    }

    /**
     * Uppfærir alla fiska. 
     */
    function updateAll() {
        for (let i = 0; i < MAX_FISH; i++) {
            const f = fishs[i];
            let acceleration = scale(ALIGN_SCALE, align(f));
            acceleration = add(acceleration, scale(COHESION_SCALE, cohesion(f)));
            acceleration = add(acceleration, scale(SEPERATION_SCALE, seperation(f)));

            if(length(acceleration) !== 0) {
                let finalVel = limit(add(f.velocity, limit(acceleration)), 1);
                f.velocity = finalVel;
                entity = f.rootEntity;
                entity.position = add(entity.position, scale(FISH_SPEED, finalVel));

                entity.rotationMatrix = calculateRotation(vec3(1, 0, 0), finalVel);
            }
            f.update();
        }
    }

    /**
     * Finnur snúningsfylki fyrir fisk. Á að snúa í sömu átt
     * og hraðavigur.
     * @param {vec} u 
     * @param {vec} v 
     */
    function calculateRotation(u, v) {
        const angle = Math.acos(dot(u, v) / (length(u) * length(v)));
        const rotationMatrix = rotate(angle * RAD_TO_DEG, cross(u, v));

        return rotationMatrix;
    }

    /**
     * Teiknar alla fiska
     * @param {mat4} modelView 
     */
    function drawAll(modelView) {
        for (let i = 0; i < MAX_FISH; i++) {
            fishs[i].draw(modelView);
        }
    }

    /**
     * Finnur fjarlægð milli allra fiska
     * @param {} a 
     * @param {*} b 
     */
    function distanceBetween(a, b) {
        return length(subtract(a.rootEntity.position, b.rootEntity.position));
    }


    /*
     * Flock behaviour föll
     */
    function align(fish) {
        let result = vec3(0, 0, 0);
        let fishCount = 0;
        for (let i = 0; i < fishs.length; i++) {
            const nb = fishs[i];
            if (fish !== nb) {
                if(distanceBetween(fish, nb) < 100) { //BREYTA FJARLÆGÐ?
                    result = add(result, nb.velocity);
                    fishCount++;
                }
            }
        }
        if(fishCount === 0 || length(result) === 0) return vec3(0, 0, 0);
        return limit(scale(1/fishCount, vec3(result[0], result[1]*0.9, result[2])), MAX_FORCE);
    }

    
    function cohesion(fish) {
        let result = vec3(0, 0, 0);
        let fishCount = 0;
        for (let i = 0; i < fishs.length; i++) {
            const nb = fishs[i];
            if (fish !== nb) {  
                if(distanceBetween(fish, nb) < 200) { //BREYTA FJARLÆGÐ?
                    result = add(result, nb.rootEntity.position);
                    fishCount++;
                }
            }
        }
        result = scale(1/fishCount, result);
        result = subtract(result, fish.rootEntity.position);
        if(fishCount === 0 || length(result) === 0) return vec3(0, 0, 0);
        return limit(result, MAX_FORCE);
    }

    function seperation(fish) {
        let result = vec3(0, 0, 0);
        let fishCount = 0;
        for (let i = 0; i < fishs.length; i++) {
            const nb = fishs[i];
            if (fish !== nb) {
                if(distanceBetween(fish, nb) < 50) { //BREYTA FJARLÆGÐ?
                    const between = subtract(fish.rootEntity.position, nb.rootEntity.position);
                    result = add(result, between);
                    fishCount++;
                }
            }
        }


        if(fishCount === 0 || length(result) === 0) return vec3(0, 0, 0);
        return limit(scale(1/fishCount, result), MAX_FORCE);
    }

    return {
        updateAll,
        drawAll,
    }
}