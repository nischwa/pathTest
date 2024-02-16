import {World} from "./World.ts";
import {Recorder} from "./Recorder.ts";

function main() {
    // Get a reference to the container element that will hold our scene
    const container = document.querySelector('#scene-container')!;



    // 1. Create an instance of the World app
    const world = new World(container);
    const canvas = container.querySelector('canvas')!;
    // const recorder = new Recorder(canvas);

    // start the animation loop
    // window.addEventListener('keyup', (evt) => {
    //     if (evt.key !== 'r') return;
    //     if (!recorder.isRecording) {
    //         recorder.record();
    //     } else {
    //         recorder.stop();
    //     }
    //     // world.start();
    // })

    world.start();

}
main()