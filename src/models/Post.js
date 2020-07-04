const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Post', postSchema);
