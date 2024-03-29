import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";

export function createSmallBall() {
    const geometry = new SphereGeometry( 3.5, 8, 8 );
    const material = new MeshBasicMaterial( { color: 0xffff00 } );
    const ball = new Mesh( geometry, material );
    return ball;
}