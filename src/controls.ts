import {PerspectiveCamera} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
  return new OrbitControls(camera, canvas);
}

export {createControls}
