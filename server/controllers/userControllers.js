const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET_KEY
const UserModel = require('../models/user');

const handleSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ email: email, userId: user._id }, secret, { expiresIn: '24h' }); // Token expires in 1 hour for better security

    // Set cookie with the token
    res.cookie("jwtToken", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Respond with success message
    res.status(201).json({
      success: true,
      username: username,
      email: email,
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
}


const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  try {
    // Find user by email
    const user = await UserModel.findOne({ email });

    // Check if user exists and password is valid
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, userId: user._id }, secret, { expiresIn: '24h' });

    // Set cookie with the token
    res.cookie('jwtToken', token, { httpOnly: true, secure: true || process.env.NODE_ENV === 'production', sameSite: 'none' });

    // Respond with success message
    res.status(200).json({ success: true, email: user.email, username: user.username, message: "Logged In" });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};


const handleLogout = async (req, res) => {
  res.cookie('jwtToken', '', {
    maxAge: 1, httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }); // Set token cookie to expire immediately
  res.status(200).json({ success: true, message: 'Logged out successfully' });
}




module.exports = {
  handleSignUp,
  handleLogin,
  handleLogout
}