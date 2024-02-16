import {
    Color,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    TorusGeometry,
    WireframeGeometry,
} from "three";
import {randomColor} from "./colors.ts";
import {TrackObject} from "./Loop.ts";

export function createTorus() {

    const geometry = new TorusGeometry(
        MathUtils.randFloat(50, 100),
        MathUtils.randFloat(25, 50),
        32,
        32 );

    const color = new Color(randomColor());
    const wireframe = new WireframeGeometry(geometry);

    // const material = new LineBasicMaterial( {
    //     color,
    //     fog: true,
    // } );

    const material = new MeshStandardMaterial({
        wireframe: true,
        fog: true,
        color,
        flatShading: false,
    });
    const torus = new Mesh( geometry, material );
    // const torus = new LineSegments(wireframe, material);
    const velocity = 2

    torus.rotation.x = MathUtils.degToRad(90);
    torus.position.x = MathUtils.randFloat(-500, 500);
    torus.position.z = 0
    torus.position.y = MathUtils.randInt(200, 400);

    (torus as any).tick = (delta, camera, time, watchObjects) => {
        // @ts-ignore
        const box = (watchObjects as TrackObject[]).find((it) => it.id === 'box').object

        torus.rotation.z += delta * MathUtils.degToRad(30);
        torus.position.z += delta * -400;
        if (torus.position.z < box.position.z - 1100) {
            torus.position.z = box.position.z;
            torus.position.x = MathUtils.randFloat(-500, 500);
            torus.position.y = MathUtils.randInt(200, 400);

            torus.material.color = new Color(randomColor());
        }
        // torus.rotation.x += delta * MathUtils.degToRad(MathUtils.randInt(0, 45));
    }

    return torus;
}
