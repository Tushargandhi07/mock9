const mongoose = require('mongoose');

const postSchema = (
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        image: String,
        createdAt: { type: Date, default: Date.now() },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: String,
            createdAt: { type: Date, default: Date.now() }
        }]
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = {
    Post
}