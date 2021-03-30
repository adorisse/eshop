const Joi = require('joi');

const productSchemaValidation = (req, res, next) => {

    const productValidationSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().min(6).max(1000).required(),
        category: Joi.string().required(),
        price: Joi.number().required()
    });
    
    const validation = productValidationSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send({
            error: validation.error
        })
    }

    next();
}

module.exports = productSchemaValidation;