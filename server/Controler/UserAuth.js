const User = require('../Models/UserModel.js');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt=require('jsonwebtoken')
require('dotenv').config()

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user with the same email already exists
    const userExist = await User.findOne({ email });
    console.log(userExist);  // This can be removed in production

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);  // Automatically generates salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Save the new user to the database
    await newUser.save();

    // Send response back to client
    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};
const displaydemo=async(req,res)=>{

    try {
        console.log("hello")
        res.status(200).json({
            User
        })
        
    } catch (error) {
        console.log(error)
        res.send(400).json({
            message:"error",
       
        })
    }
}

const LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(400).json({
          message: 'Invalid credentials',
        });
      }
  
      // Compare passwords
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(400).json({
          message: 'Invalid credentials',
        });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' } // Correct syntax for expiration
      );
  
      // Set the cookie with the token
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict', // Prevent CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      });
  
      // Send success response
      res.status(200).json({
        success: true,
        message: 'Login successfully',
        token
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };
  

module.exports={RegisterUser,displaydemo,LoginUser}