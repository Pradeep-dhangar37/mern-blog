import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  // console.log("Updating user:", req.params.userId);
  
  if (req.user.id !== req.params.userId) {
    // console.log("Unauthorized update attempt by user:", req.user.id);
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  // console.log("Request body before update:", req.body);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    // console.log("User updated successfully:", updatedUser);

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

            // Delete User
export const deleteUser = async(req, res, next) =>{
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to Delete This Account'));
  }
  try {
    const updatedUser = await User.findOneAndDelete(req.params.userId);
    res.status(200).json("User Has Been Deleted");
  } catch (error) {
    // console.error("Error Deleting  user:", error);
    next(error);
  }
};
