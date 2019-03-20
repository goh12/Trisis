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
