const axios = require("axios");
require('dotenv').config({path:"../"})

describe('Get All Users', () => {
    it('Should get all existing users from db and return a 200 status code',async ()=>{
        const {PORT, DOMAIN} = process.env;
        console.log(PORT,DOMAIN);
        const results = await axios.get(`http://localhost:3000/users/`);
        console.log(results.data);
    });
});
