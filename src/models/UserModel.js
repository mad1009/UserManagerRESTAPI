const knex = require('knex');
const dbConfig = require('../db/knexfile')[process.env.ENV||'development'];

const userValidator = require('../validators/UsersValidator');

const table = knex(dbConfig);


const addUser = async (user)=>{
    const validateUser = userValidator(user);
    if(validateUser.validate){
       await table('users').insert(user)
       .then((id)=>validateUser.msg=`user created succesfully id: ${id}`)
       .catch(err=>{
           validateUser.validate=false
            validateUser.msg=err
        });
    }
    return validateUser
}

const getAllUsers = async ()=>{
    const data = await table('users')
    return data
}


const getSpecificUser = async (id)=>{
    const data = await table('users').where({id})
    return data
}

const updateUser = async (id,user)=>{
    const validateUser = userValidator(user);
    if(validateUser.validate){
        await table('users')
        .update(user).where({id})
        .then(data=>validateUser.msg=data===1 ? "User updated successfully" : `User with id ${id} is not found`)
        .catch((err)=>{
            validateUser.validate=false;
            validateUser.msg=err
        })
    }
    return validateUser
}

const deleteUser = async (id)=>{
    let deleted = false
    await table('users').del().where("id","=",id)
    .then(()=>deleted=true)
    .catch(err=>console.error(err));
    return deleted;
}

module.exports = {
    addUser,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser
}