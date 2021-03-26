const joi = require('joi');

const validator = joi.object({
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),

})

module.exports = async function validate(user){
    try {
        const userV = await validator.validateAsync(user)
        return {valid:true, user:userV}
    } catch (error) {
        return {valid:false, msg:error}
    }
}