
const User = require('../models/User');
const Profile = require('../models/Profile');


const createProfile = async (profileData) => {
  const newProfile = new Profile(profileData);
  await newProfile.save();
  return newProfile;
};


const getAllProfiles = async () => {
  return await Profile.find().populate('userId', 'username email');
};


const getProfileById = async (id) => {
  return await Profile.findById(id).populate('userId', 'username email');
};


const updateProfileById = async (id, updateData) => {
  return await Profile.findByIdAndUpdate(id, updateData, { new: true });
};


const deleteProfileById = async (id) => {
  return await Profile.findByIdAndDelete(id);
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
};
