var express = require('express');

var app = module.exports.app = exports.app = express();

app.use(require('connect-livereload')());
