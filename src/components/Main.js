import { useState } from "react";
import "./Main.css";
import AmbiencesList from "./AmbiencesList";
import Bottom from "./Bottom";

function Main() {
    const [piecesPlaying, setPiecesPlaying] = useState(0); // how many pieces of ambience are playing now
    const [allDisabled, setAllDisabled] = useState(false); // should all pieces of ambience be disabled or not?

    const turnOffAll = () => {
        setAllDisabled(true);
        setTimeout(() => {
            setAllDisabled(false); // flipping it back to false so it could work next time
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
