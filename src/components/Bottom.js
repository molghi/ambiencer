import { useState, useEffect, useRef } from "react";
import "./Bottom.css";
import { ReactComponent as PlayIcon } from "../images/play-icon.svg";
import { ReactComponent as PowerOffIcon } from "../images/power-off-icon.svg";
import { ReactComponent as TimeIcon } from "../images/clock-icon.svg";

// ================================================================================================

function Bottom({ piecesPlaying, turnOffAll }) {
    const [time, setTime] = useState("0:00"); // current time
    const [playingTime, setPlayingTime] = useState(0); // current playing time, raw, seconds
    const [duration, setDuration] = useState("00:00:00"); // current playing time prettified
    let timerCurrentTimeRef = useRef(null); // timers
    let timerPlayingTimeRef = useRef(null);

    const turnOff = () => turnOffAll(); // do upon clicking the power off btn

    useEffect(() => {
        timerCurrentTimeRef.current = setInterval(() => {
            const nowHours = new Date().getHours();
            const nowMinutes = new Date().getMinutes();
            setTime(`${nowHours}:${nowMinutes.toString().padStart(2, 0)}`); // setting current time
        }, 1000);

        if (piecesPlaying > 0) {
            timerPlayingTimeRef.current = setInterval(() => {
                setPlayingTime(playingTime + 1);
                const hours = Math.floor(playingTime / 60 / 60);
                const minutes = Math.floor(Math.floor(playingTime - hours * 60 * 60) / 60);
                const seconds = playingTime - hours * 60 * 60 - minutes * 60;
                const pad = (value) => value.toString().padStart(2, 0);
                setDuration(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`); // setting playing time
            }, 1000);
        } else {
            clearInterval(timerPlayingTimeRef.current);
            setPlayingTime(0);
        }

        return () => {
            clearInterval(timerCurrentTimeRef.current);
            clearInterval(timerPlayingTimeRef.current);
        };
    }, [time, playingTime, duration, piecesPlaying]);

    return (
        <div className="bottom">
            <div className="bottom__box">
                <div className="bottom__btns">
                    <div className="bottom__ambiences-number" title="Pieces of ambiences playing">
                        <span className="bottom__icon">
                            <PlayIcon fill="#fff1a2" />
                        </span>
                        <span>{piecesPlaying}</span>
                    </div>
                    <div className="bottom__disable-all" title="Turn off all active ambiences" onClick={turnOff}>
                        <span className="bottom__icon">
                            <PowerOffIcon fill="#fff1a2" />
                        </span>
                    </div>
                </div>
                <div className="bottom__time">
                    <div className="bottom__now">
                        <span className="bottom__now-icon">
                            <TimeIcon fill="#fff1a2" />
                        </span>
                        <span>{time}</span>
                    </div>
                    <div className="bottom__duration">{duration}</div>
                </div>
            </div>
        </div>
    );
}

export default Bottom;
