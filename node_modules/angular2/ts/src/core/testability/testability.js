System.register(['angular2/src/core/di', 'angular2/src/core/dom/dom_adapter', 'angular2/src/core/facade/collection', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/src/core/facade/async'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, dom_adapter_1, collection_1, lang_1, exceptions_1, async_1;
    var Testability, TestabilityRegistry, NoopGetTestability, testabilityGetter;
    function setTestabilityGetter(getter) {
        testabilityGetter = getter;
    }
    exports_1("setTestabilityGetter", setTestabilityGetter);
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * The Testability service provides testing hooks that can be accessed from
             * the browser and by services such as Protractor. Each bootstrapped Angular
             * application on the page will have an instance of Testability.
             */
            let Testability = class {
                constructor(_ngZone) {
                    /** @internal */
                    this._pendingCount = 0;
                    /** @internal */
                    this._callbacks = [];
                    /** @internal */
                    this._isAngularEventPending = false;
                    this._watchAngularEvents(_ngZone);
                }
                /** @internal */
                _watchAngularEvents(_ngZone) {
                    _ngZone.overrideOnTurnStart(() => { this._isAngularEventPending = true; });
                    _ngZone.overrideOnEventDone(() => {
                        this._isAngularEventPending = false;
                        this._runCallbacksIfReady();
                    }, true);
                }
                increasePendingRequestCount() {
                    this._pendingCount += 1;
                    return this._pendingCount;
                }
                decreasePendingRequestCount() {
                    this._pendingCount -= 1;
                    if (this._pendingCount < 0) {
                        throw new exceptions_1.BaseException('pending async requests below zero');
                    }
                    this._runCallbacksIfReady();
                    return this._pendingCount;
                }
                isStable() { return this._pendingCount == 0 && !this._isAngularEventPending; }
                /** @internal */
                _runCallbacksIfReady() {
                    if (!this.isStable()) {
                        return; // Not ready
                    }
                    // Schedules the call backs in a new frame so that it is always async.
                    async_1.PromiseWrapper.resolve(null).then((_) => {
                        while (this._callbacks.length !== 0) {
                            (this._callbacks.pop())();
                        }
                    });
                }
                whenStable(callback) {
                    this._callbacks.push(callback);
                    this._runCallbacksIfReady();
                }
                getPendingRequestCount() { return this._pendingCount; }
                // This only accounts for ngZone, and not pending counts. Use `whenStable` to
                // check for stability.
                isAngularEventPending() { return this._isAngularEventPending; }
                findBindings(using, provider, exactMatch) {
                    // TODO(juliemr): implement.
                    return [];
                }
                findProviders(using, provider, exactMatch) {
                    // TODO(juliemr): implement.
                    return [];
                }
            };
            Testability = __decorate([
                di_1.Injectable()
            ], Testability);
            Testability = Testability;
            let TestabilityRegistry = class {
                constructor() {
                    /** @internal */
                    this._applications = new collection_1.Map();
                    testabilityGetter.addToWindow(this);
                }
                registerApplication(token, testability) {
                    this._applications.set(token, testability);
                }
                getAllTestabilities() { return collection_1.MapWrapper.values(this._applications); }
                findTestabilityInTree(elem, findInAncestors = true) {
                    if (elem == null) {
                        return null;
                    }
                    if (this._applications.has(elem)) {
                        return this._applications.get(elem);
                    }
                    else if (!findInAncestors) {
                        return null;
                    }
                    if (dom_adapter_1.DOM.isShadowRoot(elem)) {
                        return this.findTestabilityInTree(dom_adapter_1.DOM.getHost(elem));
                    }
                    return this.findTestabilityInTree(dom_adapter_1.DOM.parentElement(elem));
                }
            };
            TestabilityRegistry = __decorate([
                di_1.Injectable()
            ], TestabilityRegistry);
            TestabilityRegistry = TestabilityRegistry;
            let NoopGetTestability = class {
                addToWindow(registry) { }
            };
            NoopGetTestability = __decorate([
                lang_1.CONST()
            ], NoopGetTestability);
            var testabilityGetter = lang_1.CONST_EXPR(new NoopGetTestability());
        }
    }
});
//# sourceMappingURL=testability.js.map