const Folder = require('../models/folder.model.js');

// Create and Save a new folder
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.path) {
        return res.status(400).send({
            message: "Folder name or path can not be empty"
        });
    }
    let fullPath = req.body.path+"/"+(req.body.name == '/' ?  "" : req.body.name)
    // check if folder path already exists
    Folder.find({"fullPath" : fullPath})
    .then(fold => {
        if(fold.length > 0) {
            return res.status(404).send({
                message: "Folder already found with path " + fullPath
            });            
        }
        //Create a folder if it is not exists
        const folder = new Folder({
            title: req.body.name ,
            fullPath : fullPath ,
            path : req.body.path
        });

        // Save folder in the database
        folder.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Folder."
            });
        });
    }).catch(err => {
        return res.status(500).send({
            message: "Error creating folder"
        });
    });
};

// Retrieve and return all folders from the database.
exports.findAll = (req, res) => {
    Folder.find()
    .then(folders => {
        res.send(folders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving folders."
        });
    });
};

// Find a single folder with a folderId
exports.findOne = (req, res) => {
    Folder.findById(req.params.folderId)
    .then(folder => {
        if(!folder) {
            return res.status(404).send({
                message: "Folder not found with id " + req.params.folderId
            });            
        }
        res.send(folder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "folder not found with id " + req.params.folderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving folder with id " + req.params.folderId
        });
    });
};

// Update a folder identified by the folderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name && !req.body.path) {
        return res.status(400).send({
            message: "folder content can not be empty"
        });
    }

    // Find folder and update it with the request body
    Folder.findByIdAndUpdate(req.params.folderId, {
        title: req.body.name ,
        fullPath : req.body.path+ "/"+ req.body.name ,
        path : req.body.path
    }, {new: true})
    .then(folder => {
        if(!folder) {
            return res.status(404).send({
                message: "folder not found with id " + req.params.folderId
            });
        }
        res.send(folder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "folder not found with id " + req.params.folderId
            });                
        }
        return res.status(500).send({
            message: "Error updating folder with id " + req.params.folderId
        });
    });
};

// Delete a folder with the specified folderId in the request
exports.delete = (req, res) => {
    Folder.findByIdAndRemove(req.params.folderId)
    .then(folder => {
        if(!folder) {
            return res.status(404).send({
                message: "folder not found with id " + req.params.folderId
            });
        }
        res.send({message: "folder deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "folder not found with id " + req.params.folderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete folder with id " + req.params.folderId
        });
    });
};
