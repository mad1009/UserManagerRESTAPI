const axios = require("axios");
require('dotenv').config()


describe("get users",()=>{
    test('Should get all existing users from db and return a 200 status code',async ()=>{
        const results = await axios.get(`http://localhost:3000/users/`);
        // console.log("response",results);
        expect(results.status).toBe(200);
    });
    test('Should get a specific user',async ()=>{
        try{
            const results = await axios.get(`http://localhost:3000/users/9`);
            expect(results.status).toBe(200);
        }catch(error){
            expect(error.response.data).toBe(`User with id 9 not found`);
            expect(error.response.status).toBe(404);

        }
    });

    test('Should return an error msg because the user is ont exist',async ()=>{
        const notExistingId = 10000
        try{
            const results = await axios.get(`http://localhost:3000/users/${notExistingId}`);
        }catch(error){
            expect(error.response.data).toBe(`User with id ${notExistingId} not found`);
            expect(error.response.status).toBe(404);

        }
    });



})


describe("Insert users",()=>{
    test('Should return validation error (username required)', async ()=>{
        try {
            const result = await axios.post(`http://localhost:3000/users/`,{uasername:"azazazs",password:"uzumymw123"})            
        } catch (error) {
            expect(error.response.data.msg.details[0].message).toBe('"username" is required');
            }
        
        }
    );

    test('Should return validation error (username legnth)', async ()=>{
        try {
            const result = await axios.post(`http://localhost:3000/users/`,{username:"s",password:"uzumymw123"})            
        } catch (error) {
            expect(error.response.data.msg.details[0].message).toBe('"username" length must be at least 3 characters long');
            }
        
        }
    );


    test('Should return validation error (password not allowed)', async ()=>{
        try {
            const result = await axios.post(`http://localhost:3000/users/`,{username:"ahmed1114",passwsord:"uzumymw123"})            
        } catch (error) {
            expect(error.response.data.msg.details[0].message).toBe('"passwsord" is not allowed');
            }
        
        }
    );

    test('Should return validation error (password legnth)', async ()=>{
        try {
            const result = await axios.post(`http://localhost:3000/users/`,{username:"ahmed1114",password:"12"})            
        } catch (error) {
            expect(error.response.data.msg.details[0].message).toBe('"password" with value \"12\" fails to match the required pattern: /^[a-zA-Z0-9]{8,30}$/');
            }
        
        }
    );


    test('Should return validation error (password dosent match pattern)', async ()=>{
        try {
            const result = await axios.post(`http://localhost:3000/users/`,{username:"ahmed1114",password:"12"})            
        } catch (error) {
            expect(error.response.data.msg.details[0].message).toBe('"password" with value \"12\" fails to match the required pattern: /^[a-zA-Z0-9]{8,30}$/');
            }
        
        }
    );




})
