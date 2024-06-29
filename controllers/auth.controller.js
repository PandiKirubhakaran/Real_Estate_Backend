import express from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from 'jsonwebtoken'

export const postRegister = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    //hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    // await res.send("working")
    console.log(hashPassword);
    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashPassword,
      },
    });
    // console.log(data);
    res.status(200).json({ message: "User successfully created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const postLogin = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const age=60*1000*1000*24*7
    // res.setHeader("Set-Cookie", "text=" + "value").json("success");

    const token=jwt.sign({id:user.id,isAdmin:true},process.env.JWT_SECRET_KEY,{expiresIn:age})

    const {password:userPassword, ...userInfo}=user;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge:age
    }).status(200).json(userInfo);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to Login user" });
  }
};

export const postLogout = async (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
