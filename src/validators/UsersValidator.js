module.exports = function(user){
    if(!user.username || !user.password){
        return { validate:false, msg:"username and password are required" }
    }

    if(user.username==="" || user.password===""){
        return { validate:false, msg:"username and password are required" }
    }

    if(user.username.length<5){
        return { validate:false, msg:"username must contain more than 5 characters" }

    }

    if(user.username.password<8){
        return { validate:false, msg:"password must contain more than 8 characters" }

    }

    return {validate:true, msg:"Valid creds"}
}