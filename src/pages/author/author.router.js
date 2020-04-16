const express = require('express');
const router = express.Router();
const authorController = require('./author.controller');

router.get('/:name', authorController.authorPage);

module.exports = router;