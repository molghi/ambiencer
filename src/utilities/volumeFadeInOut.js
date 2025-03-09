function volumeFadeIn(finalVolumeValue, audioEl) {
    const stepsAmount = 20; // number of steps
    const step = +(finalVolumeValue / stepsAmount).toFixed(2); // one step
    let value = 0;
    const values = new Array(stepsAmount).fill(0).map(() => {
        value += step;
        return +value.toFixed(2) < finalVolumeValue ? +value.toFixed(2) : +finalVolumeValue;
    }); // getting all step values
    let counter = 0;
    const timer = setInterval(() => {
        const result = values[counter]; // getting one volume value
        counter++;
        audioEl.volume = result; // assigning it
        if (counter === values.length) {
            clearInterval(timer); // stop interval after all steps
        }
    }, 80);
}

// ================================================================================================

function volumeFadeOut(currentVolumeValue, audioEl) {
    const stepsAmount = 20;
    const step = +(currentVolumeValue / stepsAmount).toFixed(2);
    let value = currentVolumeValue;
    const values = new Array(stepsAmount).fill(0).map(() => {
        value -= step;
        return +value.toFixed(2) >= 0 ? +value.toFixed(2) : 0;
    });
    let counter = 0;
    const timer = setInterval(() => {
        const result = values[counter];
        counter++;
        audioEl.volume = result;
        if (counter === values.length) {
            clearInterval(timer);
        }
    }, 80);
}

// ================================================================================================

export { volumeFadeIn, volumeFadeOut };
