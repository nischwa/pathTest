import {AxesHelper, Color, Scene} from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('black');
  scene.add(new AxesHelper(15))

  return scene;
}

export { createScene };
