const Folder = require('../models/folder.model.js');
const File = require('../models/file.model.js');

// Create and Save a new file
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.folderId) {
        return res.status(400).send({
            message: "Folder name or path can not be empty"
        });
    }
    let fullPath = req.body.path+"/"+req.body.name
    // check if  folder  exists
    Folder.findById(req.body.folderId)
    .then(fold => {
        if(!fold) {
            return res.status(404).send({
                message: "Folder doesn't exists with id :" + req.body.folderId
            });            
        }
        // check if file with same name already exists in given folder
        File.find({ "folderId" : req.body.folderId, "title" : req.body.name})
        .then(files => {
            if (files.length>0) {
                res.status(400).send({
                    message:  "File already exists in given path"
                }); 
            }     
            //Create a file only if it not exists
            const file = new File({
                title: req.body.name ,
                folderId : req.body.folderId
            });

            // Save file in the database
            file.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the file."
                });
            });          
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving files."
            });
        });
    }).catch(err => {
        console.log(err)
        return res.status(500).send({
            message: "Error creating file"
        });
    });
};


// Retrieve and return all file from the folder.
exports.findAll = (req, res) => {
    File.find({ "folderId" : req.params.folderId})
    .then(files => {
        res.send(files);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving files."
        });
    });
};

// Update a file identified by the folderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "file content can not be empty"
        });
    }

    // Find file and update it with the request body
    File.findByIdAndUpdate(req.params.fileId, {
        title: req.body.name 
    }, {new: true})
    .then(file => {
        if(!file) {
            return res.status(404).send({
                message: "file not found with id " + req.params.fileId
            });
        }
        res.send(file);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "file not found with id " + req.params.fileId
            });                
        }
        return res.status(500).send({
            message: "Error updating file with id " + req.params.fileId
        });
    });
};

// Delete a file with the specified fileId in the request
exports.delete = (req, res) => {
    File.findByIdAndRemove(req.params.fileId)
    .then(file => {
        if(!file) {
            return res.status(404).send({
                message: "file not found with id " + req.params.fileId
            });
        }
        res.send({message: "file deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "file not found with id " + req.params.fileId
            });                
        }
        console.log(err)
        return res.status(500).send({
            message: "Could not delete file with id " + req.params.fileId
        });
    });
};
