const User = require('../models/user.model')

async function registerNewUser(userDocument) {
    const newUser = new User(userDocument)
    await newUser.save()
    return newUser
}

async function loginUser() {
    const userInfo = await User.findOne().sort({ created_at: 1 }).populate('assigned_to');
    return userInfo
}

async function displayMovies(supportLevel) {
    const userInfo = await User.findOne({ level: supportLevel }).sort({ created_at: 1 }).populate('assigned_to');
    return userInfo;
}

module.exports = {
    registerNewUser,
    loginUser,
    displayMovies,
}