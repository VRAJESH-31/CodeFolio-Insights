import { ZodError } from 'zod';

export const validate = (schema) => {
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
            console.log(error.stack);
            if (error instanceof ZodError) {
                return res.status(400).json({ message: Object.entries(JSON.parse(error.message))[0][1].message });
            }
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default validate;