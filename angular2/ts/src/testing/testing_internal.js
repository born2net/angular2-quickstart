System.register(['angular2/src/core/facade/collection', 'angular2/src/core/facade/lang', 'angular2/src/core/di', './test_injector', './utils', './matchers'], function(exports_1) {
    var collection_1, lang_1, di_1, test_injector_1, utils_1;
    var proxy, _global, afterEach, AsyncTestCompleter, jsmBeforeEach, jsmDescribe, jsmDDescribe, jsmXDescribe, jsmIt, jsmIIt, jsmXIt, runnerStack, inIt, globalTimeOut, testProviders, BeforeEachRunner, SpyObject;
    function _describe(jsmFn, ...args) {
        var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
        var runner = new BeforeEachRunner(parentRunner);
        runnerStack.push(runner);
        var suite = jsmFn(...args);
        runnerStack.pop();
        return suite;
    }
    function describe(...args) {
        return _describe(jsmDescribe, ...args);
    }
    exports_1("describe", describe);
    function ddescribe(...args) {
        return _describe(jsmDDescribe, ...args);
    }
    exports_1("ddescribe", ddescribe);
    function xdescribe(...args) {
        return _describe(jsmXDescribe, ...args);
    }
    exports_1("xdescribe", xdescribe);
    function beforeEach(fn) {
        if (runnerStack.length > 0) {
            // Inside a describe block, beforeEach() uses a BeforeEachRunner
            runnerStack[runnerStack.length - 1].beforeEach(fn);
        }
        else {
            // Top level beforeEach() are delegated to jasmine
            jsmBeforeEach(fn);
        }
    }
    exports_1("beforeEach", beforeEach);
    /**
     * Allows overriding default providers defined in test_injector.js.
     *
     * The given function must return a list of DI providers.
     *
     * Example:
     *
     *   beforeEachBindings(() => [
     *     provide(Compiler, {useClass: MockCompiler}),
     *     provide(SomeToken, {useValue: myValue}),
     *   ]);
     */
    function beforeEachProviders(fn) {
        jsmBeforeEach(() => {
            var bindings = fn();
            if (!bindings)
                return;
            testProviders = [...testProviders, ...bindings];
        });
    }
    exports_1("beforeEachProviders", beforeEachProviders);
    /**
     * @deprecated
     */
    function beforeEachBindings(fn) {
        beforeEachProviders(fn);
    }
    exports_1("beforeEachBindings", beforeEachBindings);
    function _it(jsmFn, name, testFn, testTimeOut) {
        var runner = runnerStack[runnerStack.length - 1];
        var timeOut = lang_1.Math.max(globalTimeOut, testTimeOut);
        if (testFn instanceof test_injector_1.FunctionWithParamTokens) {
            // The test case uses inject(). ie `it('test', inject([AsyncTestCompleter], (async) => { ...
            // }));`
            if (testFn.hasToken(AsyncTestCompleter)) {
                jsmFn(name, (done) => {
                    var completerProvider = di_1.provide(AsyncTestCompleter, {
                        useFactory: () => {
                            // Mark the test as async when an AsyncTestCompleter is injected in an it()
                            if (!inIt)
                                throw new Error('AsyncTestCompleter can only be injected in an "it()"');
                            return new AsyncTestCompleter(done);
                        }
                    });
                    var injector = test_injector_1.createTestInjector([...testProviders, completerProvider]);
                    runner.run(injector);
                    inIt = true;
                    testFn.execute(injector);
                    inIt = false;
                }, timeOut);
            }
            else {
                jsmFn(name, () => {
                    var injector = test_injector_1.createTestInjector(testProviders);
                    runner.run(injector);
                    testFn.execute(injector);
                }, timeOut);
            }
        }
        else {
            // The test case doesn't use inject(). ie `it('test', (done) => { ... }));`
            if (testFn.length === 0) {
                jsmFn(name, () => {
                    var injector = test_injector_1.createTestInjector(testProviders);
                    runner.run(injector);
                    testFn();
                }, timeOut);
            }
            else {
                jsmFn(name, (done) => {
                    var injector = test_injector_1.createTestInjector(testProviders);
                    runner.run(injector);
                    testFn(done);
                }, timeOut);
            }
        }
    }
    function it(name, fn, timeOut = null) {
        return _it(jsmIt, name, fn, timeOut);
    }
    exports_1("it", it);
    function xit(name, fn, timeOut = null) {
        return _it(jsmXIt, name, fn, timeOut);
    }
    exports_1("xit", xit);
    function iit(name, fn, timeOut = null) {
        return _it(jsmIIt, name, fn, timeOut);
    }
    exports_1("iit", iit);
    function isInInnerZone() {
        return lang_1.global.zone._innerZone === true;
    }
    exports_1("isInInnerZone", isInInnerZone);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (test_injector_1_1) {
                test_injector_1 = test_injector_1_1;
                exports_1({
                    "inject": test_injector_1_1["inject"]
                });
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (matchers_1_1) {
                exports_1({
                    "expect": matchers_1_1["expect"],
                    "NgMatchers": matchers_1_1["NgMatchers"]
                });
            }],
        execute: function() {
            proxy = (t) => t;
            var _global = (typeof window === 'undefined' ? lang_1.global : window);
            afterEach = _global.afterEach;
            class AsyncTestCompleter {
                constructor(_done) {
                    this._done = _done;
                }
                done() { this._done(); }
            }
            AsyncTestCompleter = AsyncTestCompleter;
            var jsmBeforeEach = _global.beforeEach;
            var jsmDescribe = _global.describe;
            var jsmDDescribe = _global.fdescribe;
            var jsmXDescribe = _global.xdescribe;
            var jsmIt = _global.it;
            var jsmIIt = _global.fit;
            var jsmXIt = _global.xit;
            var runnerStack = [];
            var inIt = false;
            var globalTimeOut = utils_1.browserDetection.isSlow ? 3000 : jasmine.DEFAULT_TIMEOUT_INTERVAL;
            var testProviders;
            /**
             * Mechanism to run `beforeEach()` functions of Angular tests.
             *
             * Note: Jasmine own `beforeEach` is used by this library to handle DI providers.
             */
            class BeforeEachRunner {
                constructor(_parent) {
                    this._parent = _parent;
                    this._fns = [];
                }
                beforeEach(fn) { this._fns.push(fn); }
                run(injector) {
                    if (this._parent)
                        this._parent.run(injector);
                    this._fns.forEach((fn) => {
                        return lang_1.isFunction(fn) ? fn() : fn.execute(injector);
                    });
                }
            }
            // Reset the test providers before each test
            jsmBeforeEach(() => { testProviders = []; });
            class SpyObject {
                constructor(type = null) {
                    if (type) {
                        for (var prop in type.prototype) {
                            var m = null;
                            try {
                                m = type.prototype[prop];
                            }
                            catch (e) {
                            }
                            if (typeof m === 'function') {
                                this.spy(prop);
                            }
                        }
                    }
                }
                // Noop so that SpyObject has the same interface as in Dart
                noSuchMethod(args) { }
                spy(name) {
                    if (!this[name]) {
                        this[name] = this._createGuinnessCompatibleSpy(name);
                    }
                    return this[name];
                }
                prop(name, value) { this[name] = value; }
                static stub(object = null, config = null, overrides = null) {
                    if (!(object instanceof SpyObject)) {
                        overrides = config;
                        config = object;
                        object = new SpyObject();
                    }
                    var m = collection_1.StringMapWrapper.merge(config, overrides);
                    collection_1.StringMapWrapper.forEach(m, (value, key) => { object.spy(key).andReturn(value); });
                    return object;
                }
                /** @internal */
                _createGuinnessCompatibleSpy(name) {
                    var newSpy = jasmine.createSpy(name);
                    newSpy.andCallFake = newSpy.and.callFake;
                    newSpy.andReturn = newSpy.and.returnValue;
                    newSpy.reset = newSpy.calls.reset;
                    // revisit return null here (previously needed for rtts_assert).
                    newSpy.and.returnValue(null);
                    return newSpy;
                }
            }
            SpyObject = SpyObject;
        }
    }
});
//# sourceMappingURL=testing_internal.js.map