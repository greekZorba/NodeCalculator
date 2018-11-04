var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

var main = require('./main/main')
var calculator = require('./calculator/calculator')

router.use('/main', main);
router.use('/calculator', calculator);

module.exports = router;