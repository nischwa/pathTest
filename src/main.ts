import {World} from "./World.ts";

function main() {
    // Get a reference to the container element that will hold our scene
    const container = document.querySelector('#scene-container')!;

    // 1. Create an instance of the World app
    const world = new World(container);

    // start the animation loop
    window.addEventListener('click', () => {
        // world.start();
    })

    world.start();

}
main()