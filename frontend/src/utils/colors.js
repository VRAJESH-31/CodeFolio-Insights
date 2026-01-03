export const getRandomHexColor = () => {
    const randomColorInt = Math.floor(Math.random() * 16777215);
    let hexColor = randomColorInt.toString(16);

    while (hexColor.length < 6) {
        hexColor = "0" + hexColor;
    }

    return "#" + hexColor;
};
