import {
    BoxGeometry,
    BufferGeometry, CatmullRomCurve3,
    Line,
    LineBasicMaterial,
    Mesh,
    PlaneGeometry, ShapeGeometry,
    Vector3
} from "three";
import {createSmallBall} from "./smallBall.ts";
import {pathFromSVG} from "./pathFromSVG.ts";
import {createSmallbox} from "./smallBox.ts";

interface Dimensions {
    width: number,
    height: number
}

export class PlaneAnalyser {
    private plane: Mesh<PlaneGeometry>;
    private points: Vector3[] = [];
    private geometries: ShapeGeometry[];
    private pathDimensions: Dimensions;
    private planeDimensions: Dimensions;
    private cameraPath: CatmullRomCurve3;
    private box: Mesh<BoxGeometry>;
    private timeElapsed: number = 0;


    constructor(plane: Mesh<PlaneGeometry>, planeDimensions: Dimensions) {
        this.plane = plane;
        this.planeDimensions = planeDimensions;
        const {geometries, dimensions} = pathFromSVG();
        this.geometries = geometries;
        this.pathDimensions = dimensions;

        this.createCurveVectors();

        // Test the positioning
        this.box = createSmallbox();
        this.plane.add(this.box)
        const {x, y, z} = this.getBoxPosition();
        this.box.position.set(x, y, z);
    }

    public tick(delta: number) {
        const div = 5;
        const t = (this.timeElapsed % div) / div;
        // positioning of the box
        const currPosition = this.cameraPath.getPointAt(t);
        this.box.position.copy(currPosition);
        // orientation of the box
        const tangent = this.cameraPath.getTangentAt(t).normalize();
        this.box.lookAt(currPosition.clone().add(tangent))
        // (this.box as any).updateBall(tangent);
        // this.box.lookAt(tangent);
        this.timeElapsed += delta;
    }

    public getBoxPosition() {
        const t = (this.timeElapsed % 5) / 5;
        return this.cameraPath.getPointAt(t);
    }

    private createCurveVectors() {
        const pos = this.geometries[0].getAttribute('position');
        const count = pos.count;
        for (let i = 0; i <count; i++) {
            const {x, y} = this.getVectorWithDimensionOffset(pos.getX(i), pos.getY(i))
            const z = 3.5;
            this.points.push(new Vector3(x,y,z));
            // this.addPointer(x,y,z)

        }
        this.renderLine();
    }

    private getVectorWithDimensionOffset(x: number, y: number): {x: number, y: number} {
        const scaleX = this.pathDimensions.width / this.planeDimensions.width;
        const scaleY = this.pathDimensions.height / this.planeDimensions.height;
        const offsetX = this.planeDimensions.width / 2;
        const offsetY = this.planeDimensions.height / 2;
        const vx = x / scaleX - offsetX;
        const vy = y / scaleY - offsetY;
        return {
            x: vx, y: vy
        }
    }

    private renderLine() {
        this.cameraPath = new CatmullRomCurve3(this.points, false);
        //create a blue LineBasicMaterial
        const material = new LineBasicMaterial( { color: 0xff0000 } );
        const geometry = new BufferGeometry().setFromPoints( this.cameraPath.getPoints(100) );
        const line = new Line( geometry, material );
        this.plane.add(line);
    }

    private addPointer(x: number = 0, y: number = 0, z: number = 0) {
        const ball = createSmallBall();
        ball.position.set(x,y,z);
        this.plane.add(ball);
    }
}
