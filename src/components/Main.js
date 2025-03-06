import "./Main.css";
import AmbiencesList from "./AmbiencesList";

function Main() {
    return (
        <main className="main">
            <div className="container">
                <div className="main__inner">
                    <div className="main__title">Pieces of Ambience</div>
                    <AmbiencesList />
                </div>
            </div>
        </main>
    );
}

export default Main;
