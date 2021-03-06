'use strict';/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
var async_pipe_1 = require('./pipes/async_pipe');
exports.AsyncPipe = async_pipe_1.AsyncPipe;
var date_pipe_1 = require('./pipes/date_pipe');
exports.DatePipe = date_pipe_1.DatePipe;
var default_pipes_1 = require('./pipes/default_pipes');
exports.DEFAULT_PIPES = default_pipes_1.DEFAULT_PIPES;
exports.DEFAULT_PIPES_TOKEN = default_pipes_1.DEFAULT_PIPES_TOKEN;
var json_pipe_1 = require('./pipes/json_pipe');
exports.JsonPipe = json_pipe_1.JsonPipe;
var slice_pipe_1 = require('./pipes/slice_pipe');
exports.SlicePipe = slice_pipe_1.SlicePipe;
var lowercase_pipe_1 = require('./pipes/lowercase_pipe');
exports.LowerCasePipe = lowercase_pipe_1.LowerCasePipe;
var number_pipe_1 = require('./pipes/number_pipe');
exports.NumberPipe = number_pipe_1.NumberPipe;
exports.DecimalPipe = number_pipe_1.DecimalPipe;
exports.PercentPipe = number_pipe_1.PercentPipe;
exports.CurrencyPipe = number_pipe_1.CurrencyPipe;
var uppercase_pipe_1 = require('./pipes/uppercase_pipe');
exports.UpperCasePipe = uppercase_pipe_1.UpperCasePipe;
//# sourceMappingURL=pipes.js.map