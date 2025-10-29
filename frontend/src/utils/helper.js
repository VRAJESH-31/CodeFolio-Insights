export const getRandomHexColor = () => {
    const randomColorInt = Math.floor(Math.random() * 16777215);
    let hexColor = randomColorInt.toString(16);

    while (hexColor.length < 6) {
        hexColor = "0" + hexColor;
    }

    return "#" + hexColor;
}

export const getMemeForScore = (score) => {
    if (score <= 10) return { 
        text: "Bhai... kya kar raha hai tu?", 
        meme: "https://media.tenor.com/lAwbeR6dLQoAAAAM/puneet-superstar-puneet-superstar-meme.gif",
        comment: "Not great. Start from basics.",
        bg: "from-red-50 to-orange-50",
        border: "border-red-200"
    };
    if (score <= 30) return { 
        text: "Okay, we have a foundation.", 
        meme: "https://media1.tenor.com/m/ivKCeh337pEAAAAC/style-hai.gif",
        comment: "Focus on consistency and practice.",
        bg: "from-orange-50 to-yellow-50",
        border: "border-orange-200"
    };
    if (score <= 60) return { 
        text: "Average hai, overconfident mat hona.", 
        meme: "https://media1.tenor.com/m/0dyIrOllTp0AAAAC/akshay-kumar-50rupaya-kat-overacting.gif",
        comment: "Slightly above average! Keep pushing.",
        bg: "from-yellow-50 to-lime-50",
        border: "border-yellow-200"
    };
    if (score <= 80) return { 
        text: "Good job! Thoda aur...", 
        meme: "https://media.tenor.com/oXvPPPUQs6QAAAAM/hungama-rajpal-yadav.gif",
        comment: "You're showing strong consistency.",
        bg: "from-green-50 to-emerald-50",
        border: "border-green-200"
    };
    if (score <= 100) return { 
        text: "Legendary! Sab phod diya.", 
        meme: "https://media.tenor.com/zKO3nFWkem0AAAAM/superman.gif",
        comment: "Outstanding work! You're crushing it.",
        bg: "from-blue-50 to-purple-50",
        border: "border-blue-200"
    };
    return { text: "", meme: "", comment: "", bg: "", border: "" };
};