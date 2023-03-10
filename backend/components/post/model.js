const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: String,
    description: String,
    image: String,
    likes: {
      type: Number,
      default: 0
    },
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const model = mongoose.model('post', mySchema);

module.exports = model;