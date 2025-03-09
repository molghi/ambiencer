import "./AmbienceItem.css";
import { useState, useRef, useEffect } from "react";
import { pushToLS, fetchFromLS } from "../utilities/localStorage"; // localStorage
import { volumeFadeOut } from "../utilities/volumeFadeInOut"; // gradually fading volume out to 0
import handleClick from "../utilities/playPauseAmbience"; // handle clicking on an img: play/pause a piece of ambience

// ================================================================================================

function AmbienceItem({ data, identifier, setPiecesPlaying, isDisabled }) {
    const [range, setRange] = useState("0.1"); // volume input value
    const [playing, setPlaying] = useState(false); // is it playing or not?
    const audio = useRef(new Audio(data.audioPath)); // storing a stable ref to a piece of audio
    const myImg = useRef(); // ref to the underlying html img tag

    useEffect(() => {
        // runs upon clicking the power off btn in Bottom
        if (isDisabled) {
            volumeFadeOut(range, audio.current); // gradually fading volume out to 0
            setTimeout(() => {
                audio.current.pause();
                audio.current.volume = 0;
            }, 2500);
            setPlaying(false);
            myImg.current.classList.remove("brightened");
            setPiecesPlaying((prev) => (prev - 1 < 0 ? 0 : prev - 1)); // piecesPlaying cannot be less than 0
        }
    }, [isDisabled, range, setPiecesPlaying]);

    // handle change on input range (volume change)
    const handleChange = (e) => {
        const newValue = e.target.value;
        pushToLS(identifier, newValue); // take this new value and send it to localStorage -- upon next play or page reload, get that value
        setRange(newValue);
        audio.current.volume = newValue;
    };

    let imageBoxClasses = data.name === "Brown Noise" && playing ? `ambience__img brown-noise` : `ambience__img`; // making that white noise gif brown in css

    return (
        <div className="ambience">
            <div
                className={imageBoxClasses}
                onClick={() => handleClick(playing, setPlaying, myImg, setPiecesPlaying, range, audio, identifier, setRange)}
            >
                {playing ? (
                    <img src={data.imgPathGif} alt="ambience img" ref={myImg} />
                ) : (
                    <img src={data.imgPathJpg} alt="ambience img" ref={myImg} />
                )}
            </div>
            <div className="ambience__name">{data.name}</div>
            <div className="ambience__controls">
                <input
                    type="range"
                    className="ambience__volume"
                    min="0"
                    max="1"
                    step="0.01"
                    value={fetchFromLS(identifier) || range}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default AmbienceItem;
