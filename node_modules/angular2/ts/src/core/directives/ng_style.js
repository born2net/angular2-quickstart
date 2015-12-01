System.register(['angular2/src/core/metadata', 'angular2/src/core/facade/lang'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var metadata_1, lang_1;
    var NgStyle;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * The `NgStyle` directive changes styles based on a result of expression evaluation.
             *
             * An expression assigned to the `ng-style` property must evaluate to an object and the
             * corresponding element styles are updated based on changes to this object. Style names to update
             * are taken from the object's keys, and values - from the corresponding object's values.
             *
             * # Syntax
             *
             * - `<div [ng-style]="{'font-style': style}"></div>`
             * - `<div [ng-style]="styleExp"></div>` - here the `styleExp` must evaluate to an object
             *
             * ### Example ([live demo](http://plnkr.co/edit/YamGS6GkUh9GqWNQhCyM?p=preview)):
             *
             * ```
             * import {Component, NgStyle} from 'angular2/angular2';
             *
             * @Component({
             *  selector: 'ng-style-example',
             *  template: `
             *    <h1 [ng-style]="{'font-style': style, 'font-size': size, 'font-weight': weight}">
             *      Change style of this text!
             *    </h1>
             *
             *    <hr>
             *
             *    <label>Italic: <input type="checkbox" (change)="changeStyle($event)"></label>
             *    <label>Bold: <input type="checkbox" (change)="changeWeight($event)"></label>
             *    <label>Size: <input type="text" [value]="size" (change)="size = $event.target.value"></label>
             *  `,
             *  directives: [NgStyle]
             * })
             * export class NgStyleExample {
             *    style = 'normal';
             *    weight = 'normal';
             *    size = '20px';
             *
             *    changeStyle($event: any) {
             *      this.style = $event.target.checked ? 'italic' : 'normal';
             *    }
             *
             *    changeWeight($event: any) {
             *      this.weight = $event.target.checked ? 'bold' : 'normal';
             *    }
             * }
             * ```
             *
             * In this example the `font-style`, `font-size` and `font-weight` styles will be updated
             * based on the `style` property's value changes.
             */
            let NgStyle = class {
                constructor(_differs, _ngEl, _renderer) {
                    this._differs = _differs;
                    this._ngEl = _ngEl;
                    this._renderer = _renderer;
                }
                set rawStyle(v) {
                    this._rawStyle = v;
                    if (lang_1.isBlank(this._differ) && lang_1.isPresent(v)) {
                        this._differ = this._differs.find(this._rawStyle).create(null);
                    }
                }
                doCheck() {
                    if (lang_1.isPresent(this._differ)) {
                        var changes = this._differ.diff(this._rawStyle);
                        if (lang_1.isPresent(changes)) {
                            this._applyChanges(changes);
                        }
                    }
                }
                _applyChanges(changes) {
                    changes.forEachAddedItem((record) => { this._setStyle(record.key, record.currentValue); });
                    changes.forEachChangedItem((record) => { this._setStyle(record.key, record.currentValue); });
                    changes.forEachRemovedItem((record) => { this._setStyle(record.key, null); });
                }
                _setStyle(name, val) {
                    this._renderer.setElementStyle(this._ngEl, name, val);
                }
            };
            NgStyle = __decorate([
                metadata_1.Directive({ selector: '[ng-style]', inputs: ['rawStyle: ng-style'] })
            ], NgStyle);
            NgStyle = NgStyle;
        }
    }
});
//# sourceMappingURL=ng_style.js.map