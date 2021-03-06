'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var collection_1 = require('angular2/src/core/facade/collection');
var cpl = require('./directive_metadata');
var dirAnn = require('angular2/src/core/metadata/directives');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var view_resolver_1 = require('angular2/src/core/linker/view_resolver');
var directive_lifecycle_reflector_1 = require('angular2/src/core/linker/directive_lifecycle_reflector');
var interfaces_1 = require('angular2/src/core/linker/interfaces');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var di_2 = require('angular2/src/core/di');
var util_1 = require('./util');
// group 1: "property" from "[property]"
// group 2: "event" from "(event)"
var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))$/g;
var RuntimeMetadataResolver = (function () {
    function RuntimeMetadataResolver(_directiveResolver, _viewResolver) {
        this._directiveResolver = _directiveResolver;
        this._viewResolver = _viewResolver;
        this._cache = new Map();
    }
    RuntimeMetadataResolver.prototype.getMetadata = function (directiveType) {
        var meta = this._cache.get(directiveType);
        if (lang_1.isBlank(meta)) {
            var directiveAnnotation = this._directiveResolver.resolve(directiveType);
            var moduleUrl = calcModuleUrl(directiveType, directiveAnnotation);
            var templateMeta = null;
            var changeDetectionStrategy = null;
            if (directiveAnnotation instanceof dirAnn.ComponentMetadata) {
                var compAnnotation = directiveAnnotation;
                var viewAnnotation = this._viewResolver.resolve(directiveType);
                templateMeta = new cpl.CompileTemplateMetadata({
                    encapsulation: viewAnnotation.encapsulation,
                    template: viewAnnotation.template,
                    templateUrl: viewAnnotation.templateUrl,
                    styles: viewAnnotation.styles,
                    styleUrls: viewAnnotation.styleUrls
                });
                changeDetectionStrategy = compAnnotation.changeDetection;
            }
            meta = cpl.CompileDirectiveMetadata.create({
                selector: directiveAnnotation.selector,
                exportAs: directiveAnnotation.exportAs,
                isComponent: lang_1.isPresent(templateMeta),
                dynamicLoadable: true,
                type: new cpl.CompileTypeMetadata({ name: lang_1.stringify(directiveType), moduleUrl: moduleUrl, runtime: directiveType }),
                template: templateMeta,
                changeDetection: changeDetectionStrategy,
                inputs: directiveAnnotation.inputs,
                outputs: directiveAnnotation.outputs,
                host: directiveAnnotation.host,
                lifecycleHooks: collection_1.ListWrapper.filter(interfaces_1.LIFECYCLE_HOOKS_VALUES, function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType); })
            });
            this._cache.set(directiveType, meta);
        }
        return meta;
    };
    RuntimeMetadataResolver.prototype.getViewDirectivesMetadata = function (component) {
        var _this = this;
        var view = this._viewResolver.resolve(component);
        var directives = flattenDirectives(view);
        for (var i = 0; i < directives.length; i++) {
            if (!isValidDirective(directives[i])) {
                throw new exceptions_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
            }
        }
        return removeDuplicatedDirectives(directives.map(function (type) { return _this.getMetadata(type); }));
    };
    RuntimeMetadataResolver = __decorate([
        di_2.Injectable(), 
        __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, view_resolver_1.ViewResolver])
    ], RuntimeMetadataResolver);
    return RuntimeMetadataResolver;
})();
exports.RuntimeMetadataResolver = RuntimeMetadataResolver;
function removeDuplicatedDirectives(directives) {
    var directivesMap = new Map();
    directives.forEach(function (dirMeta) { directivesMap.set(dirMeta.type.runtime, dirMeta); });
    return collection_1.MapWrapper.values(directivesMap);
}
function flattenDirectives(view) {
    if (lang_1.isBlank(view.directives))
        return [];
    var directives = [];
    flattenList(view.directives, directives);
    return directives;
}
function flattenList(tree, out) {
    for (var i = 0; i < tree.length; i++) {
        var item = di_1.resolveForwardRef(tree[i]);
        if (lang_1.isArray(item)) {
            flattenList(item, out);
        }
        else {
            out.push(item);
        }
    }
}
function isValidDirective(value) {
    return lang_1.isPresent(value) && (value instanceof lang_1.Type);
}
function calcModuleUrl(type, directiveAnnotation) {
    if (lang_1.isPresent(directiveAnnotation.moduleId)) {
        return "package:" + directiveAnnotation.moduleId + util_1.MODULE_SUFFIX;
    }
    else {
        return reflection_1.reflector.importUri(type);
    }
}
//# sourceMappingURL=runtime_metadata.js.map