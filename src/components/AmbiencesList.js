import AmbiencesItem from "./AmbienceItem";
import data from "./data";

function AmbiencesList() {
    return (
        <div className="ambiences">
            {data.map((entry) => (
                <AmbiencesItem key={entry.id} data={entry} />
            ))}
        </div>
    );
}

export default AmbiencesList;
