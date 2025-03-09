const nameInLS = "ambiencerVolumes";

function pushToLS(identifier, value) {
    // args: id of an ambience and its new value
    const inLS = localStorage.getItem(nameInLS); // fetching

    let dataToStore;
    if (inLS) dataToStore = JSON.parse(inLS); // parsing
    else dataToStore = {};

    dataToStore[identifier] = value; // updating

    localStorage.setItem(nameInLS, JSON.stringify(dataToStore)); // pushing
}

// ================================================================================================

function fetchFromLS(identifier) {
    const inLS = localStorage.getItem(nameInLS); // fetching
    if (!inLS) return null;
    else return JSON.parse(inLS)[identifier]; // parsing and returning the value
}

// ================================================================================================

export { pushToLS, fetchFromLS };
