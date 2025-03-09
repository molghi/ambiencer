import * as Tone from "tone";

async function slowAndReverb(audioUrl) {
    await Tone.start(); // Required for user interaction in some browsers

    const player = new Tone.Player(audioUrl).toDestination();

    player.playbackRate = 0.8; // Slow down

    const reverb = new Tone.Reverb({
        decay: 5, // Longer decay = more "spacey" reverb
        wet: 0.5, // Mix of original sound and reverb (0 = dry, 1 = fully wet)
    }).toDestination();

    player.connect(reverb);
    player.start();
}

export default slowAndReverb;
