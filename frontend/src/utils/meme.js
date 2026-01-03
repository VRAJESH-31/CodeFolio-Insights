export const getMemeForScore = (score) => {
    if (score <= 10) return {
        text: "Tera khel katam hai ab!",
        meme: "https://media1.tenor.com/m/KHzXXOA0vsoAAAAC/mera-khel-khatam-hai.gif",
        comment: "Game over! Start from absolute basics.",
        bg: "from-red-100 to-red-50",
        border: "border-red-300",
        scoreColor: "from-rose-500 to-pink-400",
        scoreText: "Keep Going!",
        progressColor: "bg-rose-500",
        borderColor: "border-rose-200 hover:border-rose-300",
        gradient: 'bg-gradient-to-br from-rose-50/80 to-red-100/60 border-rose-200',
        scoreClasses: 'from-red-500 to-rose-600 shadow-red-200',
        colorName: "red"
    };
    if (score <= 20) return {
        text: "Narendra Modi: Koi sharam haya hai?",
        meme: "https://media1.tenor.com/m/aaZVejvSkCMAAAAd/agar-thoda-sa-bhi-bhagwan-ne-di-ho-to-jara-upyog-karro-modi-memes.gif",
        comment: "Even Modi is disappointed. Time to step up!",
        bg: "from-orange-100 to-orange-50",
        border: "border-orange-300",
        scoreColor: "from-rose-500 to-pink-400",
        scoreText: "Keep Going!",
        progressColor: "bg-rose-500",
        borderColor: "border-rose-200 hover:border-rose-300",
        gradient: 'bg-gradient-to-br from-rose-50/80 to-red-100/60 border-rose-200',
        scoreClasses: 'from-red-500 to-rose-600 shadow-red-200',
        colorName: "red"
    };
    if (score <= 30) return {
        text: "Theek nai kar rahe ho app!",
        meme: "https://media1.tenor.com/m/AqYz72_DTAIAAAAd/jolly-llb-frustrated-judge.gif",
        comment: "You're not doing it right. Focus on fundamentals.",
        bg: "from-amber-100 to-amber-50",
        border: "border-amber-300",
        scoreColor: "from-rose-500 to-pink-400",
        scoreText: "Keep Going!",
        progressColor: "bg-rose-500",
        borderColor: "border-rose-200 hover:border-rose-300",
        gradient: 'bg-gradient-to-br from-rose-50/80 to-red-100/60 border-rose-200',
        scoreClasses: 'from-red-500 to-rose-600 shadow-red-200',
        colorName: "red"
    };
    if (score <= 40) return {
        text: "Kya gunda banega tu?",
        meme: "https://media1.tenor.com/m/s3nkIxd8-FYAAAAC/phir-hera-pheri-kya-gunda-banega-re-tu.gif",
        comment: "Trying to act tough? Back it up with skills!",
        bg: "from-yellow-100 to-yellow-50",
        border: "border-yellow-300",
        scoreColor: "from-amber-500 to-yellow-400",
        scoreText: "Good Progress!",
        progressColor: "bg-amber-500",
        borderColor: "border-amber-200 hover:border-amber-300",
        gradient: 'bg-gradient-to-br from-amber-50/80 to-orange-100/60 border-amber-200',
        scoreClasses: 'from-amber-500 to-orange-500 shadow-amber-200',
        colorName: "yellow"
    };
    if (score <= 50) return {
        text: "Majaa nai aa raha hai!",
        meme: "https://media1.tenor.com/m/kAbR22zos5QAAAAC/maza-nhi-aaya.gif",
        comment: "Not feeling the excitement? Add more consistency!",
        bg: "from-lime-100 to-lime-50",
        border: "border-lime-300",
        scoreColor: "from-amber-500 to-yellow-400",
        scoreText: "Good Progress!",
        progressColor: "bg-amber-500",
        borderColor: "border-amber-200 hover:border-amber-300",
        gradient: 'bg-gradient-to-br from-amber-50/80 to-orange-100/60 border-amber-200',
        scoreClasses: 'from-amber-500 to-orange-500 shadow-amber-200',
        colorName: "yellow"
    };
    if (score <= 60) return {
        text: "Adbhut!",
        meme: "https://media1.tenor.com/m/6ltVTxwVfYQAAAAC/amitabh-bachchan-amitabh-bachchan-kbc.gif",
        comment: "Marvelous progress! You're getting the hang of it.",
        bg: "from-green-100 to-green-50",
        border: "border-green-300",
        scoreColor: "from-blue-500 to-cyan-400",
        scoreText: "Great Job!",
        progressColor: "bg-blue-500",
        borderColor: "border-blue-200 hover:border-blue-300",
        gradient: 'bg-gradient-to-br from-blue-50/80 to-cyan-100/60 border-blue-200',
        scoreClasses: 'from-blue-500 to-cyan-600 shadow-blue-200',
        colorName: "blue"
    };
    if (score <= 70) return {
        text: "Kyu hilaa daala na!",
        meme: "https://media1.tenor.com/m/GXn8owaBu7sAAAAC/rajini-shivaji.gif",
        comment: "You shook the competition! Keep this momentum.",
        bg: "from-emerald-100 to-emerald-50",
        border: "border-emerald-300",
        scoreColor: "from-blue-500 to-cyan-400",
        scoreText: "Great Job!",
        progressColor: "bg-blue-500",
        borderColor: "border-blue-200 hover:border-blue-300",
        gradient: 'bg-gradient-to-br from-blue-50/80 to-cyan-100/60 border-blue-200',
        scoreClasses: 'from-blue-500 to-cyan-600 shadow-blue-200',
        colorName: "blue"
    };
    if (score <= 80) return {
        text: "Tu bhot mast kaam karta hai!",
        meme: "https://media1.tenor.com/m/0Wxbq1I3CEIAAAAC/munna-bhai-mbbs-sanjay-dutt.gif",
        comment: "You do awesome work! Consistency is your superpower.",
        bg: "from-teal-100 to-teal-50",
        border: "border-teal-300",
        scoreColor: "from-emerald-500 to-green-400",
        scoreText: "Excellent!",
        progressColor: "bg-emerald-500",
        borderColor: "border-emerald-200 hover:border-emerald-300",
        gradient: 'bg-gradient-to-br from-green-50/80 to-emerald-100/60 border-green-200',
        scoreClasses: 'from-green-500 to-emerald-600 shadow-green-200',
        colorName: "green"
    };
    if (score <= 90) return {
        text: "Kabhi kabhi lagta hai apun hi bhagwaan hai!",
        meme: "https://media1.tenor.com/m/uGcXWQ77-PIAAAAC/apun-hi-bhagwaan-hai-%E0%A4%85%E0%A4%AA%E0%A5%82%E0%A4%A8%E0%A4%B9%E0%A5%80%E0%A4%AD%E0%A4%97%E0%A4%B5%E0%A4%BE%E0%A4%A8%E0%A4%B9%E0%A5%88.gif",
        comment: "Divine performance! You're reaching god-level skills.",
        bg: "from-blue-100 to-blue-50",
        border: "border-blue-300",
        scoreColor: "from-emerald-500 to-green-400",
        scoreText: "Excellent!",
        progressColor: "bg-emerald-500",
        borderColor: "border-emerald-200 hover:border-emerald-300",
        gradient: 'bg-gradient-to-br from-green-50/80 to-emerald-100/60 border-green-200',
        scoreClasses: 'from-green-500 to-emerald-600 shadow-green-200',
        colorName: "green"
    };
    if (score <= 100) return {
        text: "7 Crore ke saath Amitabh Bachan!",
        meme: "https://media1.tenor.com/m/EPB7uiDGlDwAAAAC/kbc-memes-7crore-meme.gif",
        comment: "Legendary status achieved! You're the superstar now.",
        bg: "from-purple-100 to-purple-50",
        border: "border-purple-300",
        scoreColor: "from-emerald-500 to-green-400",
        scoreText: "Excellent!",
        progressColor: "bg-emerald-500",
        borderColor: "border-emerald-200 hover:border-emerald-300",
        gradient: 'bg-gradient-to-br from-green-50/80 to-emerald-100/60 border-green-200',
        scoreClasses: 'from-green-500 to-emerald-600 shadow-green-200',
        colorName: "green"
    };
    return { text: "", meme: "", comment: "", bg: "", border: "", scoreColor: "", scoreText: "", progressColor: "", borderColor: "", gradient: "", scoreClasses: "", colorName: "" };
};
