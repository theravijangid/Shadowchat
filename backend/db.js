// cHBFFazEQN1pUHgX
const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://ravi993:3OcgvqVzOzhAnQ0k@cluster0.myuxr3b.mongodb.net/ChatApplicationDB';
const connectToDatabase = () => {
    mongoose.connect(mongoURL)
    .then(() => console.log("Connected to the database!"))
    .catch(err => console.error('Database connection error:', err));
};

module.exports = connectToDatabase;