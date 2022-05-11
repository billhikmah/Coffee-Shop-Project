const { successResponse, errorResponse } = require("../helpers/response");
const { registerNewUSer, getPassword } = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
    const {password} = req.body;
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            registerNewUSer(req.body, hashedPassword)
            .then(() => {
                successResponse(res, 201, {msg: "User successfully registered"}, null);
            })
            .catch((error) => {
                const {status, err} = error;
                errorResponse(res, status, err);
            })
        .catch(({status, err}) =>{
            errorResponse(res, status, err);
        });
    
    });

};

const signIn = (req, res) => {
    //Get body (email and password)
    const {email, password} = req.body;

    //Match email and password
    getPassword(email)
    .then((result) => {
        bcrypt.compare(password, result.password)
        .then((result) => {
            if(!result){
                return errorResponse(res, 400, {msg: "Email or password is incorrect"});
            }
            //Generate JWT
            const payload = {
                email
            };
            const token = jwt.sign(payload, process.env.JWT_KEY);
    
            //Return
            successResponse(res, 200, {email, token}, null);
        });
        
    })
    .catch(({status, err}) => {
        errorResponse(res, status, err);
    });
    
};

module.exports = {
    register,
    signIn
};