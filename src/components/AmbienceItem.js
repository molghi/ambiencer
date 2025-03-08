import "./AmbienceItem.css";
import { useState, useRef, useEffect } from "react";
import { pushToLS, fetchFromLS } from "../utilities/localStorage";
import { volumeFadeIn, volumeFadeOut } from "../utilities/volumeFadeInOut";

// ================================================================================================

function AmbienceItem({ data, identifier, setPiecesPlaying, isDisabled }) {
    const [range, setRange] = useState("0.1");
    const [playing, setPlaying] = useState(false);
    const audio = useRef(new Audio(data.audioPath));
    const myImg = useRef();

    useEffect(() => {
        if (isDisabled) {
            setPlaying(false);
            audio.current.pause();
            myImg.current.classList.remove("brightened");
            setPiecesPlaying((prev) => (prev - 1 < 0 ? 0 : prev - 1));
        }
    }, [isDisabled]);

    // handle change input range (volume change)
    const handleChange = (e) => {
        const newValue = e.target.value;
        pushToLS(identifier, newValue); // take this new value and send it to localStorage -- upon next play or page reload, get that value
        setRange(newValue);
        audio.current.volume = newValue;
    };

    // handle clicking on an img: play/pause a piece of ambience
    const handleClick = () => {
        if (playing) {
            audio.current.pause(); // stopping (or pausing) it
            setPlaying(false);
            myImg.current.classList.remove("brightened");
            setPiecesPlaying((prev) => prev - 1);
        } else {
            audio.current.loop = true; // playing it
            const volumeFromLS = fetchFromLS(identifier);
            myImg.current.classList.add("pulse");
            audio.current.addEventListener("loadeddata", () => {
                setRange(volumeFromLS || "0.1"); // listening to when audio is loaded
                audio.current.play();
                setPlaying(true);
                myImg.current.classList.remove("pulse");
                myImg.current.classList.add("brightened");
                audio.current.volume = volumeFromLS || 0.1;
            });
            audio.current.load();
            setPiecesPlaying((prev) => prev + 1);
        }
    };

    const imageBoxClasses = data.name === "Brown Noise" && playing ? `ambience__img brown-noise` : `ambience__img`;

    return (
        <div className="ambience">
            <div className={imageBoxClasses} onClick={handleClick}>
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
