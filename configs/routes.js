var folderController = require('../controllers/folderController');

module.exports = function (app) {
    app.post('/api/folder', folderController.newFolder);
    app.get('/api/folder', folderController.getFolders);
    app.post('/api/folder/:id', folderController.addImage);
    app.get('/api/folder/:id', folderController.getSubFolders);
    app.post('/api/folder/:id/move', folderController.moveImage);
}