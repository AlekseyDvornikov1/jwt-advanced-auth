import pkg from 'mongoose';
const { Schema, model} = pkg;

const UserSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
});

export const User = model("User", UserSchema);