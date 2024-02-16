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
  LineBasicMaterial, MathUtils, Mesh,
  PerspectiveCamera,
  Scene, Vector3,
  WebGLRenderer
} from 'three';
import {Resizer} from "./Resizer.ts";
import {createSmallbox} from "./smallBox.ts";
import {SVGPath} from "./SVGPath.ts";
import {createSmallBall} from "./smallBall.ts";
import {createSimplePlane} from "./simple-plane.ts";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {SVGGroup} from "./SVGGroup.ts";
import {createTorus} from "./torus.ts";

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
    const gridHelper = new GridHelper( 20000, 250, 'green', 'orange' );
    const flightPath = new SVGPath('#js-flight-curve');
    const heightPath = new SVGPath('#js-height-curve');
    const heightPathVectors = heightPath.vectors.map((vec) => {
      const {x,y,z} = vec;
      return new Vector3(0, ((x-20) * - 1), z)
    })


    // heightPathVectors.forEach((vec) => {
    //   // console.log(vec);
    //   const ball = createSmallBall();
    //   ball.position.copy(vec);
    //   this.scene.add(ball);
    // })

    // console.log(flightPath.vectors);

    const {mainLight, ambientLight} = createLights();


    // test the flight path
    const path = new CatmullRomCurve3([...flightPath.vectors], false);
    const pathGeo = new BufferGeometry().setFromPoints(path.getPoints(75));
    const pathMat = new LineBasicMaterial({color: 'red'});
    const pathObj = new Line(pathGeo, pathMat);
    // test the height path
    const heightPathCurve = new CatmullRomCurve3(heightPathVectors, false);
    const heightPathCurveGeo = new BufferGeometry().setFromPoints(heightPathCurve.getPoints(75));
    const heightPathCurveMat = new LineBasicMaterial({color: 'green'});
    const heightPathCurveObj = new Line(heightPathCurveGeo, heightPathCurveMat);


    // Camera Trolley
    const box = createSmallbox();

    // Init box
    const pos = path.getPointAt(1);
    const tangent = path.getTangentAt(1).normalize();
    box.position.copy(pos);
    box.lookAt(pos.clone().add(tangent));

    // box.add(this.camera);
    (box as any).tick = (delta, camera, time)=> {
      const speed = 250
      // const t = 1 - (time % speed) / speed;
      // const pathPos = path.getPointAt(t);
      // const heightPos = heightPathCurve.getPointAt(t);
      // const pos = new Vector3(pathPos.x, heightPos.y, pathPos.z);
      // const tangent = path.getTangentAt(t).normalize();
      box.position.z -= delta * speed;
      // box.lookAt(pos.clone().add(tangent));
    }
    box.position.z = 300;
    box.rotation.y = MathUtils.degToRad(180)
    box.add(this.camera);

    // Test Text...
    const niklasObj = new SVGGroup('#js-promo-niklas');
    const niklas = niklasObj.svgGroup;
    const noise = new SVGGroup('#js-promo-noise').svgGroup;
    const ep = new SVGGroup('#js-promo-ep').svgGroup;
    const out = new SVGGroup('#js-promo-out-on').svgGroup;
    const date = new SVGGroup('#js-promo-date').svgGroup;
    const distance = -1100;
    const startingOffset = 500;
    niklas.position.z = distance;
    noise.position.z = distance * 2;
    ep.position.z = distance * 3;
    out.position.z = distance * 4;
    date.position.z = distance * 5 - 500;
    this.scene.add(box);
    this.scene.add(niklas);
    this.scene.add(noise);
    this.scene.add(ep);
    this.scene.add(out);
    this.scene.add(date);

    // More Objects
    const torus = createTorus();
    this.scene.add(torus);
    this.loop.updatables.push(torus);



    // // Camera Path
    // const path = createPath();

    const {plane} = createSimplePlane();

    // Analysis of plane properties
    // const planeAnalyser = new PlaneAnalyser(plane, planeDimensions);
    this.loop.watchObjects.push({object: box, id: 'box'})
    this.loop.updatables.push(box);
    this.loop.updatables.push(niklasObj);
    // this.loop.updatables.push(this.camera);

    // Scene Setup
    this.scene.add(mainLight, ambientLight);

    // this.scene.add(pathObj);
    // this.scene.add(heightPathCurveObj);
    // this.scene.add(plane);
    this.scene.add(gridHelper);

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
