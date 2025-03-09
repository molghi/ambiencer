import * as Tone from "tone";

// ================================================================================================

async function fadeInToVolume(audioUrl, specifiedVolumeValue) {
    await Tone.start(); // Required for user interaction in some browsers

    const player = new Tone.Player(audioUrl).toDestination();

    // Create a volume envelope starting at -Infinity (silent)
    const volume = new Tone.Volume(-Infinity).toDestination();
    player.connect(volume);

    // Start playback of the audio
    player.start();

    // Fade in to the specified volume value over 2 seconds
    volume.gain.setValueAtTime(0, Tone.now());
    volume.gain.linearRampToValueAtTime(specifiedVolumeValue, Tone.now() + 2); // 2 seconds fade-in
}

// ================================================================================================

async function fadeOutFromVolume(audioUrl, specifiedVolumeValue) {
    await Tone.start(); // Required for user interaction in some browsers

    const player = new Tone.Player(audioUrl).toDestination();

    // Create a volume envelope starting at the specified volume value
    const volume = new Tone.Volume(specifiedVolumeValue).toDestination();
    player.connect(volume);

    // Start playback of the audio
    player.start();

    // Fade out to 0 over 2 seconds
    volume.gain.setValueAtTime(specifiedVolumeValue, Tone.now());
    volume.gain.linearRampToValueAtTime(0, Tone.now() + 2); // 2 seconds fade-out
}

// ================================================================================================

export { fadeInToVolume, fadeOutFromVolume };
