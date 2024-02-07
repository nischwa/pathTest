import {
    BufferGeometry,
    Group,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshStandardMaterial, Object3DEventMap,
    PlaneGeometry,
    Vector3
} from "three";
import {createSmallBall} from "./smallBall.ts";
import {pathFromSVG} from "./pathFromSVG.ts";

export class PlaneAnalyser {
    private plane: Mesh<PlaneGeometry>;
    private points: Vector3[] = [];
    private path: Mesh;
    constructor(plane: Mesh<PlaneGeometry>) {
        this.plane = plane;
        this.path = pathFromSVG().children[0] as Mesh;
        console.log(this.path.geometry.getAttribute('position'))
        this.analyse();
    }

    private analyse() {
        const pos = this.path.geometry.getAttribute('position');
        // let vertices = this.plane.geometry.getAttribute('position').array;
        const count = pos.count;
        for (let i = 0; i <count; i++) {
            const x = pos.getX(i) / 10 - 10;
            const y = pos.getY(i) / 10 - 15;
            const z = 3.5;
            console.log(x,y,z);
            this.points.push(new Vector3(x,y,z));
            this.addPointer(x,y,z)

        }
        console.log(this.plane);
        this.renderLine();
    }

    private renderLine() {
        //create a blue LineBasicMaterial
        const material = new LineBasicMaterial( { color: 0xff0000 } );
        const geometry = new BufferGeometry().setFromPoints( this.points );
        const line = new Line( geometry, material );
        this.plane.add(line);
    }

    private addPointer(x: number = 0, y: number = 0, z: number = 0) {
        const ball = createSmallBall();
        ball.position.set(x,y,z);
        this.plane.add(ball);
    }
}