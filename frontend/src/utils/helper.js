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
        text: "Tera khel katam hai ab!", 
        meme: "https://media1.tenor.com/m/KHzXXOA0vsoAAAAC/mera-khel-khatam-hai.gif",
        comment: "Game over! Start from absolute basics.",
        bg: "from-red-100 to-red-50",
        border: "border-red-300"
    };
    if (score <= 20) return { 
        text: "Narendra Modi: Koi sharam haya hai?", 
        meme: "https://media1.tenor.com/m/aaZVejvSkCMAAAAd/agar-thoda-sa-bhi-bhagwan-ne-di-ho-to-jara-upyog-karro-modi-memes.gif",
        comment: "Even Modi is disappointed. Time to step up!",
        bg: "from-orange-100 to-orange-50",
        border: "border-orange-300"
    };
    if (score <= 30) return { 
        text: "Theek nai kar rahe ho app!", 
        meme: "https://media1.tenor.com/m/AqYz72_DTAIAAAAd/jolly-llb-frustrated-judge.gif",
        comment: "You're not doing it right. Focus on fundamentals.",
        bg: "from-amber-100 to-amber-50",
        border: "border-amber-300"
    };
    if (score <= 40) return { 
        text: "Kya gunda banega tu?", 
        meme: "https://media1.tenor.com/m/s3nkIxd8-FYAAAAC/phir-hera-pheri-kya-gunda-banega-re-tu.gif",
        comment: "Trying to act tough? Back it up with skills!",
        bg: "from-yellow-100 to-yellow-50",
        border: "border-yellow-300"
    };
    if (score <= 50) return { 
        text: "Majaa nai aa raha hai!", 
        meme: "https://media1.tenor.com/m/kAbR22zos5QAAAAC/maza-nhi-aaya.gif",
        comment: "Not feeling the excitement? Add more consistency!",
        bg: "from-lime-100 to-lime-50",
        border: "border-lime-300"
    };
    if (score <= 60) return { 
        text: "Adbhut!", 
        meme: "https://media1.tenor.com/m/6ltVTxwVfYQAAAAC/amitabh-bachchan-amitabh-bachchan-kbc.gif",
        comment: "Marvelous progress! You're getting the hang of it.",
        bg: "from-green-100 to-green-50",
        border: "border-green-300"
    };
    if (score <= 70) return { 
        text: "Kyu hilaa daala na!", 
        meme: "https://media1.tenor.com/m/GXn8owaBu7sAAAAC/rajini-shivaji.gif",
        comment: "You shook the competition! Keep this momentum.",
        bg: "from-emerald-100 to-emerald-50",
        border: "border-emerald-300"
    };
    if (score <= 80) return { 
        text: "Tu bhot mast kaam karta hai!", 
        meme: "https://media1.tenor.com/m/0Wxbq1I3CEIAAAAC/munna-bhai-mbbs-sanjay-dutt.gif",
        comment: "You do awesome work! Consistency is your superpower.",
        bg: "from-teal-100 to-teal-50",
        border: "border-teal-300"
    };
    if (score <= 90) return { 
        text: "Kabhi kabhi lagta hai apun hi bhagwaan hai!", 
        meme: "https://media1.tenor.com/m/uGcXWQ77-PIAAAAC/apun-hi-bhagwaan-hai-%E0%A4%85%E0%A4%AA%E0%A5%82%E0%A4%A8%E0%A4%B9%E0%A5%80%E0%A4%AD%E0%A4%97%E0%A4%B5%E0%A4%BE%E0%A4%A8%E0%A4%B9%E0%A5%88.gif",
        comment: "Divine performance! You're reaching god-level skills.",
        bg: "from-blue-100 to-blue-50",
        border: "border-blue-300"
    };
    if (score <= 100) return { 
        text: "7 Crore ke saath Amitabh Bachan!", 
        meme: "https://media1.tenor.com/m/EPB7uiDGlDwAAAAC/kbc-memes-7crore-meme.gif",
        comment: "Legendary status achieved! You're the superstar now.",
        bg: "from-purple-100 to-purple-50",
        border: "border-purple-300"
    };
    return { text: "", meme: "", comment: "", bg: "", border: "" };
};