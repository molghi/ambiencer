import "./Header.css";

function Header({ setCurrentAccentColor }) {
    const isValidColor = (str) => {
        const s = new Option().style;
        s.color = str;
        return s.color ? s.color : false;
    };

    const darkenColor50 = (color) => {
        // Create a dummy element to parse any valid CSS color
        const dummy = document.createElement("div");
        dummy.style.color = color;
        document.body.appendChild(dummy);

        const computed = getComputedStyle(dummy).color; // get standardized rgb(...)
        document.body.removeChild(dummy);

        if (!computed) return false;

        // Extract RGB components
        const rgb = computed.match(/\d+/g).map(Number);
        if (rgb.length < 3) return false;

        // Darken by 50%
        const darkened = rgb.map((c) => Math.round(c * 0.5));

        // Convert back to hex
        const hex = darkened.map((c) => c.toString(16).padStart(2, "0")).join("");

        return `#${hex}`;
    };

    const changeUIColor = () => {
        const input = prompt("Input new UI accent color");
        const color = isValidColor(input);
        if (!color) {
            return console.error(`"${input.trim()}" is not a valid HTML color.`);
        }
        const newDarkenedAccent = darkenColor50(color);
        localStorage.setItem("ambiencer_ui_color", JSON.stringify(color));
        localStorage.setItem("ambiencer_ui_color_darkened", JSON.stringify(newDarkenedAccent));
        document.documentElement.style.setProperty("--accent", color);
        document.documentElement.style.setProperty("--accent-darker", newDarkenedAccent);
        setCurrentAccentColor(color);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div title="Click to change UI accent color" onClick={changeUIColor} className="header__logo">
                        Ambiencer
                    </div>
                    <div className="header__slogan">Stay in the zone</div>
                </div>
            </div>
        </header>
    );
}

export default Header;
