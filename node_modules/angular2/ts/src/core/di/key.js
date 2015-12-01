System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', './type_literal', './forward_ref'], function(exports_1) {
    var lang_1, exceptions_1, type_literal_1, forward_ref_1;
    var Key, KeyRegistry, _globalKeyRegistry;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (type_literal_1_1) {
                type_literal_1 = type_literal_1_1;
                exports_1({
                    "TypeLiteral": type_literal_1_1["TypeLiteral"]
                });
            },
            function (forward_ref_1_1) {
                forward_ref_1 = forward_ref_1_1;
            }],
        execute: function() {
            /**
             * A unique object used for retrieving items from the {@link Injector}.
             *
             * Keys have:
             * - a system-wide unique `id`.
             * - a `token`.
             *
             * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
             * injector to store created objects in a more efficient way.
             *
             * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
             * providers.
             */
            class Key {
                /**
                 * Private
                 */
                constructor(token, id) {
                    this.token = token;
                    this.id = id;
                    if (lang_1.isBlank(token)) {
                        throw new exceptions_1.BaseException('Token must be defined!');
                    }
                }
                /**
                 * Returns a stringified token.
                 */
                get displayName() { return lang_1.stringify(this.token); }
                /**
                 * Retrieves a `Key` for a token.
                 */
                static get(token) { return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token)); }
                /**
                 * @returns the number of keys registered in the system.
                 */
                static get numberOfKeys() { return _globalKeyRegistry.numberOfKeys; }
            }
            Key = Key;
            /**
             * @internal
             */
            class KeyRegistry {
                constructor() {
                    this._allKeys = new Map();
                }
                get(token) {
                    if (token instanceof Key)
                        return token;
                    // TODO: workaround for https://github.com/Microsoft/TypeScript/issues/3123
                    var theToken = token;
                    if (token instanceof type_literal_1.TypeLiteral) {
                        theToken = token.type;
                    }
                    token = theToken;
                    if (this._allKeys.has(token)) {
                        return this._allKeys.get(token);
                    }
                    var newKey = new Key(token, Key.numberOfKeys);
                    this._allKeys.set(token, newKey);
                    return newKey;
                }
                get numberOfKeys() { return this._allKeys.size; }
            }
            KeyRegistry = KeyRegistry;
            var _globalKeyRegistry = new KeyRegistry();
        }
    }
});
//# sourceMappingURL=key.js.map