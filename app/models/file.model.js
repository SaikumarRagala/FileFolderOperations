const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    title: String,
    folderId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Files', FileSchema);