import AmbiencesItem from "./AmbienceItem";
import data from "./data";

function AmbiencesList({ setPiecesPlaying, allDisabled }) {
    return (
        <div>
            {/* Block: Nature */}
            <div className="ambiences-title">
                <span>&gt;</span> Nature
            </div>
            <div className="ambiences">
                {data
                    .filter((amb) => amb.category === "nature")
                    .map((entry) => (
                        <AmbiencesItem
                            key={entry.id}
                            data={entry}
                            identifier={entry.id}
                            setPiecesPlaying={setPiecesPlaying}
                            isDisabled={allDisabled}
                        />
                    ))}
            </div>

            {/* Block: Mechanical */}
            <div className="ambiences-title">
                <span>&gt;</span> Mechanical
            </div>
            <div className="ambiences">
                {data
                    .filter((amb) => amb.category === "mechanical")
                    .map((entry) => (
                        <AmbiencesItem
                            key={entry.id}
                            data={entry}
                            identifier={entry.id}
                            setPiecesPlaying={setPiecesPlaying}
                            isDisabled={allDisabled}
                        />
                    ))}
            </div>

            {/* Block: Sci-Fi */}
            <div className="ambiences-title">
                <span>&gt;</span> Sci-Fi
            </div>
            <div className="ambiences">
                {data
                    .filter((amb) => amb.category === "sci-fi")
                    .map((entry) => (
                        <AmbiencesItem
                            key={entry.id}
                            data={entry}
                            identifier={entry.id}
                            setPiecesPlaying={setPiecesPlaying}
                            isDisabled={allDisabled}
                        />
                    ))}
            </div>
        </div>
    );
}

export default AmbiencesList;
