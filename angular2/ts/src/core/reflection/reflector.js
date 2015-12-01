System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/src/core/facade/collection'], function(exports_1) {
    var lang_1, exceptions_1, collection_1;
    var ReflectionInfo, Reflector;
    function _mergeMaps(target, config) {
        collection_1.StringMapWrapper.forEach(config, (v, k) => target.set(k, v));
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            class ReflectionInfo {
                constructor(annotations, parameters, factory, interfaces, propMetadata) {
                    this.annotations = annotations;
                    this.parameters = parameters;
                    this.factory = factory;
                    this.interfaces = interfaces;
                    this.propMetadata = propMetadata;
                }
            }
            ReflectionInfo = ReflectionInfo;
            class Reflector {
                constructor(reflectionCapabilities) {
                    /** @internal */
                    this._injectableInfo = new collection_1.Map();
                    /** @internal */
                    this._getters = new collection_1.Map();
                    /** @internal */
                    this._setters = new collection_1.Map();
                    /** @internal */
                    this._methods = new collection_1.Map();
                    this._usedKeys = null;
                    this.reflectionCapabilities = reflectionCapabilities;
                }
                isReflectionEnabled() { return this.reflectionCapabilities.isReflectionEnabled(); }
                /**
                 * Causes `this` reflector to track keys used to access
                 * {@link ReflectionInfo} objects.
                 */
                trackUsage() { this._usedKeys = new collection_1.Set(); }
                /**
                 * Lists types for which reflection information was not requested since
                 * {@link #trackUsage} was called. This list could later be audited as
                 * potential dead code.
                 */
                listUnusedKeys() {
                    if (this._usedKeys == null) {
                        throw new exceptions_1.BaseException('Usage tracking is disabled');
                    }
                    var allTypes = collection_1.MapWrapper.keys(this._injectableInfo);
                    return collection_1.ListWrapper.filter(allTypes, (key) => { return !collection_1.SetWrapper.has(this._usedKeys, key); });
                }
                registerFunction(func, funcInfo) {
                    this._injectableInfo.set(func, funcInfo);
                }
                registerType(type, typeInfo) {
                    this._injectableInfo.set(type, typeInfo);
                }
                registerGetters(getters) { _mergeMaps(this._getters, getters); }
                registerSetters(setters) { _mergeMaps(this._setters, setters); }
                registerMethods(methods) { _mergeMaps(this._methods, methods); }
                factory(type) {
                    if (this._containsReflectionInfo(type)) {
                        var res = this._getReflectionInfo(type).factory;
                        return lang_1.isPresent(res) ? res : null;
                    }
                    else {
                        return this.reflectionCapabilities.factory(type);
                    }
                }
                parameters(typeOrFunc) {
                    if (this._injectableInfo.has(typeOrFunc)) {
                        var res = this._getReflectionInfo(typeOrFunc).parameters;
                        return lang_1.isPresent(res) ? res : [];
                    }
                    else {
                        return this.reflectionCapabilities.parameters(typeOrFunc);
                    }
                }
                annotations(typeOrFunc) {
                    if (this._injectableInfo.has(typeOrFunc)) {
                        var res = this._getReflectionInfo(typeOrFunc).annotations;
                        return lang_1.isPresent(res) ? res : [];
                    }
                    else {
                        return this.reflectionCapabilities.annotations(typeOrFunc);
                    }
                }
                propMetadata(typeOrFunc) {
                    if (this._injectableInfo.has(typeOrFunc)) {
                        var res = this._getReflectionInfo(typeOrFunc).propMetadata;
                        return lang_1.isPresent(res) ? res : {};
                    }
                    else {
                        return this.reflectionCapabilities.propMetadata(typeOrFunc);
                    }
                }
                interfaces(type) {
                    if (this._injectableInfo.has(type)) {
                        var res = this._getReflectionInfo(type).interfaces;
                        return lang_1.isPresent(res) ? res : [];
                    }
                    else {
                        return this.reflectionCapabilities.interfaces(type);
                    }
                }
                getter(name) {
                    if (this._getters.has(name)) {
                        return this._getters.get(name);
                    }
                    else {
                        return this.reflectionCapabilities.getter(name);
                    }
                }
                setter(name) {
                    if (this._setters.has(name)) {
                        return this._setters.get(name);
                    }
                    else {
                        return this.reflectionCapabilities.setter(name);
                    }
                }
                method(name) {
                    if (this._methods.has(name)) {
                        return this._methods.get(name);
                    }
                    else {
                        return this.reflectionCapabilities.method(name);
                    }
                }
                /** @internal */
                _getReflectionInfo(typeOrFunc) {
                    if (lang_1.isPresent(this._usedKeys)) {
                        this._usedKeys.add(typeOrFunc);
                    }
                    return this._injectableInfo.get(typeOrFunc);
                }
                /** @internal */
                _containsReflectionInfo(typeOrFunc) { return this._injectableInfo.has(typeOrFunc); }
                importUri(type) { return this.reflectionCapabilities.importUri(type); }
            }
            Reflector = Reflector;
        }
    }
});
//# sourceMappingURL=reflector.js.map