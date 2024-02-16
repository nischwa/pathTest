import {AxesHelper, Color, Scene} from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('black');
  // scene.add(new AxesHelper(150))

  return scene;
}

export { createScene };
