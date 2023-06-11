import mongoose from "mongoose";
import bcrypt from "bcrypt";
import pkg from 'validator';
const { isEmail } = pkg;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required field"],
        minLength:[3, "Minimum length is 3"],
        maxLength: [30,"Maximum length is 30"],
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Email should be unique"],
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15,
    }
},{
    timestamps: true,
})

userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (pass){
    return bcrypt.compare(pass, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;