import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {Group, Mesh, MeshBasicMaterial, ShapeGeometry} from "three";

const svg = document.querySelector('svg')!.outerHTML;

export function pathFromSVG() {
    const group = new Group();
    const material = new MeshBasicMaterial({
        color: 'red',
        wireframe: true,
    });
    const loader = new SVGLoader();
    const data = loader.parse(svg);
    data.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach(shape => {
            const geometry = new ShapeGeometry( shape );
            console.log('geometry', geometry);
            const mesh = new Mesh(geometry,material);
            group.add(mesh);
        })
    })

    return group;
}