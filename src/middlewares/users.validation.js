const Joi = require('joi');

const userValidationSchema = (req, res, next) => {
    const userValidationSchema = Joi.object({
        firstName: Joi.string().required()
            .min(3)
            .max(20),

        lastName: Joi.string().required()
            .min(3)
            .max(20),

        email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    const validation = userValidationSchema.validate(req.body);

    //console.log(validation);

    if (validation.error) {
        return res.send({
            error: validation.error
        })

    }
    next();


}
module.exports = userValidationSchema;