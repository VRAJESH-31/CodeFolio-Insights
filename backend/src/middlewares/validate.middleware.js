import { ZodError } from 'zod';
import ApiError from '../utils/api-error.util.js';

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const parsedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                file: req.file,
            });

            // Update request with parsed/transformed data
            if (parsedData.body) req.body = parsedData.body;
            if (parsedData.query) req.query = parsedData.query;
            if (parsedData.params) req.params = parsedData.params;

            return next();
        } catch (error) {
            console.error(error.stack);
            if (error instanceof ZodError) {
                return next(new ApiError(400, Object.entries(JSON.parse(error.message))[0][1].message));
            }
            return next(new ApiError(500, "Internal Server Error"));
        }
    }
}

export { validate };
export default validate;