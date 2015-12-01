System.register([], function(exports_1) {
    var PromiseWrapper;
    return {
        setters:[],
        execute: function() {
            exports_1("Promise", Promise);
            class PromiseWrapper {
                static resolve(obj) { return Promise.resolve(obj); }
                static reject(obj, _) { return Promise.reject(obj); }
                // Note: We can't rename this method into `catch`, as this is not a valid
                // method name in Dart.
                static catchError(promise, onError) {
                    return promise.catch(onError);
                }
                static all(promises) {
                    if (promises.length == 0)
                        return Promise.resolve([]);
                    return Promise.all(promises);
                }
                static then(promise, success, rejection) {
                    return promise.then(success, rejection);
                }
                static wrap(computation) {
                    return new Promise((res, rej) => {
                        try {
                            res(computation());
                        }
                        catch (e) {
                            rej(e);
                        }
                    });
                }
                static completer() {
                    var resolve;
                    var reject;
                    var p = new Promise(function (res, rej) {
                        resolve = res;
                        reject = rej;
                    });
                    return { promise: p, resolve: resolve, reject: reject };
                }
            }
            PromiseWrapper = PromiseWrapper;
        }
    }
});
//# sourceMappingURL=promise.js.map