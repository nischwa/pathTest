import {
    BufferGeometry,
    Line,
    LineBasicMaterial,
    Mesh,
    PlaneGeometry, QuadraticBezierCurve, QuadraticBezierCurve3, ShapeGeometry,
    Vector3
} from "three";
import {createSmallBall} from "./smallBall.ts";
import {pathFromSVG} from "./pathFromSVG.ts";

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

    constructor(plane: Mesh<PlaneGeometry>, planeDimensions: Dimensions) {
        this.plane = plane;
        this.planeDimensions = planeDimensions;
        const {geometries, dimensions} = pathFromSVG();
        this.geometries = geometries;
        this.pathDimensions = dimensions;
        this.createCurveVectors();
    }

    private createCurveVectors() {
        const pos = this.geometries[0].getAttribute('position');
        const count = pos.count;
        for (let i = 0; i <count; i++) {
            const {x, y} = this.getVectorWithDimensionOffset(pos.getX(i), pos.getY(i))
            const z = 3.5;
            this.points.push(new Vector3(x,y,z));
            this.addPointer(x,y,z)

        }
        this.renderLine();
    }

    private getVectorWithDimensionOffset(x, y): {x, y} {
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
        const curve = new QuadraticBezierCurve3()
        curve.a
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
