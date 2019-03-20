function fg_unpackIndices(indices, attributes, wireframe) {
    if (!wireframe) {
        const buffer = [];
        const normals = [];
        for (let i = 0; i < indices.length; i+=3) {
            const a = attributes[indices[i]];
            const b = attributes[indices[i+1]];
            const c = attributes[indices[i+2]];
            buffer.push(a, b, c);
            
            const t1 = subtract(b, a);
            const t2 = subtract(c, a);
            let normal = cross(t1, t2);
            normal = vec3(normal);
            normals.push(normal, normal, normal);
        }

        return { buffer, normals };
    }

    const buffer = [];
    for (let i = 0; i < indices.length; i++) {
        const a = attributes[indices[i]];
        buffer.push(a);
    }

    return buffer;
}



/**
 * Getum upphafsstillt multi-dimensional array 
 * @param {} length 
 */
function createArray(length) {
    let arr = new Array(length || 0),
        i = length;
  
    if (arguments.length > 1) {
      let args = Array.prototype.slice.call(arguments, 1);
      while(i--) {
          arr[i] = createArray.apply(this, args);
      } 
    }        
    return arr;
}