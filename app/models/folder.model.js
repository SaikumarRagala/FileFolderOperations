const mongoose = require('mongoose');

const FolderSchema = mongoose.Schema({
    title: String,
    fullPath: String,
    path: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Folders', FolderSchema);