import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({antialias: true, powerPreference: 'high-performance'});
  return renderer;
}

export { createRenderer };
