// @ts-ignore
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import { ShapeGeometry, Vector3} from "three";

const svg = document.querySelector('svg')!;
const viewBox = svg.getAttribute('viewBox')?.split(' ');
const width = Number(viewBox![2]);
const height = Number(viewBox![3]);
console.log({width, height});

export interface SvgPathInfo {
    geometries: ShapeGeometry[],
    dimensions: {
        width: number,
        height: number
    }
}

export function pathFromSVG(): SvgPathInfo {
    const geometries: ShapeGeometry[] = [];

    const loader = new SVGLoader();
    const data = loader.parse(svg.outerHTML);
    // @ts-ignore
    data.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        // @ts-ignore
        shapes.forEach(shape => {
            const geometry = new ShapeGeometry( shape );
            geometries.push(geometry);
        })
    })

    const pos = geometries[0].getAttribute('position');

    return {geometries, dimensions: {width, height}};
}
