import {createCamera} from "./camera.ts";
import {createScene} from "./scene.ts";
import {createRenderer} from "./renderer.ts";
import {Loop} from "./Loop.ts";
import {createControls} from "./controls.ts";
import {createLights} from "./lights.ts";
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Resizer} from "./Resizer.ts";
import {createSimplePlane} from "./simple-plane.ts";
import {PlaneAnalyser} from "./planeAnalyser.ts";
import {createSmallBall} from "./smallBall.ts";
import {pathFromSVG} from "./pathFromSVG.ts";

export class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;

  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);

    const controls = createControls(this.camera, this.renderer.domElement)

    const {mainLight, ambientLight} = createLights();



    // // Camera Path
    // const path = createPath();

    const {plane, planeDimensions} = createSimplePlane();

    // Analysis of plane properties
    const planeAnalyser = new PlaneAnalyser(plane, planeDimensions);

    this.loop.updatables.push(plane);

    // Scene Setup
    this.scene.add(mainLight, ambientLight, this.camera, plane);
    // this.scene.add(torus5);

    // @ts-ignore
    const resizer: Resizer = new Resizer(container, this.camera, this.renderer);
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  public start(): void {
    this.loop.start();
  }

  public stop(): void {
    this.loop.stop();
  }
}
