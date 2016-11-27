var express = require('express');
var router = express.Router();
var models = require('../models');
var logger = require('../util/logger');
var _ = require('lodash');

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
    models.task.findAll()
        .then(function (tasks) {
            logger.info("Find tasks.");
            res.status(200).send({status: 0, message: "Task updated", data: tasks});
        })
        .catch(function (err) {
            logger.error("Getting tasks: ", err);
            res.status(500).send({status: 1, message: "Error getting tasks: " + err});
        })
});

router.get('/task/:id', function (req, res, next) {
    logger.info("Getting task by id...");
    models.task.find({
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
