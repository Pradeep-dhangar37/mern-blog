import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
   const { username, email, password } = req.body;
   
   
   if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: "All fields are required" });
   }
   try {
       const existingUser = await User.findOne({ email });
       if (existingUser) {
           return res.status(400).json({ message: "Email already exists" });
       }
       const hashedPassword = bcryptjs.hashSync(password, 10)
       const newUser = new User({
           username,
           email,
           password: hashedPassword,
       });
       await newUser.save();
       res.json({ message: "Signup successful" });
   } catch (error) {
       console.error("Error in signup:", error);
       res.status(500).json({ message: "Signup failed" });
   }
};
