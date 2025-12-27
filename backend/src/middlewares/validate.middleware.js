import { ZodError } from 'zod';

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                file: req.file,
            });
            return next();
        } catch (error) {
            console.log(error.stack);
            if (error instanceof ZodError) {
                return res.status(400).json({message: Object.entries(JSON.parse(error.message))[0][1].message});
            }
            return res.status(500).json({ message: 'Internal Server Error' });
        }   
    }
}

export default validate;