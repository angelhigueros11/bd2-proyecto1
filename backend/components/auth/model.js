const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
      },
    password: String,
});

const model = mongoose.model('users', mySchema);

module.exports = model;