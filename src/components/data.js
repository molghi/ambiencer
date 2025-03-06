import brownNoiseAudio from "../audio/brown-noise.mp3";
import brownNoiseJpg from "../images/white-noise.jpg";
import brownNoiseGif from "../images/white-noise.gif";

import spaceshipSleepingQuarters from "../audio/spaceship-sleeping-quarters.mp3";
import spaceshipSleepingQuartersJpg from "../images/spaceship-sleeping-quarters.png";

import forestNight2 from "../audio/forest-night-2.mp3";

// ================================================================================================

const data = [
    {
        id: 1,
        name: "Brown Noise",
        audioPath: brownNoiseAudio,
        imgPathJpg: brownNoiseJpg,
        imgPathGif: brownNoiseGif,
    },
    {
        id: 2,
        name: "Spaceship Sleeping Quarters",
        audioPath: spaceshipSleepingQuarters,
        imgPathJpg: spaceshipSleepingQuartersJpg,
        imgPathGif: spaceshipSleepingQuartersJpg,
    },
    {
        id: 2,
        name: "Forest At Night (2)",
        audioPath: forestNight2,
        imgPathJpg: spaceshipSleepingQuartersJpg,
        imgPathGif: spaceshipSleepingQuartersJpg,
    },
];

export default data;
