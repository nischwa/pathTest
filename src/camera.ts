import {MathUtils, PerspectiveCamera} from 'three';
import {TrackObject} from "./Loop.ts";

function createCamera() {
  const camera = new PerspectiveCamera(
    50, // fov = Field Of View
  window.innerWidth / window.innerHeight,
    0.1, // near clipping plane
    1000, // far clipping plane
  );

  // move the camera back so we can view the scene
  // camera.position.set(0,7.5,20);
  camera.position.set(0, -5, 15);
  // camera.lookAt(0,0,0);
  // camera.position.set(-67.133,39.8,-65);

  (camera as any).tick = (delta, camera, time, watchObjects) => {
    // @ts-ignore
    // const box = (watchObjects as TrackObject[]).find((it) => it.id === 'box').object
    // const velo = MathUtils.degToRad(25);
    // const radius = 45;
    // camera.position.x = radius * Math.cos(velo * time);
    // camera.position.z = radius * Math.sin(velo * time);
    // camera.lookAt(box.position);
  }

  return camera;
}

export { createCamera };
