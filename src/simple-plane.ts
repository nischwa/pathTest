import {
  Color, MathUtils,
  Mesh, MeshPhongMaterial, MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

const dsHeight = -2.5;

function createSimplePlane() {
  // create a geometry
  const width = 20;
  const height = 30;
  const textureLoader = new TextureLoader();
  const heightMap = textureLoader.load('public/pathtest2.jpg');
  const geometry = new PlaneGeometry(width, height, 32, 32);
  let material = new MeshPhysicalMaterial({
    wireframe: true,
    fog: true,
    color: new Color('green'),
    displacementMap: heightMap,
    displacementScale: -dsHeight,
    displacementBias: 2,
    flatShading: false,
  });


  // create a Mesh containing the geometry and material
  const plane = new Mesh(geometry, material);
  plane.position.y = dsHeight;
  plane.rotation.x = MathUtils.degToRad(-90);
  (plane as any).tick = (delta: number) => {
    // plane.rotation.z += delta * MathUtils.degToRad(15);
  }
  return {plane, planeDimensions: {width, height}};
}

export { createSimplePlane };
