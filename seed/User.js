const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');

const db = 'mongodb+srv://root:Averystrongpassword@cluster0.uxu4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 


async function seedDatabase() {
  try {

    await mongoose.connect(db); 
    console.log('Connected to MongoDB');



    await User.deleteMany({});
    await Profile.deleteMany({});
    console.log('Cleared Users and Profiles collections');

    const users = await User.insertMany([
      { username: 'john_doe', email: 'john@example.com', password: 'hashedpassword123' },
      { username: 'jane_doe', email: 'jane@example.com', password: 'hashedpassword456' }
    ]);
    
    const profiles = await Profile.insertMany([
      { userId: users[0]._id, firstName: 'John', lastName: 'Doe', age: 30, bio: 'A software developer.', profileImage: 'https://example.com/johndoe.jpg' },
      { userId: users[1]._id, firstName: 'Jane', lastName: 'Doe', age: 28, bio: 'A graphic designer.', profileImage: 'https://example.com/janedoe.jpg' }
    ]);

    console.log('Inserted Users and Profiles');

    // Close connection
    await mongoose.connection.close();
    console.log('Seeding complete and connection closed');
  } catch (err) {
    console.error('Error during seeding:', err);
  }
}

// Run the seed function
seedDatabase();
