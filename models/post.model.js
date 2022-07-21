import pkg from 'mongoose';
const { Schema, model} = pkg;

const PostSchema = Schema({
    title: {type: String, required: true, unique: true},
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

export const Post = model("Post", PostSchema);