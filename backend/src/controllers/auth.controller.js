import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const newUser = await User.create({ name, email, password, role });
    const userObj = newUser.toObject();
    delete userObj.password;

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: userObj });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error in signup" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d",});
    res.cookie("token",token,{
      httpOnly:true,
      sameSite:"Lax",
      maxAge:7*24*60*60*1000,
    });
    return res.status(200).json({ message: "Login successful",user: {id:user._id,name:user.name,email:user.email,role:user.role,},});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error in login" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
  });
  return res.status(200).json({ message: "Logout successful" });
};
