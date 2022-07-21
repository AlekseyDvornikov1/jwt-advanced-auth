import pkg from 'mongoose';
const { Schema, model} = pkg;

const TokenSchema = Schema({
    refreshToken: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Token = model("Token", TokenSchema);