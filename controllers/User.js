const {
  createUser,
  updateUser,
  queryUserById,
  queryListOfUsers,
  deleteUser,
} = require("../service/User");

const CreateUser = async (req, res) => {
  try {
    
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    
    const newUser = await createUser({ username, email, password });

    
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'Username or email already exists') {
      return res.status(400).json({ message: error.message });
    }

    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;


    const user = await updateUser(userId, updatedData);


    return res.json(user);

  } catch (error) {
    if (error.message === 'Invalid user ID') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }

    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const GetAllUsers = async(req, res) => {
  try {
    const userList = await queryListOfUsers();

    return res.json(userList);

  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const GetUserByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await queryUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);

  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await deleteUser(userId);

    return res.json({ message: 'User deleted successfully', user: deletedUser });

  } catch (error) {
    if (error.message === 'Invalid user ID') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }

    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  CreateUser,
  UpdateUser,
  GetAllUsers,
  GetUserByID,
  UpdateUser,
  DeleteUser,
};
