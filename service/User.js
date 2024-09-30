const mongoose = require('mongoose');
const User = require('../models/User');


const createUser = async (userData) => {
  const { username, email, password } = userData;


  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('Username or email already exists');
  }


  const newUser = new User({
    username,
    email,
    password 
  });


  await newUser.save();


  return newUser;
};


const updateUser = async (userId, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }


  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true, 
    runValidators: true 
  });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};


const queryUserById = async (userId) => {

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID'); 
  }


  const user = await User.findById(userId);
  return user;
};


const queryListOfUsers = async () => {
  try {

    const users = await User.find(); 
    return users;

  } catch (error) {
    console.error('Error fetching users from database:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }


  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new Error('User not found');
  }

  return deletedUser;
};

module.exports = {
  createUser,
  updateUser,
  queryUserById,
  queryListOfUsers,
  deleteUser,
};
