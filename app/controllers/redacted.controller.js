const { Console } = require('console');
const fs = require('fs');
const path = require("path");

exports.getTextRedacted = (req, res) => {
    if (!req.accepts(['json', 'text'])) {
        res.send(406); //Not Acceptable
        return;
    }
    
    if (req.params.fileName == undefined || req.body.redactedPattern == undefined || req.body.redactedPattern.length === 0) {
        res.sendStatus(404); // Not Found
        return;
    }

    // create regex list to match against file text
    let redactedList = req.body.redactedPattern.replace(/[^,|\s\w]/g, '\\$&');
    redactedList = redactedList.replace(/,/g, '|');

    let fileText = "";
    let replace = `${redactedList}`;
    let regex = new RegExp(replace, "gi");

    try {
        fileText = fs.readFileSync(path.resolve(__dirname, `../data/${req.params.fileName}`), 'utf8');
    } catch (error) {
        res.send(error);
        return;
    }

    fileText = fileText.replace(regex, '\u2588\u2588\u2588\u2588');

    res.json({ fileText: fileText });
};

exports.getFileText = (req, res) => {

    if (req.params.fileName == undefined) {
        res.sendStatus(404); // Not Found
        return;
    }

    try {
        fileText = fs.readFileSync(path.resolve(__dirname, `../data/${req.params.fileName}`), 'utf8');
    } catch (error) {
        res.send(error);
        return;
    }

    res.json({ fileText: fileText });
};

exports.getFileList = (req, res) => {

    fs.readdir(path.resolve(__dirname, `../data`), (err, files) => {
        //handling error
        if (err) {
            res.send(err);
        }

        res.json(files)
    }); 
};