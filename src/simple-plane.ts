import {
  Color, MathUtils,
  Mesh, MeshPhongMaterial, MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

const dsHeight = -50;

function createSimplePlane() {
  // create a geometry
  const width = 200;
  const height = 1080;
  const textureLoader = new TextureLoader();
  const heightMap = textureLoader.load('public/loang-canyon_b.jpg');
  const geometry = new PlaneGeometry(width, height, 128, 128);
  let material = new MeshPhysicalMaterial({
    wireframe: true,
    fog: true,
    color: new Color('green'),
    displacementMap: heightMap,
    displacementScale: -dsHeight,
    displacementBias: -dsHeight / 2,
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
