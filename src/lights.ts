import {AmbientLight, DirectionalLight, HemisphereLight, SpotLight, Vector3} from 'three';

function createLights() {
  // const ambientLight = new AmbientLight('white', 1);
  const ambientLight = new HemisphereLight('white', 'darkslategrey', 0.5);
  const mainLight = new DirectionalLight('blanchedalmond', 6);
  // const mainLight = new SpotLight('blanchedalmond', 15);
  mainLight.position.set(5, 5, 10);
  mainLight.lookAt(new Vector3(5,5,-10))
  return {ambientLight, mainLight};
}

export { createLights };
