const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

// Define the User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Ensure email is unique
        lowercase: true, // Store email in lowercase
        match: [/\S+@\S+\.\S+/, 'is invalid'], // Simple email validation
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Pre-save middleware to hash the password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new or modified
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed to save the user
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Compare hashed password with input
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
