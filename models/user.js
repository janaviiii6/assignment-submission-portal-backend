const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minLength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        role: {
            type: String,
            enum: ['user','admin'],
            default: 'user',
        },
    },
    { timestamps: true }
);

//Hash password of user before storing it to the database
userSchema.pre('save', async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

//Comparing password
userSchema.methods.comparePassword = function (userPassword) {
    return bcrypt.compare(password, this.password);
};



const User = mongoose.model("user",userSchema);
module.exports = User;