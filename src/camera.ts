import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    40, // fov = Field Of View
  window.innerWidth / window.innerHeight,
    0.1, // near clipping plane
    50, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(20,17.5,23);
  // camera.position.set(-2,4.5,-200);
  return camera;
}

export { createCamera };
