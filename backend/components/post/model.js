const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    description: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const model = mongoose.model('post', mySchema);

module.exports = model;