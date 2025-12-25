import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
    const [currentAccentColor, setCurrentAccentColor] = useState(
        JSON.parse(
            localStorage.getItem("ambiencer_ui_color") ||
                `"${getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()}"`
        )
    );

    return (
        <>
            <Header setCurrentAccentColor={setCurrentAccentColor} />
            <Main currentAccentColor={currentAccentColor} />
        </>
    );
}

export default App;
