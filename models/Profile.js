const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: '',
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i, 'Invalid URL for profile image']  
  }
});

profileSchema.index({ firstName: 1, lastName: 1 });

// Profile model
const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;