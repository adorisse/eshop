const Joi = require('joi');

const userValidationSchema = (req, res, next) => {
    const userValidationSchema = Joi.object({
        firstName: Joi.string().required()
            .min(3)
            .max(20),

        lastName: Joi.string().required()
            .min(3)
            .max(20),

        email: Joi.string().email(),

        password: Joi.string(),
        //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        isAdmin: Joi.boolean(),
        orders: Joi.allow(null),
        phone: Joi.string(),
        //.pattern(new RegExp('^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$')),
        country: Joi.string().required()
            .min(3)
            .max(40),
        city: Joi.string().required()
            .min(3)
            .max(40),
        StreetNumber: Joi.string().required(),
        //.pattern(new RegExp('^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$')),
        StreetName: Joi.string().required()
            .min(3)
            .max(40),
        zipCode: Joi.number().required(),
        //.pattern(new RegExp('^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$'))
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