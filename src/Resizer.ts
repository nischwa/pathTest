import {PerspectiveCamera, WebGLRenderer} from "three";

class Resizer {
  constructor(container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      // set the size again if a resize occurs
      this.setSize(container, camera, renderer);
      this.onResize();
    });
  }
  public onResize(): void {}

  private setSize(container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer): void {
    camera.aspect = container.clientWidth / container.clientHeight;
    // update the camera's frustum
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export { Resizer };
