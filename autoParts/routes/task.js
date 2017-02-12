var express = require('express');
var router = express.Router();
var models = require('../models');
var logger = require('../util/logger');
var base64Dictionary = require('../services/base64Dictionary');
var config = require('../config/configuration.json');
var uuid = require('node-uuid');
var _ = require('lodash');
// var url = "../plugins/" + config.environment.projectName.toLowerCase() + "/scripts";
var helpers = require('../plugins/addiko/scripts');
var returned = require('../util/returned');

router.post('/task', function (req, res, next) {
    logger.info("Create new task...");
    var payload = req.body;
    logger.info("Request body: ", JSON.stringify(payload))
    console.log("Task payload: ", JSON.stringify(payload));
    models.task.build(req.body)
        .save()
        .then(function (task) {
            logger.info("New task created.");
            res.status(201).send({status: 0, message: "new task created.", data: task})
        })
        .catch(function (err) {
            logger.error("Error creating task: ", err);
            res.status(500).send({status: 1, message: "error creating task: " + err})
        });
});

router.get('/task', function (req, res, next) {
    logger.info("Getting tasks...");
    // var testArray = [{
    //     Identificator: "1",
    //     ImageData: "test1"
    // },
    //     {
    //         Identificator: "2",
    //         ImageData: "test2"
    //     },
    //     {
    //         Identificator: "3",
    //         ImageData: "test3"
    //     },
    //     {
    //         Identificator: "4",
    //         ImageData: "test4"
    //     }];
    //
    // base64Dictionary.setGeneratedRandomNumbers(1, 4);
    // base64Dictionary.emptyImageMap();
    // base64Dictionary.setBase64Dictionary(testArray, 1);
    //
    //
    // //another try with image generator
    // var testArray2 = [{
    //     Identificator: "5",
    //     ImageData: "test5"
    // },
    //     {
    //         Identificator: "6",
    //         ImageData: "test6"
    //     },
    //     {
    //         Identificator: "7",
    //         ImageData: "test7"
    //     },
    //     {
    //         Identificator: "8",
    //         ImageData: "test8"
    //     }];
    //
    // base64Dictionary.setGeneratedRandomNumbers(1, 4);
    // base64Dictionary.emptyImageMap();
    // base64Dictionary.setBase64Dictionary(testArray2, 1);

    // helpers['test1'].execute();
    models['task'].findAll()
        .then(function (tasks) {
            logger.info("Find tasks.");
            var returnedObj = new returned;
            returnedObj.qweqwe = "Message";
            returnedObj.keyboard = "My keyboard";
            returnedObj.test = "My test";
            returnedObj.test1 = "My test";
            logger.info("Returned object: ", returnedObj);
            console.log("Returned object: ", JSON.stringify(returnedObj));
            res.status(200).send({status: 0, message: "Find tasks successfully!", data: tasks});
        })
        .catch(function (err) {
            logger.error("Getting tasks: ", err);
            res.status(500).send({status: 1, message: "Error getting tasks: " + err});
        })
});

router.get('/task/:id', function (req, res, next) {
    logger.info("Getting task by id...");
    models['task'].find({
        where: {
            id: req.params.id
        }
    })
        .then(function (task) {
            logger.info("Find task by Id.");
            res.status(200).send({status: 0, message: "Find task", data: task});
        })
        .catch(function (err) {
            logger.error("Getting task by Id: ", err);
            res.status(500).send({status: 1, message: "Error getting task by Id: " + err});
        })
});

router.put('/task/:id', function (req, res, next) {
    logger.info("Updating task...");
    models.task.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(function (task) {
            logger.info("Task updated.");
            res.status(200).send({status: 0, message: "Task updated.", data: task});
        })
        .catch(function (err) {
            logger.error("Updating task: ", err);
            res.status(500).send({status: 1, message: "Error updating task: " + err});
        })
});

router.get('/encode', function (req, res) {
    // var identificator = ["4218UzpPmDV6HcFN1WwwAAFJFvwOaoz8v18heqNQNf0=","dvOpMKx1ikqdogrLca9UZ4MbSED9BgLbjOJKUWSnIBA=",
    //     "nMlaAdll3QgFY48dshTdM/18PKe6dYBYUUfCnXr77eM=","nscw80L0Mrlh8djxiEqqo+wv1xiptGS61DE7ffzz2b0="]
    // var payload = {
    //     Id: "2e44c70c-f0cd-488b-8661-ae5a163f548a",
    //     AuthenticationType: 0,
    //     Authentication: identificator
    // };

    //add authorization header check
    var token = req.get('Authorization');
    logger.info("Authorization token: ", token);
    logger.info("Authorization token: ", typeof token);
    logger.info("Real Authorization token: ", config.environment.authToken);
    if (!token || token !== config.environment.authToken) {
        return res.status(401).send({msg: "Unauthorized request"});
    }
    var payload = 'vbot:123456';
    var buff = new Buffer(JSON.stringify(payload)).toString("base64");
    res.status(200).send({encoded: buff});
});

router.get('/randomNum', function (req, res){
    var randomNum = uuid.v4();
    res.status(200).send({random: randomNum})
});

router.delete('/task/:id', function (req, res, next) {
    logger.info("Deleting task...");
    models.task.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (data) {
            logger.info("Task deleted: ", data);
            res.status(200).send({status: 0, message: "Task deleted.", count: data});
        })
        .catch(function (err) {
            logger.error("Deleting task: ", err);
            res.status(500).send({status: 1, message: "Error deleting task: " + err});
        })
});

module.exports = router;
