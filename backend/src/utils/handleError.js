const handleError = (res, error, message) => {
    console.log(error.message);
    console.log(error.stack);
    return res.status(500).json({ message: message });
}

export default handleError;
