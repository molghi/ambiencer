function volumeFadeIn(finalVolumeValue, el) {
    const step = +(finalVolumeValue / 10).toFixed(2);
    let value = 0;
    const values = new Array(10).fill(0).map((x, i) => {
        value += step;
        return +value.toFixed(2);
    });
    let counter = 0;
    const timer = setInterval(() => {
        const result = values[counter];
        counter++;
        setTimeout(() => {
            clearInterval(timer);
        }, 1000);
        el = result;
    }, 90);
}

function volumeFadeOut() {}

// ================================================================================================

export { volumeFadeIn, volumeFadeOut };
