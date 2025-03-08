const nameInLS = "ambiencerVolumes";

function pushToLS(identifier, value) {
    // args: id of an ambience and its new value
    const inLS = localStorage.getItem(nameInLS);

    let dataToStore;
    if (inLS) dataToStore = JSON.parse(inLS);
    else dataToStore = {};

    dataToStore[identifier] = value;

    localStorage.setItem(nameInLS, JSON.stringify(dataToStore));
}

// ================================================================================================

function fetchFromLS(identifier) {
    const inLS = localStorage.getItem(nameInLS);
    if (!inLS) return null;
    else return JSON.parse(inLS)[identifier];
}

// ================================================================================================

export { pushToLS, fetchFromLS };
