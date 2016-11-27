var express = require('express');
var router = express.Router();
var models = require('../models');
var logger = require('../util/logger');

router.post('/task', function (req, res, next) {
    logger.info("Create new task...");
    var payload = req.body;
    logger.info("Request body: ", JSON.stringify(payload))
    console.log("Task payload: ", JSON.stringify(payload));
    models.task.build({
        name: payload.name,
        description: payload.description,
        status: payload.status
    })
        .save()
        .then(function (task) {

        })
        .catch(function (err) {
            logger.error("Error creating task: ", err);
        });
});


module.exports = router;
