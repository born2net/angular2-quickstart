System.register(["angular2/src/core/facade/lang", "angular2/src/core/di"], function(exports_1) {
    var lang_1, di_1;
    var ON_WEB_WORKER, WebWorkerElementRef, WebWorkerTemplateCmd, WebWorkerTextCmd, WebWorkerNgContentCmd, WebWorkerBeginElementCmd, WebWorkerEndElementCmd, WebWorkerBeginComponentCmd, WebWorkerEndComponentCmd, WebWorkerEmbeddedTemplateCmd;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            ON_WEB_WORKER = lang_1.CONST_EXPR(new di_1.OpaqueToken('WebWorker.onWebWorker'));
            class WebWorkerElementRef {
                constructor(renderView, boundElementIndex) {
                    this.renderView = renderView;
                    this.boundElementIndex = boundElementIndex;
                }
            }
            WebWorkerElementRef = WebWorkerElementRef;
            class WebWorkerTemplateCmd {
                visit(visitor, context) { return null; }
            }
            WebWorkerTemplateCmd = WebWorkerTemplateCmd;
            class WebWorkerTextCmd {
                constructor(isBound, ngContentIndex, value) {
                    this.isBound = isBound;
                    this.ngContentIndex = ngContentIndex;
                    this.value = value;
                }
                visit(visitor, context) {
                    return visitor.visitText(this, context);
                }
            }
            WebWorkerTextCmd = WebWorkerTextCmd;
            class WebWorkerNgContentCmd {
                constructor(index, ngContentIndex) {
                    this.index = index;
                    this.ngContentIndex = ngContentIndex;
                }
                visit(visitor, context) {
                    return visitor.visitNgContent(this, context);
                }
            }
            WebWorkerNgContentCmd = WebWorkerNgContentCmd;
            class WebWorkerBeginElementCmd {
                constructor(isBound, ngContentIndex, name, attrNameAndValues, eventTargetAndNames) {
                    this.isBound = isBound;
                    this.ngContentIndex = ngContentIndex;
                    this.name = name;
                    this.attrNameAndValues = attrNameAndValues;
                    this.eventTargetAndNames = eventTargetAndNames;
                }
                visit(visitor, context) {
                    return visitor.visitBeginElement(this, context);
                }
            }
            WebWorkerBeginElementCmd = WebWorkerBeginElementCmd;
            class WebWorkerEndElementCmd {
                visit(visitor, context) {
                    return visitor.visitEndElement(context);
                }
            }
            WebWorkerEndElementCmd = WebWorkerEndElementCmd;
            class WebWorkerBeginComponentCmd {
                constructor(isBound, ngContentIndex, name, attrNameAndValues, eventTargetAndNames, nativeShadow, templateId) {
                    this.isBound = isBound;
                    this.ngContentIndex = ngContentIndex;
                    this.name = name;
                    this.attrNameAndValues = attrNameAndValues;
                    this.eventTargetAndNames = eventTargetAndNames;
                    this.nativeShadow = nativeShadow;
                    this.templateId = templateId;
                }
                visit(visitor, context) {
                    return visitor.visitBeginComponent(this, context);
                }
            }
            WebWorkerBeginComponentCmd = WebWorkerBeginComponentCmd;
            class WebWorkerEndComponentCmd {
                visit(visitor, context) {
                    return visitor.visitEndComponent(context);
                }
            }
            WebWorkerEndComponentCmd = WebWorkerEndComponentCmd;
            class WebWorkerEmbeddedTemplateCmd {
                constructor(isBound, ngContentIndex, name, attrNameAndValues, eventTargetAndNames, isMerged, children) {
                    this.isBound = isBound;
                    this.ngContentIndex = ngContentIndex;
                    this.name = name;
                    this.attrNameAndValues = attrNameAndValues;
                    this.eventTargetAndNames = eventTargetAndNames;
                    this.isMerged = isMerged;
                    this.children = children;
                }
                visit(visitor, context) {
                    return visitor.visitEmbeddedTemplate(this, context);
                }
            }
            WebWorkerEmbeddedTemplateCmd = WebWorkerEmbeddedTemplateCmd;
        }
    }
});
//# sourceMappingURL=api.js.map