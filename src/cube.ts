import {BoxGeometry, MathUtils, Mesh, MeshStandardMaterial, TextureLoader} from 'three';

const radiansPerSecond = MathUtils.degToRad(30);

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('public/img/uv-test-bw.jpg');
  const material = new MeshStandardMaterial({
    color: 'white',
    fog: true,
    wireframe: false,
    roughness: 0.8,
    // map: texture
  });
  return material;
}

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(1.5, 1.5, 1.5);
  const material = createMaterial();

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  cube.position.z = -50;
  // this method will be called once per frame
  (cube as any).tick = (delta: number) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };
  return cube;
}

export { createCube };
