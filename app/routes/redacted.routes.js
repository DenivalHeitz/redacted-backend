module.exports = app => {
    const redacted = require("../controllers/redacted.controller.js");
    var router = require("express").Router();

    // Retrieve all state vax data
    router.post("/redacted-file/:fileName", redacted.getTextRedacted);
    router.get("/file/:fileName", redacted.getFileText);
    router.get("/files", redacted.getFileList);

    
    app.use('/api', router);
}