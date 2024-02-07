import {
  Color,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

function createPlane(_height: number = 100, name: string = '', color: string = 'green') {
  // create a geometry
  const width: number = 45;
  console.log('PlaneWidth: ', width);
  const height: number = _height;
  let side = 64;
  const textureLoader = new TextureLoader();
  const heightMap = textureLoader.load('public/img/withN2.jpg');
  const geometry = new PlaneGeometry(width, height, side, side);
  console.log(geometry);

  let material = new MeshStandardMaterial({
    wireframe: true,
    wireframeLinewidth: 10,
    fog: true,
    color: new Color(color),
    displacementMap: heightMap,
    displacementScale: 4.5,
    flatShading: false,
    metalness: 3
  });

  // create a Mesh containing the geometry and material
  const plane = new Mesh(geometry, material);
  plane.name = name;
  plane.position.z = 0
  plane.rotation.x = MathUtils.degToRad(-90)

  return plane;
}

export { createPlane };
