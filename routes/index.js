#!/usr/bin/node

const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/users', UserController.postNew);

module.exports = router;
