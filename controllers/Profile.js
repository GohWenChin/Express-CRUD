const User = require('../models/User');
const Profile = require('../models/Profile'); 

const {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
} = require("../service/Profile");


// Create a new profile
const CreateProfile = async (req, res) => {
  const { userId, firstName, lastName, age, bio, profileImage } = req.body;

  try {
    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newProfile = await createProfile({
      userId,
      firstName,
      lastName,
      age,
      bio,
      profileImage,
    });

    return res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all profiles
const GetAllProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfiles();
    return res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a profile by ID
const GetProfileByID = async (req, res) => {
  const profileId = req.params.id;

  try {
    const profile = await getProfileById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a profile
const UpdateProfile = async (req, res) => {
  const profileId = req.params.id;

  try {
    const updatedProfile = await updateProfileById(profileId, req.body);
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a profile
const DeleteProfile = async (req, res) => {
  const profileId = req.params.id;

  try {
    const deletedProfile = await deleteProfileById(profileId);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.json({ message: 'Profile deleted successfully', profile: deletedProfile });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  CreateProfile,
  GetAllProfiles,
  GetProfileByID,
  UpdateProfile,
  DeleteProfile,
};