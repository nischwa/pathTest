import {Clock, PerspectiveCamera, Scene, WebGLRenderer} from "three";
const frameRateWindow = document.querySelector('#js-framerate');
const cam = document.querySelector('#js-camera')!;

class Loop {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  public updatables: any[] = [];
  private clock: Clock;

  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.clock = new Clock();
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  private tick() {
    const delta = this.clock.getDelta();
    const {x, y, z} = this.camera.position;
    cam.innerHTML = `Cam: x: ${x}, y: ${y}, z: ${z}`;
    for (const obj of this.updatables) {
      obj.tick(delta, this.camera);
    }
  }
}

export { Loop };
