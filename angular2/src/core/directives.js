'use strict';/**
 * @module
 * @description
 * Common directives shipped with Angular.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('./facade/lang');
var ng_class_1 = require('./directives/ng_class');
var ng_for_1 = require('./directives/ng_for');
var ng_if_1 = require('./directives/ng_if');
var ng_style_1 = require('./directives/ng_style');
var ng_switch_1 = require('./directives/ng_switch');
var ng_class_2 = require('./directives/ng_class');
exports.NgClass = ng_class_2.NgClass;
var ng_for_2 = require('./directives/ng_for');
exports.NgFor = ng_for_2.NgFor;
var ng_if_2 = require('./directives/ng_if');
exports.NgIf = ng_if_2.NgIf;
var ng_style_2 = require('./directives/ng_style');
exports.NgStyle = ng_style_2.NgStyle;
var ng_switch_2 = require('./directives/ng_switch');
exports.NgSwitch = ng_switch_2.NgSwitch;
exports.NgSwitchWhen = ng_switch_2.NgSwitchWhen;
exports.NgSwitchDefault = ng_switch_2.NgSwitchDefault;
__export(require('./directives/observable_list_diff'));
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
exports.CORE_DIRECTIVES = lang_1.CONST_EXPR([ng_class_1.NgClass, ng_for_1.NgFor, ng_if_1.NgIf, ng_style_1.NgStyle, ng_switch_1.NgSwitch, ng_switch_1.NgSwitchWhen, ng_switch_1.NgSwitchDefault]);
//# sourceMappingURL=directives.js.map