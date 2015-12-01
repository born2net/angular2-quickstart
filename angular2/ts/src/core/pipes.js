/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
System.register(['./pipes/async_pipe', './pipes/date_pipe', './pipes/default_pipes', './pipes/json_pipe', './pipes/slice_pipe', './pipes/lowercase_pipe', './pipes/number_pipe', './pipes/uppercase_pipe'], function(exports_1) {
    return {
        setters:[
            function (async_pipe_1_1) {
                exports_1({
                    "AsyncPipe": async_pipe_1_1["AsyncPipe"]
                });
            },
            function (date_pipe_1_1) {
                exports_1({
                    "DatePipe": date_pipe_1_1["DatePipe"]
                });
            },
            function (default_pipes_1_1) {
                exports_1({
                    "DEFAULT_PIPES": default_pipes_1_1["DEFAULT_PIPES"],
                    "DEFAULT_PIPES_TOKEN": default_pipes_1_1["DEFAULT_PIPES_TOKEN"]
                });
            },
            function (json_pipe_1_1) {
                exports_1({
                    "JsonPipe": json_pipe_1_1["JsonPipe"]
                });
            },
            function (slice_pipe_1_1) {
                exports_1({
                    "SlicePipe": slice_pipe_1_1["SlicePipe"]
                });
            },
            function (lowercase_pipe_1_1) {
                exports_1({
                    "LowerCasePipe": lowercase_pipe_1_1["LowerCasePipe"]
                });
            },
            function (number_pipe_1_1) {
                exports_1({
                    "NumberPipe": number_pipe_1_1["NumberPipe"],
                    "DecimalPipe": number_pipe_1_1["DecimalPipe"],
                    "PercentPipe": number_pipe_1_1["PercentPipe"],
                    "CurrencyPipe": number_pipe_1_1["CurrencyPipe"]
                });
            },
            function (uppercase_pipe_1_1) {
                exports_1({
                    "UpperCasePipe": uppercase_pipe_1_1["UpperCasePipe"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=pipes.js.map