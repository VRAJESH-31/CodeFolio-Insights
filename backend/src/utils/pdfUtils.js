import pdf from "pdf-parse";

const getPdfContent = async (file) => {
    try{
        const pdfData = await pdf(file.data);
        const noOfPages = pdfData.numpages;
        let pdfText = pdfData.text;
        return {noOfPages, pdfText};
    } catch (error){
        return ""
    }
}

export {
    getPdfContent
}