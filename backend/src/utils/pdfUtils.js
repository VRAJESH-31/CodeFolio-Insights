import pdf from "pdf-parse";
import {readFile} from "fs/promises";

const getPdfContent = async (filePath) => {
    try{
        const pdfDataBuffer = await readFile(filePath);
        const pdfData = await pdf(pdfDataBuffer);
        const noOfPages = pdfData.numpages;
        let pdfText = pdfData.text;
        return {noOfPages, pdfText};
    } catch (error){
        console.log(error.message);
        console.log(error.stack);
        return {noOfPages:0, pdfText:""};
    }
}

export {
    getPdfContent
}