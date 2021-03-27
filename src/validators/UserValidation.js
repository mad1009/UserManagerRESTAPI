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


/**
 * Add two numbers together
 * @param  {Object} user verified user
 * @return {{valid,msg,user}} return a result object that contain boolean and a msg and the validated user       
 */
module.exports = async function validate(user){
    try {
        const userV = await validator.validateAsync(user)
        return {valid:true,msg:"user is valid", user:userV}
    } catch (error) {
        return {valid:false, msg:error, user}
    }
}