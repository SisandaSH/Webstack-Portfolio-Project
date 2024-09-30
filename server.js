const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sisandashwala4:eD8ZqlgO21GltVQD@cluster0.3jjjd.mongodb.net/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Import User model after connecting to MongoDB
const User = require('./User');

// Registration endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).send({ error: 'Error registering user' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
