System.register(['angular2/src/core/facade/lang', './test_injector', './matchers'], function(exports_1) {
    var lang_1, test_injector_1;
    var _global, afterEach, describe, ddescribe, fdescribe, xdescribe, jsmBeforeEach, jsmIt, jsmIIt, jsmXIt, testProviders, injector;
    /**
     * Allows overriding default providers of the test injector,
     * defined in test_injector.js.
     *
     * The given function must return a list of DI providers.
     *
     * Example:
     *
     *   beforeEachProviders(() => [
     *     bind(Compiler).toClass(MockCompiler),
     *     bind(SomeToken).toValue(myValue),
     *   ]);
     */
    function beforeEachProviders(fn) {
        jsmBeforeEach(() => {
            var providers = fn();
            if (!providers)
                return;
            testProviders = [...testProviders, ...providers];
            if (injector !== null) {
                throw new Error('beforeEachProviders was called after the injector had ' +
                    'been used in a beforeEach or it block. This invalidates the ' +
                    'test injector');
            }
        });
    }
    exports_1("beforeEachProviders", beforeEachProviders);
    function _isPromiseLike(input) {
        return input && !!(input.then);
    }
    function _it(jsmFn, name, testFn, testTimeOut) {
        var timeOut = testTimeOut;
        if (testFn instanceof test_injector_1.FunctionWithParamTokens) {
            // The test case uses inject(). ie `it('test', inject([ClassA], (a) => { ...
            // }));`
            if (testFn.isAsync) {
                jsmFn(name, (done) => {
                    if (!injector) {
                        injector = test_injector_1.createTestInjector(testProviders);
                    }
                    var returned = testFn.execute(injector);
                    if (_isPromiseLike(returned)) {
                        returned.then(done, done.fail);
                    }
                    else {
                        done.fail('Error: injectAsync was expected to return a promise, but the ' +
                            ' returned value was: ' + returned);
                    }
                }, timeOut);
            }
            else {
                jsmFn(name, () => {
                    if (!injector) {
                        injector = test_injector_1.createTestInjector(testProviders);
                    }
                    var returned = testFn.execute(injector);
                    if (_isPromiseLike(returned)) {
                        throw new Error('inject returned a promise. Did you mean to use injectAsync?');
                    }
                    ;
                });
            }
        }
        else {
            // The test case doesn't use inject(). ie `it('test', (done) => { ... }));`
            jsmFn(name, testFn, timeOut);
        }
    }
    function beforeEach(fn) {
        if (fn instanceof test_injector_1.FunctionWithParamTokens) {
            // The test case uses inject(). ie `beforeEach(inject([ClassA], (a) => { ...
            // }));`
            if (fn.isAsync) {
                jsmBeforeEach((done) => {
                    if (!injector) {
                        injector = test_injector_1.createTestInjector(testProviders);
                    }
                    var returned = fn.execute(injector);
                    if (_isPromiseLike(returned)) {
                        returned.then(done, done.fail);
                    }
                    else {
                        done.fail('Error: injectAsync was expected to return a promise, but the ' +
                            ' returned value was: ' + returned);
                    }
                });
            }
            else {
                jsmBeforeEach(() => {
                    if (!injector) {
                        injector = test_injector_1.createTestInjector(testProviders);
                    }
                    var returned = fn.execute(injector);
                    if (_isPromiseLike(returned)) {
                        throw new Error('inject returned a promise. Did you mean to use injectAsync?');
                    }
                    ;
                });
            }
        }
        else {
            // The test case doesn't use inject(). ie `beforeEach((done) => { ... }));`
            if (fn.length === 0) {
                jsmBeforeEach(() => { fn(); });
            }
            else {
                jsmBeforeEach((done) => { fn(done); });
            }
        }
    }
    exports_1("beforeEach", beforeEach);
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
    function fit(name, fn, timeOut = null) {
        return _it(jsmIIt, name, fn, timeOut);
    }
    exports_1("fit", fit);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (test_injector_1_1) {
                test_injector_1 = test_injector_1_1;
                exports_1({
                    "inject": test_injector_1_1["inject"],
                    "injectAsync": test_injector_1_1["injectAsync"]
                });
            },
            function (matchers_1_1) {
                exports_1({
                    "expect": matchers_1_1["expect"],
                    "NgMatchers": matchers_1_1["NgMatchers"]
                });
            }],
        execute: function() {
            var _global = (typeof window === 'undefined' ? lang_1.global : window);
            afterEach = _global.afterEach;
            describe = _global.describe;
            ddescribe = _global.fdescribe;
            fdescribe = _global.fdescribe;
            xdescribe = _global.xdescribe;
            var jsmBeforeEach = _global.beforeEach;
            var jsmIt = _global.it;
            var jsmIIt = _global.fit;
            var jsmXIt = _global.xit;
            var testProviders;
            var injector;
            // Reset the test providers before each test.
            jsmBeforeEach(() => {
                testProviders = [];
                injector = null;
            });
        }
    }
});
//# sourceMappingURL=testing.js.map