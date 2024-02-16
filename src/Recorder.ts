export class Recorder {
    private canvas: HTMLCanvasElement;
    // @ts-ignore
    private recorder: MediaRecorder;

    private recording = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public get isRecording(): boolean {
        return this.recording;
    }

    public async record() {
        const stream = this.canvas.captureStream(24);
        this.recorder = new MediaRecorder(stream);
        // Prompt the user to choose where to save the recording file.
        const suggestedName = "screen-recording.webm";
        const handle = await window.showSaveFilePicker({ suggestedName });
        const writable = await handle.createWritable();

        this.recorder.start();
        this.recording = true;
        console.log('Start Recording...')
        this.recorder.addEventListener("dataavailable", async (event) => {
            // Write chunks to the file.
            await writable.write(event.data);
            if (this.recorder.state === "inactive") {
                // Close the file when the recording stops.
                await writable.close();
            }
        });
    }

    public stop() {
        this.recorder.stop();
        this.recording = false;
        console.log('Stop Recording...')
    }
}