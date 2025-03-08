import AmbiencesItem from "./AmbienceItem";
import data from "./data";

function AmbiencesList({ setPiecesPlaying, allDisabled }) {
    return (
        <div className="ambiences">
            {data.map((entry) => (
                <AmbiencesItem
                    key={entry.id}
                    data={entry}
                    identifier={entry.id}
                    setPiecesPlaying={setPiecesPlaying}
                    isDisabled={allDisabled}
                />
            ))}
        </div>
    );
}

export default AmbiencesList;
