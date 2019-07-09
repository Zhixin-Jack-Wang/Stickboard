const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name:String,
    time:Number,
    venue:Object,
    how_to_find_us:String,
    description:String,
    photo_url:String,
    event_url:String,
    id:String
})

const Post = mongoose.model('Board', PostSchema);

module.exports = Post;

