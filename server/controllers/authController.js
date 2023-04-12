import express from "express";
import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/jwt.js";
import { MIN_PASSWORD_LENGTH, isStrongPassword, isValidEmail } from "../utils/validators.js";

class AuthController {
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      if (name && email && password) {
        if (!isValidEmail(email)) {
          return res.status(400).json({ message: "Enter a valid email address!" });
        }
        if (!isStrongPassword(password)) {
          return res.status(400).json({
            message: `Password needs at least ${MIN_PASSWORD_LENGTH} characters with a letter and a digit!`,
          });
        }
        const ifAlreadyPresent = await authModel.findOne({ email: email });
        if (!ifAlreadyPresent) {
          //Password Hashing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          //Saving the user
          const newUser = authModel({
            name: name,
            email: email,
            password: hashedPassword,
          });

          const resUser = await newUser.save();
          if (resUser) {
            return res.status(200).json({ message: "User Registration Successfull" });
          } else {
            res.status(400).json({ message: "User Not Registered!" });
          }
        } else {
          return res.status(400).json({ message: "User already registered!" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required!" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isEmailRegistered = await authModel.findOne({ email: email });
        if (isEmailRegistered) {
          if (
            email === isEmailRegistered.email &&
            (await bcryptjs.compare(password, isEmailRegistered.password))
          ) {
            //Generate Token
            const token = jwt.sign({ userID: isEmailRegistered._id }, getJwtSecret(), {
              expiresIn: "2d",
            });

            return res.status(200).json({ message: "Login Successfull", token });
          } else {
            return res.status(400).json({ message: "Invalid Credentials" });
          }
        } else {
          return res.status(400).json({ message: "Email not registered. Please Register!" });
        }
      } else {
        return res.status(400).json({ message: "Both credentials are required!" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static profile = async (req, res) => {
    // checkIsUserAuthenticated has already loaded the user without the password hash
    const { _id, name, email } = req.user;
    return res.status(200).json({ user: { id: _id, name, email } });
  };

  static changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Both the current and the new password are required!" });
      }
      if (!isStrongPassword(newPassword)) {
        return res.status(400).json({
          message: `Password needs at least ${MIN_PASSWORD_LENGTH} characters with a letter and a digit!`,
        });
      }

      const user = await authModel.findById(req.user._id);
      if (!user || !(await bcryptjs.compare(currentPassword, user.password))) {
        return res.status(400).json({ message: "Current password is wrong" });
      }

      const genSalt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(newPassword, genSalt);
      await user.save();
      return res.status(200).json({ message: "Password changed" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default AuthController;
