const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favGenre: {
        type: [{
            type: String,
            required: true,
            enum: ['Drama', 'Comedy', 'Action', 'Sci-fi', 'Animation', 'History', 'Horror', 'Romance']
        }]
    }
}, {
    collection: 'users',
});

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

// Here User will create a new collection called 'users'
module.exports = mongoose.model('User', userSchema);