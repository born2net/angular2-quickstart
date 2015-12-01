System.register(['angular2/src/core/di', 'angular2/src/core/facade/lang'], function(exports_1) {
    var di_1, lang_1;
    var APP_COMPONENT_REF_PROMISE, APP_COMPONENT, APP_ID, APP_ID_RANDOM_PROVIDER;
    function _appIdRandomProviderFactory() {
        return `${_randomChar()}${_randomChar()}${_randomChar()}`;
    }
    function _randomChar() {
        return lang_1.StringWrapper.fromCharCode(97 + lang_1.Math.floor(lang_1.Math.random() * 25));
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             *  @internal
             */
            APP_COMPONENT_REF_PROMISE = lang_1.CONST_EXPR(new di_1.OpaqueToken('Promise<ComponentRef>'));
            /**
             * An {@link angular2/di/OpaqueToken} representing the application root type in the {@link
             * Injector}.
             *
             * ```
             * @Component(...)
             * class MyApp {
             *   ...
             * }
             *
             * bootstrap(MyApp).then((appRef:ApplicationRef) {
             *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
             * });
             *
             * ```
             */
            APP_COMPONENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppComponent'));
            /**
             * A DI Token representing a unique string id assigned to the application by Angular and used
             * primarily for prefixing application attributes and CSS styles when
             * {@link ViewEncapsulation#Emulated} is being used.
             *
             * If you need to avoid randomly generated value to be used as an application id, you can provide
             * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
             * using this token.
             */
            APP_ID = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppId'));
            /**
             * Bindings that will generate a random APP_ID_TOKEN.
             */
            APP_ID_RANDOM_PROVIDER = lang_1.CONST_EXPR(new di_1.Provider(APP_ID, { useFactory: _appIdRandomProviderFactory, deps: [] }));
        }
    }
});
//# sourceMappingURL=application_tokens.js.map