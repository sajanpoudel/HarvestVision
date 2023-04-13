import express from "express"
import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

class AuthController{
    static userRegistration = async (req, res)=>{
        const {name, email, password} = req.body;
        try {
            if(name && email && password){
                const ifAlreadyPresent = await authModel.findOne({email : email});
                if(!ifAlreadyPresent){

                    //Password Hashing
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password, genSalt);

                    //Saving the user
                    const newUser = authModel({
                        name: name,
                        email : email,
                        password : hashedPassword
                    })

                    const resUser = await newUser.save();
                    if(resUser){
                        return res.status(200).json({message: "User Registration Successfull"})
                    }
                    else{
                        res.status(400).json({message: "User Not Registered!"})
                    }


                }
                else{
                    return res.status(400).json({message: "User already registered!"})
                }
            }
            else{
                return res.status(400).json({message : "All fields are required!"})
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    static userLogin = async (req, res)=>{
        const {email, password} = req.body;
        try {
            if(email && password){
                const isEmailRegistered = await authModel.findOne({email : email});
                if(isEmailRegistered){
                    if(email === isEmailRegistered.email && await bcryptjs.compare(password, isEmailRegistered.password)){

                        //Generate Token
                        const token = jwt.sign({userID : isEmailRegistered._id}, "pleaseSubscribe", {
                            expiresIn: "2d",
                        })

                        return res.status(200).json({message: "Login Successfull", token})
                    }
                    else{
                        return res.status(400).json({message: "Invalid Credentials"})
                    }
                }
                else{
                    return res.status(400).json({message: "Email not registered. Please Register!"})
                }
            }
            else{
                return res.status(400).json({message: "Both credentials are required!"})
            }
        } catch (error) {
            return res.status(400).json({message : error.message})
        }
    }

    static changePassword = async (req, res)=>{
        
    }
}


export default AuthController