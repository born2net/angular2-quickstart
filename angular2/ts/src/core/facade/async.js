System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/promise'], function(exports_1) {
    var lang_1;
    var Subject, TimerWrapper, ObservableWrapper, Observable, EventEmitter;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (promise_1_1) {
                exports_1({
                    "PromiseWrapper": promise_1_1["PromiseWrapper"],
                    "Promise": promise_1_1["Promise"],
                    "PromiseCompleter": promise_1_1["PromiseCompleter"]
                });
            }],
        execute: function() {
            // TODO(jeffbcross): use ES6 import once typings are available
            var Subject = require('@reactivex/rxjs/dist/cjs/Subject');
            class TimerWrapper {
                static setTimeout(fn, millis) {
                    return lang_1.global.setTimeout(fn, millis);
                }
                static clearTimeout(id) { lang_1.global.clearTimeout(id); }
                static setInterval(fn, millis) {
                    return lang_1.global.setInterval(fn, millis);
                }
                static clearInterval(id) { lang_1.global.clearInterval(id); }
            }
            TimerWrapper = TimerWrapper;
            class ObservableWrapper {
                // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
                static subscribe(emitter, onNext, onThrow = null, onReturn = null) {
                    return emitter.observer({ next: onNext, throw: onThrow, return: onReturn });
                }
                static isObservable(obs) { return obs instanceof Observable; }
                static dispose(subscription) { subscription.unsubscribe(); }
                static callNext(emitter, value) { emitter.next(value); }
                static callThrow(emitter, error) { emitter.throw(error); }
                static callReturn(emitter) { emitter.return(null); }
            }
            ObservableWrapper = ObservableWrapper;
            // TODO: vsavkin change to interface
            class Observable {
                observer(generator) { return null; }
            }
            Observable = Observable;
            /**
             * Use by directives and components to emit custom Events.
             *
             * ## Examples
             *
             * In the following example, `Zippy` alternatively emits `open` and `close` events when its
             * title gets clicked:
             *
             * ```
             * @Component({
             *   selector: 'zippy',
             *   template: `
             *   <div class="zippy">
             *     <div (click)="toggle()">Toggle</div>
             *     <div [hidden]="!visible">
             *       <ng-content></ng-content>
             *     </div>
             *  </div>`})
             * export class Zippy {
             *   visible: boolean = true;
             *   @Output() open: EventEmitter = new EventEmitter();
             *   @Output() close: EventEmitter = new EventEmitter();
             *
             *   toggle() {
             *     this.visible = !this.visible;
             *     if (this.visible) {
             *       this.open.next(null);
             *     } else {
             *       this.close.next(null);
             *     }
             *   }
             * }
             * ```
             *
             * Use Rx.Observable but provides an adapter to make it work as specified here:
             * https://github.com/jhusain/observable-spec
             *
             * Once a reference implementation of the spec is available, switch to it.
             */
            class EventEmitter extends Observable {
                constructor(...args) {
                    super(...args);
                    /** @internal */
                    this._subject = new Subject();
                }
                observer(generator) {
                    return this._subject.subscribe((value) => { setTimeout(() => generator.next(value)); }, (error) => generator.throw ? generator.throw(error) : null, () => generator.return ? generator.return() : null);
                }
                toRx() { return this._subject; }
                next(value) { this._subject.next(value); }
                throw(error) { this._subject.error(error); }
                return(value) { this._subject.complete(); }
            }
            EventEmitter = EventEmitter;
        }
    }
});
//# sourceMappingURL=async.js.map