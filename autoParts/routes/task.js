var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/task', function (req, res, next) {
    var payload = req.body;
    console.log("Task payload: ", JSON.stringify(payload));
    models.task.build({
        name: payload.name,
        description: payload.description
    })
        .save()
        .then(function (task){

        });
});


module.exports = router;
