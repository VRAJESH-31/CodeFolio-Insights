export const throwAxiosError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
    throw new Error(errorMessage);
};

export const asyncWrapper = (fn) => async (...args) => {
    try {
        return await fn(...args);
    } catch (error) {
        throwAxiosError(error);
    }
};
