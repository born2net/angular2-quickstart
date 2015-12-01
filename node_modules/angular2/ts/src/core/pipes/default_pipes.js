System.register(['./async_pipe', './uppercase_pipe', './lowercase_pipe', './json_pipe', './slice_pipe', './date_pipe', './number_pipe', 'angular2/src/core/facade/lang', 'angular2/src/core/di'], function(exports_1) {
    var async_pipe_1, uppercase_pipe_1, lowercase_pipe_1, json_pipe_1, slice_pipe_1, date_pipe_1, number_pipe_1, lang_1, di_1;
    var DEFAULT_PIPES_LIST, DEFAULT_PIPES_TOKEN, DEFAULT_PIPES;
    return {
        setters:[
            function (async_pipe_1_1) {
                async_pipe_1 = async_pipe_1_1;
            },
            function (uppercase_pipe_1_1) {
                uppercase_pipe_1 = uppercase_pipe_1_1;
            },
            function (lowercase_pipe_1_1) {
                lowercase_pipe_1 = lowercase_pipe_1_1;
            },
            function (json_pipe_1_1) {
                json_pipe_1 = json_pipe_1_1;
            },
            function (slice_pipe_1_1) {
                slice_pipe_1 = slice_pipe_1_1;
            },
            function (date_pipe_1_1) {
                date_pipe_1 = date_pipe_1_1;
            },
            function (number_pipe_1_1) {
                number_pipe_1 = number_pipe_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            const DEFAULT_PIPES_LIST = lang_1.CONST_EXPR([
                async_pipe_1.AsyncPipe,
                uppercase_pipe_1.UpperCasePipe,
                lowercase_pipe_1.LowerCasePipe,
                json_pipe_1.JsonPipe,
                slice_pipe_1.SlicePipe,
                number_pipe_1.DecimalPipe,
                number_pipe_1.PercentPipe,
                number_pipe_1.CurrencyPipe,
                date_pipe_1.DatePipe
            ]);
            DEFAULT_PIPES_TOKEN = lang_1.CONST_EXPR(new di_1.OpaqueToken("Default Pipes"));
            DEFAULT_PIPES = lang_1.CONST_EXPR(new di_1.Provider(DEFAULT_PIPES_TOKEN, { useValue: DEFAULT_PIPES_LIST }));
        }
    }
});
//# sourceMappingURL=default_pipes.js.map