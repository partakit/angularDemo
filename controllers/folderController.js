var folders = require('../configs/folders.json').folders;
var fs = require('fs');
var async = require('async');

FolderController = function () { }

Array.prototype.myFind = function (obj) {
    return this.filter(function (item) {
        for (var prop in obj)
            if (!(prop in item) || obj[prop] !== item[prop])
                return false;
        return true;
    });
};
// then use:


FolderController.prototype.newFolder = function (req, res, next) {
    var newFolder = {
        name: req.body.foldername,
        _id: req.body.foldername.toString().trim(" "),
        type: "folder",
        parent: null
    };
    folders.push(newFolder);
    var obj = {
        folders: folders
    };
    fs.writeFile('./configs/folders.json', JSON.stringify(obj), 'utf8', function (err) {
        if (err) console.error(err);
        res.status(200).send(folders);
    });

}

FolderController.prototype.addImage = function (req, res, next) {
    console.log("addImage");
    var newImage = {
        name: req.body.imageUrl,
        _id: req.body.imageUrl.toString().trim(" "),
        type: "image",
        parent: req.params.id.toString()
    };
    console.log(newImage);
    folders.push(newImage);
    var obj = {
        folders: folders
    };
    fs.writeFile('./configs/folders.json', JSON.stringify(obj), 'utf8', function (err) {
        if (err) console.error(err);
        res.status(200).send(folders);
    });

}

FolderController.prototype.getFolders = function (req, res, next) {
    var subs = [];
    async.eachSeries(folders, function iterator(item, next) {
        if (item.parent == null) {
            subs.push(item);
        }
        next();
    }, function done() {
        res.status(200).send(subs);
    });

}

FolderController.prototype.getSubFolders = function (req, res, next) {
    var subs = [];
    async.eachSeries(folders, function iterator(item, next) {
        if (item.parent == req.params.id) {
            subs.push(item);
        }
        next();
    }, function done() {
        res.status(200).json(subs);
    });
}

FolderController.prototype.moveImage = function (req, res, next) {
    async.forEachOf(folders, function (value, key, next) {
        if (folders[parseInt(key)]._id == req.body.imageUrl) {
            folders[parseInt(key)].parent = req.params.id;
        }
        next();
    }, function done() {
        var obj = {
            folders: folders
        };
        fs.writeFile('./configs/folders.json', JSON.stringify(obj), 'utf8', function (err) {
            if (err) console.error(err);
            res.status(200).send(folders);
        });
    });
}


module.exports = new FolderController();