module.exports = (app) => {
    const folder = require('../controllers/folder.controller.js');
    const fileController = require('../controllers/file.controller.js');
    // Create a new folder
    app.post('/folder', folder.create);

    // Retrieve all folders
    app.get('/folder', folder.findAll);

    // Retrieve a single folder
    app.get('/folder/:folderId', folder.findOne);

    // Update a folder with folderId
    app.put('/folder/:folderId', folder.update);

    // Delete a folder with folderId
    app.delete('/folder/:folderId', folder.delete);

    // Create a new file
    app.post('/fileData', fileController.create);

    // Retrieve all files within a folder
    app.get('/fileData/:folderId', fileController.findAll);


    // Update a file with fileId
    app.put('/fileData/:fileId', fileController.update);

    // Delete a file with fileId
    app.delete('/fileData/:fileId', fileController.delete);
}
