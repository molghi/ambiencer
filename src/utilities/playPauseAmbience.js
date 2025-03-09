import { fetchFromLS } from "../utilities/localStorage";
import { volumeFadeIn, volumeFadeOut } from "../utilities/volumeFadeInOut";

// handle clicking on an img: play/pause a piece of ambience
const handleClick = (playing, setPlaying, myImg, setPiecesPlaying, range, audio, identifier, setRange) => {
    if (playing) {
        // stopping (or pausing) it
        setPlaying(false);
        myImg.current.classList.remove("brightened");
        setPiecesPlaying((prev) => prev - 1);
        volumeFadeOut(range, audio.current); // gradually fading volume out to 0
        setTimeout(() => {
            audio.current.pause();
            audio.current.volume = 0;
        }, 2500);
    } else {
        // playing it
        audio.current.loop = true; // runs infinitely, looped
        const volumeFromLS = fetchFromLS(identifier); // fetching the previously set volume value
        myImg.current.classList.add("pulse"); // showing the loading state
        audio.current.addEventListener("loadeddata", () => {
            // listening to when audio is loaded
            setRange(volumeFromLS || "0.1");
            setPlaying(true);
            myImg.current.classList.remove("pulse"); // removing the loading state
            myImg.current.classList.add("brightened"); // adding the active state
            const volumeValue = volumeFromLS || 0.1; // current volume: either what was set before or 0.1
            audio.current.play();
            audio.current.volume = 0;
            volumeFadeIn(volumeValue, audio.current); // gradually raising volume from 0 to volumeValue
        });
        audio.current.load();
        setPiecesPlaying((prev) => prev + 1);
        setTimeout(() => (audio.current.volume = volumeFromLS || 0.1), 2500); // failsafe, just in case
    }
};

export default handleClick;
