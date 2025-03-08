import { useState } from "react";
import "./Main.css";
import AmbiencesList from "./AmbiencesList";
import Bottom from "./Bottom";

function Main() {
    const [piecesPlaying, setPiecesPlaying] = useState(0);
    const [allDisabled, setAllDisabled] = useState(false);

    const turnOffAll = () => {
        setAllDisabled(true);
        setTimeout(() => {
            setAllDisabled(false);
        }, 3000);
    };

    return (
        <main className="main">
            <div className="container">
                <div className="main__inner">
                    <div className="main__title">Pieces of Ambience</div>
                    <AmbiencesList setPiecesPlaying={setPiecesPlaying} allDisabled={allDisabled} />
                    <Bottom piecesPlaying={piecesPlaying} turnOffAll={turnOffAll} />
                </div>
            </div>
        </main>
    );
}

export default Main;
