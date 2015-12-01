System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/intl', 'angular2/src/core/di', 'angular2/src/core/metadata', 'angular2/src/core/facade/collection', './invalid_pipe_argument_exception'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var lang_1, intl_1, di_1, metadata_1, collection_1, invalid_pipe_argument_exception_1;
    var defaultLocale, DatePipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (intl_1_1) {
                intl_1 = intl_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            // TODO: move to a global configurable location along with other i18n components.
            var defaultLocale = 'en-US';
            /**
             * WARNING: this pipe uses the Internationalization API.
             * Therefore it is only reliable in Chrome and Opera browsers.
             *
             * Formats a date value to a string based on the requested format.
             *
             * # Usage
             *
             *     expression | date[:format]
             *
             * where `expression` is a date object or a number (milliseconds since UTC epoch) and
             * `format` indicates which date/time components to include:
             *
             *  | Component | Symbol | Short Form   | Long Form         | Numeric   | 2-digit   |
             *  |-----------|:------:|--------------|-------------------|-----------|-----------|
             *  | era       |   G    | G (AD)       | GGGG (Anno Domini)| -         | -         |
             *  | year      |   y    | -            | -                 | y (2015)  | yy (15)   |
             *  | month     |   M    | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
             *  | day       |   d    | -            | -                 | d (3)     | dd (03)   |
             *  | weekday   |   E    | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
             *  | hour      |   j    | -            | -                 | j (13)    | jj (13)   |
             *  | hour12    |   h    | -            | -                 | h (1 PM)  | hh (01 PM)|
             *  | hour24    |   H    | -            | -                 | H (13)    | HH (13)   |
             *  | minute    |   m    | -            | -                 | m (5)     | mm (05)   |
             *  | second    |   s    | -            | -                 | s (9)     | ss (09)   |
             *  | timezone  |   z    | -            | z (Pacific Standard Time)| -  | -         |
             *  | timezone  |   Z    | Z (GMT-8:00) | -                 | -         | -         |
             *
             * In javascript, only the components specified will be respected (not the ordering,
             * punctuations, ...) and details of the formatting will be dependent on the locale.
             * On the other hand in Dart version, you can also include quoted text as well as some extra
             * date/time components such as quarter. For more information see:
             * https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/intl/intl.DateFormat.
             *
             * `format` can also be one of the following predefined formats:
             *
             *  - `'medium'`: equivalent to `'yMMMdjms'` (e.g. Sep 3, 2010, 12:05:08 PM for en-US)
             *  - `'short'`: equivalent to `'yMdjm'` (e.g. 9/3/2010, 12:05 PM for en-US)
             *  - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. Friday, September 3, 2010 for en-US)
             *  - `'longDate'`: equivalent to `'yMMMMd'` (e.g. September 3, 2010)
             *  - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. Sep 3, 2010 for en-US)
             *  - `'shortDate'`: equivalent to `'yMd'` (e.g. 9/3/2010 for en-US)
             *  - `'mediumTime'`: equivalent to `'jms'` (e.g. 12:05:08 PM for en-US)
             *  - `'shortTime'`: equivalent to `'jm'` (e.g. 12:05 PM for en-US)
             *
             * Timezone of the formatted text will be the local system timezone of the end-users machine.
             *
             * # Examples
             *
             * Assuming `dateObj` is (year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11)
             * in the _local_ time and locale is 'en-US':
             *
             *     {{ dateObj | date }}               // output is 'Jun 15, 2015'
             *     {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
             *     {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
             *     {{ dateObj | date:'mmss' }}        // output is '43:11'
             */
            let DatePipe = class {
                transform(value, args) {
                    if (lang_1.isBlank(value))
                        return null;
                    if (!this.supports(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(DatePipe, value);
                    }
                    var pattern = lang_1.isPresent(args) && args.length > 0 ? args[0] : 'mediumDate';
                    if (lang_1.isNumber(value)) {
                        value = lang_1.DateWrapper.fromMillis(value);
                    }
                    if (collection_1.StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
                        pattern = collection_1.StringMapWrapper.get(DatePipe._ALIASES, pattern);
                    }
                    return intl_1.DateFormatter.format(value, defaultLocale, pattern);
                }
                supports(obj) { return lang_1.isDate(obj) || lang_1.isNumber(obj); }
            };
            DatePipe._ALIASES = {
                'medium': 'yMMMdjms',
                'short': 'yMdjm',
                'fullDate': 'yMMMMEEEEd',
                'longDate': 'yMMMMd',
                'mediumDate': 'yMMMd',
                'shortDate': 'yMd',
                'mediumTime': 'jms',
                'shortTime': 'jm'
            };
            DatePipe = __decorate([
                lang_1.CONST(),
                metadata_1.Pipe({ name: 'date' }),
                di_1.Injectable()
            ], DatePipe);
            DatePipe = DatePipe;
        }
    }
});
//# sourceMappingURL=date_pipe.js.map