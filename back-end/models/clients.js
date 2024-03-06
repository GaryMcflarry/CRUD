const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    contact: String,
    dateCreated: Date
});

module.exports = mongoose.model('Client', clientSchema);