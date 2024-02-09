import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {ShapeGeometry, Vector3} from "three";

export class SVGPath {
    private svg: HTMLElement;
    private width: number;
    private height: number;
    private geometry: ShapeGeometry;
    private points: Vector3[] = [];

    constructor(svgSelector: string) {
        this.svg = document.querySelector(svgSelector)!;
        const viewBox = this.svg.getAttribute('viewBox')?.split(' ');
        this.width = Number(viewBox![2]);
        this.height = Number(viewBox![3]);
        console.log(this.width, this.height);
        this.parseSvg();
    }

    public get vectors(): Vector3[] {
        return this.points.reverse();
    }

    private parseSvg() {
        const loader = new SVGLoader();
        const data = loader.parse(this.svg.outerHTML);
        const geos: ShapeGeometry[] = [];
        console.log('Paths found: ', data.paths.length);
        // @ts-ignore
        data.paths.forEach((path) => {
            const shapes = SVGLoader.createShapes(path);
            console.log('Shapes Found', shapes.length);
            // @ts-ignore
            shapes.forEach(shape => {
                const geometry = new ShapeGeometry( shape );
                geos.push(geometry);
            })
        })
        console.log('Geometries Created', geos.length);
        this.geometry = geos[0];
        this.createVectors();
    }

    private createVectors() {
        const position = this.geometry.getAttribute('position');
        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i) - this.width / 2;
            const z = position.getY(i) - this.height / 2;
            const y = 10;
            this.points.push(new Vector3(x, y, z))
        }
    }
}