// // Make express server
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 8080;

// const userRoutes = require("./routes/User");
// app.use("/user", userRoutes);

// const profileRoutes = require("./routes/Profile");
// app.use("/profile", profileRoutes);

// // const seedRoutes = require("./seed/User");
// // app.use("/seed", seedRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');

// const User = require('./models/User');  // Import the User model
// const Profile = require('./models/Profile'); 
// mongoose.model('user');
// mongoose.model('profile');

const app = express();
const port = process.env.PORT || 8080;


// Middleware to parse JSON bodies
app.use(express.json());

mongoose.connect('mongodb+srv://root:Averystrongpassword@cluster0.uxu4b.mongodb.net/?retryWrites=true&w=majority', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  const userRoutes = require('./routes/User');
  const profileRoutes = require('./routes/Profile');

// Use the routes
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});