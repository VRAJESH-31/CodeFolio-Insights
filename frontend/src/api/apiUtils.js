const asyncWrapper = (fn) => async (...args) => {
    try {
    return await fn(...args);
    } catch (error) {
        throw error;
    }
};

export {
    asyncWrapper,
};
