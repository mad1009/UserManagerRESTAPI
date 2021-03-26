const knex = require('knex');
const dbConfig = require('../db/knexfile')[process.env.ENV||'development'];

const userV = require('../validators/UserValidation');

const table = knex(dbConfig);


const addUser = async (user)=>{
    let validateUser = await userV(user)

    if(validateUser.valid){
       await table('users').insert(user)
       .then((id)=>validateUser.msg=`user created succesfully id: ${id}`)
       .catch(err=>{
           console.error(err)
           validateUser.valid=false
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
    let validateUser = await userV(user)
    if(validateUser.valid){
        await table('users')
        .update(user).where({id})
        .then(data=>{
            if(data===1){
                validateUser.msg="User updated successfully";
            }else{
                validateUser.msg=`User with id ${id} is not found`;
                validateUser.valid=false;
            }
        })
        .catch((err)=>{
            validateUser.valid=false;
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