import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {DoubleSide, Group, MathUtils, Mesh, MeshBasicMaterial, ShapeGeometry, Vector3} from "three";

export class SVGGroup {
    private svg: HTMLElement;
    private width: number;
    private height: number;
    private geometry: ShapeGeometry;
    private points: Vector3[] = [];
    private material: MeshBasicMaterial;
    private group: Group;

    constructor(svgSelector: string) {
        console.log('- - - - - -');
        console.log('Creating Path for: ', svgSelector);
        this.svg = document.querySelector(svgSelector)!;
        const viewBox = this.svg.getAttribute('viewBox')?.split(' ');
        this.width = Number(viewBox![2]);
        this.height = Number(viewBox![3]);
        console.log(this.width, this.height);
        this.material = new MeshBasicMaterial({side: DoubleSide, color: 'orange', wireframe: false})
        this.group = new Group();
        this.group.rotateX(MathUtils.degToRad(180));
        this.svgGroup.position.set(-0.5 * this.width, this.height, 0);
        this.parseSvg();
    }

    public tick(delta) {
        // this.group.rotation.y += delta * 0.5;
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
                const mesh = new Mesh(geometry, this.material);
                this.group.add(mesh);
            })
        })
        console.log('Geometries Created', this.group.children.length);
        // this.geometry = geos[0];
        // this.createVectors();
    }

    public get svgGroup(): Group {
        this.group.position.y = 150;
        return this.group;
    }

    private createVectors() {
        const position = this.geometry.getAttribute('position');
        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i) - this.width / 2;
            const z = position.getY(i) - this.height / 2;
            const y = 15;
            this.points.push(new Vector3(x, y, z))
        }
    }
}