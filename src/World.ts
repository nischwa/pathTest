import {createCamera} from "./camera.ts";
import {createScene} from "./scene.ts";
import {createRenderer} from "./renderer.ts";
import {Loop} from "./Loop.ts";
import {createControls} from "./controls.ts";
import {createLights} from "./lights.ts";
import {
  BufferGeometry,
  CatmullRomCurve3,
  GridHelper, Line,
  LineBasicMaterial, MathUtils,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';
import {Resizer} from "./Resizer.ts";
import {createSmallbox} from "./smallBox.ts";
import {SVGPath} from "./SVGPath.ts";
import {createSmallBall} from "./smallBall.ts";
import {createSimplePlane} from "./simple-plane.ts";

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
    const gridHelper = new GridHelper( 20000, 1000 );
    const svgPath = new SVGPath('#js-test');
    svgPath.vectors.forEach((vec) => {
      console.log(vec);
      const ball = createSmallBall();
      ball.position.copy(vec);
      // this.scene.add(ball);
    })

    // console.log(svgPath.vectors);

    const {mainLight, ambientLight} = createLights();


    // test the path
    const path = new CatmullRomCurve3([...svgPath.vectors], false);
    const pathGeo = new BufferGeometry().setFromPoints(path.getPoints(75));
    const pathMat = new LineBasicMaterial({color: 'red'});
    const pathObj = new Line(pathGeo, pathMat);

    const box = createSmallbox();

    // Init box
    const pos = path.getPointAt(1);
    const tangent = path.getTangentAt(1).normalize();
    box.position.copy(pos);
    box.lookAt(pos.clone().add(tangent));

    // box.add(this.camera);
    (box as any).tick = (delta, camera, time)=> {
      const speed = 25
      const t = 1 - (time % speed) / speed;
      const pos = path.getPointAt(t);
      const tangent = path.getTangentAt(t).normalize();
      box.position.copy(pos);
      box.lookAt(pos.clone().add(tangent));
    }

    box.add(this.camera);



    // // Camera Path
    // const path = createPath();

    const {plane} = createSimplePlane();

    // Analysis of plane properties
    // const planeAnalyser = new PlaneAnalyser(plane, planeDimensions);
    this.loop.watchObjects.push({object: box, id: 'box'})
    this.loop.updatables.push(box);
    this.loop.updatables.push(this.camera);
    // this.loop.updatables.push(planeAnalyser);

    // Scene Setup
    this.scene.add(mainLight, ambientLight);
    this.scene.add(box);
    this.scene.add(pathObj);
    this.scene.add(plane);
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
