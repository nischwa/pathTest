import {BoxGeometry, Mesh, MeshBasicMaterial, Vector3} from "three";
import {createSmallBall} from "./smallBall.ts";

export function createSmallbox() {
    const scale = 2;
    const geometry = new BoxGeometry( 1.5 * scale, 1.5 * scale, 2 * scale);
    const material = new MeshBasicMaterial( {color: 0x03d7fc, wireframe: true} );
    const box = new Mesh(geometry, material);
    const smallBall = createSmallBall();
    smallBall.position.z = -25
    box.add(smallBall);
    //
    // (box as any).updateBall = (v: Vector3) => {
    //     box.children[0].position.copy(v);
    // }

    return box;
}