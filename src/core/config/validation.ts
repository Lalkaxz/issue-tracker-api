import * as Joi from "joi";

const validationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    HOST: Joi.string().hostname().default('0.0.0.0'),
    PREFIX: Joi.string()
        .pattern(/^\/.*/)
        .default('/api'),
    NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
})

export default validationSchema;