"use strict;"

const express = require('express');

let router = express.Router();

router.use('/movies', require('./movies'));
router.use('/beers', require('./beers'));

module.exports = router;

