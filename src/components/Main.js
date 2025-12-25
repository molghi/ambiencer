import { useState, useEffect } from "react";
import "./Main.css";
import AmbiencesList from "./AmbiencesList";
import Bottom from "./Bottom";

function Main({ currentAccentColor }) {
    const [piecesPlaying, setPiecesPlaying] = useState(0); // how many pieces of ambience are playing now
    const [allDisabled, setAllDisabled] = useState(false); // should all pieces of ambience be disabled or not?

    const turnOffAll = () => {
        setAllDisabled(true);
        setTimeout(() => {
            setAllDisabled(false); // flipping it back to false so it could work next time
        }, 3000);
    };

    useEffect(() => {
        // hotkey to silence all
        const hotkeyTurnOff = (e) => {
            if (e.altKey && e.code === "KeyS") {
                turnOffAll();
            }
        };

        window.addEventListener("keydown", hotkeyTurnOff);

        // read saved accent color value from local storage
        const accentFromLS = localStorage.getItem("ambiencer_ui_color");
        const accentDarkFromLS = localStorage.getItem("ambiencer_ui_color_darkened");
        if (accentFromLS && accentDarkFromLS) {
            document.documentElement.style.setProperty("--accent", JSON.parse(accentFromLS));
            document.documentElement.style.setProperty("--accent-darker", JSON.parse(accentDarkFromLS));
        }

        return () => window.removeEventListener("keydown", hotkeyTurnOff);
    }, []);

    return (
        <main className="main">
            <div className="container">
                <div className="main__inner">
                    <div className="main__title">Pieces of Ambience</div>
                    <AmbiencesList setPiecesPlaying={setPiecesPlaying} allDisabled={allDisabled} />
                    <Bottom piecesPlaying={piecesPlaying} turnOffAll={turnOffAll} currentAccentColor={currentAccentColor} />
                </div>
            </div>
        </main>
    );
}

export default Main;
