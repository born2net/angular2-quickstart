'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var view_1 = require('./view');
function createRenderView(fragmentCmds, inplaceElement, nodeFactory) {
    var view;
    var eventDispatcher = function (boundElementIndex, eventName, event) {
        return view.dispatchRenderEvent(boundElementIndex, eventName, event);
    };
    var context = new BuildContext(eventDispatcher, nodeFactory, inplaceElement);
    context.build(fragmentCmds);
    var fragments = [];
    for (var i = 0; i < context.fragments.length; i++) {
        fragments.push(new view_1.DefaultRenderFragmentRef(context.fragments[i]));
    }
    view = new view_1.DefaultRenderView(fragments, context.boundTextNodes, context.boundElements, context.nativeShadowRoots, context.globalEventAdders, context.rootContentInsertionPoints);
    return view;
}
exports.createRenderView = createRenderView;
var BuildContext = (function () {
    function BuildContext(_eventDispatcher, factory, _inplaceElement) {
        this._eventDispatcher = _eventDispatcher;
        this.factory = factory;
        this._inplaceElement = _inplaceElement;
        this._builders = [];
        this.globalEventAdders = [];
        this.boundElements = [];
        this.boundTextNodes = [];
        this.nativeShadowRoots = [];
        this.fragments = [];
        this.rootContentInsertionPoints = [];
        this.componentCount = 0;
        this.isHost = lang_1.isPresent((_inplaceElement));
    }
    BuildContext.prototype.build = function (fragmentCmds) {
        this.enqueueFragmentBuilder(null, fragmentCmds);
        this._build(this._builders[0]);
    };
    BuildContext.prototype._build = function (builder) {
        this._builders = [];
        builder.build(this);
        var enqueuedBuilders = this._builders;
        for (var i = 0; i < enqueuedBuilders.length; i++) {
            this._build(enqueuedBuilders[i]);
        }
    };
    BuildContext.prototype.enqueueComponentBuilder = function (component) {
        this.componentCount++;
        this._builders.push(new RenderViewBuilder(component, null, this.factory.resolveComponentTemplate(component.cmd.templateId)));
    };
    BuildContext.prototype.enqueueFragmentBuilder = function (parentComponent, commands) {
        var rootNodes = [];
        this.fragments.push(rootNodes);
        this._builders.push(new RenderViewBuilder(parentComponent, rootNodes, commands));
    };
    BuildContext.prototype.consumeInplaceElement = function () {
        var result = this._inplaceElement;
        this._inplaceElement = null;
        return result;
    };
    BuildContext.prototype.addEventListener = function (boundElementIndex, target, eventName) {
        if (lang_1.isPresent(target)) {
            var handler = createEventHandler(boundElementIndex, target + ":" + eventName, this._eventDispatcher);
            this.globalEventAdders.push(createGlobalEventAdder(target, eventName, handler, this.factory));
        }
        else {
            var handler = createEventHandler(boundElementIndex, eventName, this._eventDispatcher);
            this.factory.on(this.boundElements[boundElementIndex], eventName, handler);
        }
    };
    return BuildContext;
})();
function createEventHandler(boundElementIndex, eventName, eventDispatcher) {
    return function ($event) { return eventDispatcher(boundElementIndex, eventName, $event); };
}
function createGlobalEventAdder(target, eventName, eventHandler, nodeFactory) {
    return function () { return nodeFactory.globalOn(target, eventName, eventHandler); };
}
var RenderViewBuilder = (function () {
    function RenderViewBuilder(parentComponent, fragmentRootNodes, commands) {
        this.parentComponent = parentComponent;
        this.fragmentRootNodes = fragmentRootNodes;
        this.commands = commands;
        var rootNodesParent = lang_1.isPresent(fragmentRootNodes) ? null : parentComponent.shadowRoot;
        this.parentStack = [rootNodesParent];
    }
    RenderViewBuilder.prototype.build = function (context) {
        for (var i = 0; i < this.commands.length; i++) {
            this.commands[i].visit(this, context);
        }
    };
    Object.defineProperty(RenderViewBuilder.prototype, "parent", {
        get: function () { return this.parentStack[this.parentStack.length - 1]; },
        enumerable: true,
        configurable: true
    });
    RenderViewBuilder.prototype.visitText = function (cmd, context) {
        var text = context.factory.createText(cmd.value);
        this._addChild(text, cmd.ngContentIndex, context);
        if (cmd.isBound) {
            context.boundTextNodes.push(text);
        }
        return null;
    };
    RenderViewBuilder.prototype.visitNgContent = function (cmd, context) {
        if (lang_1.isPresent(this.parentComponent)) {
            if (this.parentComponent.isRoot) {
                var insertionPoint = context.factory.createRootContentInsertionPoint();
                if (this.parent instanceof Component) {
                    context.factory.appendChild(this.parent.shadowRoot, insertionPoint);
                }
                else {
                    context.factory.appendChild(this.parent, insertionPoint);
                }
                context.rootContentInsertionPoints.push(insertionPoint);
            }
            else {
                var projectedNodes = this.parentComponent.project(cmd.index);
                for (var i = 0; i < projectedNodes.length; i++) {
                    var node = projectedNodes[i];
                    this._addChild(node, cmd.ngContentIndex, context);
                }
            }
        }
        return null;
    };
    RenderViewBuilder.prototype.visitBeginElement = function (cmd, context) {
        this.parentStack.push(this._beginElement(cmd, context));
        return null;
    };
    RenderViewBuilder.prototype.visitEndElement = function (context) {
        this._endElement();
        return null;
    };
    RenderViewBuilder.prototype.visitBeginComponent = function (cmd, context) {
        var el = this._beginElement(cmd, context);
        var root = el;
        if (cmd.nativeShadow) {
            root = context.factory.createShadowRoot(el, cmd.templateId);
            context.nativeShadowRoots.push(root);
        }
        var isRoot = context.componentCount === 0 && context.isHost;
        var component = new Component(el, root, cmd, isRoot);
        context.enqueueComponentBuilder(component);
        this.parentStack.push(component);
        return null;
    };
    RenderViewBuilder.prototype.visitEndComponent = function (context) {
        this._endElement();
        return null;
    };
    RenderViewBuilder.prototype.visitEmbeddedTemplate = function (cmd, context) {
        var el = context.factory.createTemplateAnchor(cmd.attrNameAndValues);
        this._addChild(el, cmd.ngContentIndex, context);
        context.boundElements.push(el);
        if (cmd.isMerged) {
            context.enqueueFragmentBuilder(this.parentComponent, cmd.children);
        }
        return null;
    };
    RenderViewBuilder.prototype._beginElement = function (cmd, context) {
        var el = context.consumeInplaceElement();
        if (lang_1.isPresent(el)) {
            context.factory.mergeElement(el, cmd.attrNameAndValues);
            this.fragmentRootNodes.push(el);
        }
        else {
            el = context.factory.createElement(cmd.name, cmd.attrNameAndValues);
            this._addChild(el, cmd.ngContentIndex, context);
        }
        if (cmd.isBound) {
            var boundElementIndex = context.boundElements.length;
            context.boundElements.push(el);
            for (var i = 0; i < cmd.eventTargetAndNames.length; i += 2) {
                var target = cmd.eventTargetAndNames[i];
                var eventName = cmd.eventTargetAndNames[i + 1];
                context.addEventListener(boundElementIndex, target, eventName);
            }
        }
        return el;
    };
    RenderViewBuilder.prototype._endElement = function () { this.parentStack.pop(); };
    RenderViewBuilder.prototype._addChild = function (node, ngContentIndex, context) {
        var parent = this.parent;
        if (lang_1.isPresent(parent)) {
            if (parent instanceof Component) {
                parent.addContentNode(ngContentIndex, node, context);
            }
            else {
                context.factory.appendChild(parent, node);
            }
        }
        else {
            this.fragmentRootNodes.push(node);
        }
    };
    return RenderViewBuilder;
})();
var Component = (function () {
    function Component(hostElement, shadowRoot, cmd, isRoot) {
        this.hostElement = hostElement;
        this.shadowRoot = shadowRoot;
        this.cmd = cmd;
        this.isRoot = isRoot;
        this.contentNodesByNgContentIndex = [];
    }
    Component.prototype.addContentNode = function (ngContentIndex, node, context) {
        if (lang_1.isBlank(ngContentIndex)) {
            if (this.cmd.nativeShadow) {
                context.factory.appendChild(this.hostElement, node);
            }
        }
        else {
            while (this.contentNodesByNgContentIndex.length <= ngContentIndex) {
                this.contentNodesByNgContentIndex.push([]);
            }
            this.contentNodesByNgContentIndex[ngContentIndex].push(node);
        }
    };
    Component.prototype.project = function (ngContentIndex) {
        return ngContentIndex < this.contentNodesByNgContentIndex.length ?
            this.contentNodesByNgContentIndex[ngContentIndex] :
            [];
    };
    return Component;
})();
function addAll(source, target) {
    for (var i = 0; i < source.length; i++) {
        target.push(source[i]);
    }
}
//# sourceMappingURL=view_factory.js.map