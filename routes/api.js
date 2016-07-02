"use strict;"

const express = require('express');

let router = express.Router();

router.use('/movies', require('./movies'));

module.exports = router;

