import "./AmbienceItem.css";
import { useState, useRef, useEffect } from "react";

function AmbienceItem({ data }) {
    const [range, setRange] = useState("1");
    const [playing, setPlaying] = useState(false);
    const audio = useRef(new Audio(data.audioPath));
    const myImg = useRef();

    useEffect(() => {
        const preventEnd = () => {
            if (audio.current.currentTime >= audio.current.duration - 3) {
                audio.current.currentTime = 3;
            }
        };
        audio.current.addEventListener("timeupdate", preventEnd);

        return () => {
            audio.current.removeEventListener("timeupdate", preventEnd);
        };
    });

    // handle change input range
    const handleChange = (e) => {
        const newValue = e.target.value;
        setRange(newValue);
        audio.current.volume = newValue;
    };

    // handle clicking on an img: play/pause
    const handleClick = () => {
        if (playing) {
            audio.current.pause();
            setPlaying(false);
            myImg.current.classList.remove("brightened");
        } else {
            audio.current.loop = true;
            audio.current.volume = 0.1;
            myImg.current.classList.add("pulse");
            audio.current.addEventListener("loadeddata", () => {
                setRange("0.1");
                audio.current.play();
                setPlaying(true);
                myImg.current.classList.remove("pulse");
                myImg.current.classList.add("brightened");
            });
            audio.current.load();
        }
    };

    return (
        <div className="ambience">
            <div
                className={`${data.name === "Brown Noise" && playing ? `ambience__img brown-noise` : `ambience__img`}`}
                onClick={handleClick}
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
                    value={range}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default AmbienceItem;
