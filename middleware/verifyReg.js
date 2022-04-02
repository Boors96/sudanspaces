const Joi = require('joi');
const emailValidator = require('deep-email-validator');

const {db} = require("../models");
const User = db.User;

const reg_schema = Joi.object({
    avatar: Joi.any(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    full_name: Joi.string().min(6).required(),
    email:Joi.string().required(),
    password: Joi.string().min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirm_password: Joi.ref('password'),

});

validateReg = async(req, res, next) => {
    console.log(req);
    const reqValidation = reg_schema.validate(req.body);
    if (reqValidation.error){
        console.log(reqValidation.error)
        return res.status(400).send({message: reqValidation.error.details[0].message});
    }

    const emailValidation = await emailValidator.validate(req.body.email);
    console.log(emailValidation)
    if (!emailValidation.valid) {
        return res.status(400).send({message: "Invalid email"});
    }

    // Username
    User.findOne({
        where: {
        username: req.body.username
        }
    }).then(user => {
        if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        return;
        }
        // Email
        User.findOne({
        where: {
            email: req.body.email
        }
        }).then(user => {
        if (user) {
            res.status(400).send({
            message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
        });
    });
};
const verifyReg = {
    validateReg: validateReg
};
module.exports = verifyReg;