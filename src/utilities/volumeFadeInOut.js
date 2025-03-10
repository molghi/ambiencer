function volumeFadeIn(finalVolumeValue, audioEl) {
    let stepsAmount = 10; // number of steps
    if (finalVolumeValue < 0.1) stepsAmount = 5;
    const intervalDelay = 100;
    const step = +(finalVolumeValue / stepsAmount).toFixed(2); // one step
    let value = 0;
    const values = new Array(stepsAmount).fill(0).map(() => {
        value += step;
        return +value.toFixed(2) < finalVolumeValue ? +value.toFixed(2) : +finalVolumeValue;
    }); // getting all step values
    values.push(finalVolumeValue);
    if (+values.reduce((a, x) => a + x, 0) === +finalVolumeValue) {
        // if they are the same, then finalVolumeValue was too low to make proper steps to increase gradually
        audioEl.volume = finalVolumeValue;
    } else {
        let counter = 0;
        const timer = setInterval(() => {
            const result = values[counter]; // getting one volume value
            counter++;
            audioEl.volume = result; // assigning it
            if (counter === values.length) {
                clearInterval(timer); // stop interval after all steps
                audioEl.volume = finalVolumeValue;
            }
        }, intervalDelay);
    }
}

// ================================================================================================

function volumeFadeOut(currentVolumeValue, audioEl) {
    const stepsAmount = 10;
    const intervalDelay = 100;
    const step = +(currentVolumeValue / stepsAmount).toFixed(2);
    let value = currentVolumeValue;
    const values = new Array(stepsAmount).fill(0).map(() => {
        value -= step;
        return +value.toFixed(2) >= 0 ? +value.toFixed(2) : 0;
    });
    values.push(0);
    let counter = 0;
    const timer = setInterval(() => {
        const result = values[counter];
        counter++;
        audioEl.volume = result;
        if (counter === values.length) {
            clearInterval(timer);
            audioEl.volume = 0;
        }
    }, intervalDelay);
}

// ================================================================================================

export { volumeFadeIn, volumeFadeOut };
