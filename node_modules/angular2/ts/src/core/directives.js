/**
 * @module
 * @description
 * Common directives shipped with Angular.
 */
System.register(['./facade/lang', './directives/ng_class', './directives/ng_for', './directives/ng_if', './directives/ng_style', './directives/ng_switch', './directives/observable_list_diff'], function(exports_1) {
    var lang_1, ng_class_1, ng_for_1, ng_if_1, ng_style_1, ng_switch_1;
    var CORE_DIRECTIVES;
    var exportedNames_1 = {
        'CORE_DIRECTIVES': true,
        'NgClass': true,
        'NgFor': true,
        'NgIf': true,
        'NgStyle': true,
        'NgSwitch': true,
        'NgSwitchWhen': true,
        'NgSwitchDefault': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (ng_class_1_1) {
                ng_class_1 = ng_class_1_1;
                exports_1({
                    "NgClass": ng_class_1_1["NgClass"]
                });
            },
            function (ng_for_1_1) {
                ng_for_1 = ng_for_1_1;
                exports_1({
                    "NgFor": ng_for_1_1["NgFor"]
                });
            },
            function (ng_if_1_1) {
                ng_if_1 = ng_if_1_1;
                exports_1({
                    "NgIf": ng_if_1_1["NgIf"]
                });
            },
            function (ng_style_1_1) {
                ng_style_1 = ng_style_1_1;
                exports_1({
                    "NgStyle": ng_style_1_1["NgStyle"]
                });
            },
            function (ng_switch_1_1) {
                ng_switch_1 = ng_switch_1_1;
                exports_1({
                    "NgSwitch": ng_switch_1_1["NgSwitch"],
                    "NgSwitchWhen": ng_switch_1_1["NgSwitchWhen"],
                    "NgSwitchDefault": ng_switch_1_1["NgSwitchDefault"]
                });
            },
            function (observable_list_diff_1_1) {
                exportStar_1(observable_list_diff_1_1);
            }],
        execute: function() {
            /**
             * A collection of Angular core directives that are likely to be used in each and every Angular
             * application.
             *
             * This collection can be used to quickly enumerate all the built-in directives in the `directives`
             * property of the `@View` annotation.
             *
             * ### Example ([live demo](http://plnkr.co/edit/yakGwpCdUkg0qfzX5m8g?p=preview))
             *
             * Instead of writing:
             *
             * ```typescript
             * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/angular2';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             * one could import all the core directives at once:
             *
             * ```typescript
             * import {CORE_DIRECTIVES} from 'angular2/angular2';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [CORE_DIRECTIVES, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             */
            CORE_DIRECTIVES = lang_1.CONST_EXPR([ng_class_1.NgClass, ng_for_1.NgFor, ng_if_1.NgIf, ng_style_1.NgStyle, ng_switch_1.NgSwitch, ng_switch_1.NgSwitchWhen, ng_switch_1.NgSwitchDefault]);
        }
    }
});
//# sourceMappingURL=directives.js.map