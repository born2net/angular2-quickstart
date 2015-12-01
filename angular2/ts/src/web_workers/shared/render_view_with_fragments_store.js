System.register(["angular2/src/core/di", "angular2/src/core/render/api", "angular2/src/web_workers/shared/api", "angular2/src/core/facade/collection"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var di_1, api_1, api_2, collection_1;
    var RenderViewWithFragmentsStore, WebWorkerRenderViewRef, WebWorkerRenderFragmentRef;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (api_2_1) {
                api_2 = api_2_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            let RenderViewWithFragmentsStore = class {
                constructor(onWebWorker) {
                    this._nextIndex = 0;
                    this._onWebWorker = onWebWorker;
                    this._lookupByIndex = new Map();
                    this._lookupByView = new Map();
                    this._viewFragments = new Map();
                }
                allocate(fragmentCount) {
                    var initialIndex = this._nextIndex;
                    var viewRef = new WebWorkerRenderViewRef(this._nextIndex++);
                    var fragmentRefs = collection_1.ListWrapper.createGrowableSize(fragmentCount);
                    for (var i = 0; i < fragmentCount; i++) {
                        fragmentRefs[i] = new WebWorkerRenderFragmentRef(this._nextIndex++);
                    }
                    var renderViewWithFragments = new api_1.RenderViewWithFragments(viewRef, fragmentRefs);
                    this.store(renderViewWithFragments, initialIndex);
                    return renderViewWithFragments;
                }
                store(view, startIndex) {
                    this._lookupByIndex.set(startIndex, view.viewRef);
                    this._lookupByView.set(view.viewRef, startIndex);
                    startIndex++;
                    view.fragmentRefs.forEach(ref => {
                        this._lookupByIndex.set(startIndex, ref);
                        this._lookupByView.set(ref, startIndex);
                        startIndex++;
                    });
                    this._viewFragments.set(view.viewRef, view.fragmentRefs);
                }
                remove(view) {
                    this._removeRef(view);
                    var fragments = this._viewFragments.get(view);
                    fragments.forEach((fragment) => { this._removeRef(fragment); });
                    this._viewFragments.delete(view);
                }
                _removeRef(ref) {
                    var index = this._lookupByView.get(ref);
                    this._lookupByView.delete(ref);
                    this._lookupByIndex.delete(index);
                }
                serializeRenderViewRef(viewRef) {
                    return this._serializeRenderFragmentOrViewRef(viewRef);
                }
                serializeRenderFragmentRef(fragmentRef) {
                    return this._serializeRenderFragmentOrViewRef(fragmentRef);
                }
                deserializeRenderViewRef(ref) {
                    if (ref == null) {
                        return null;
                    }
                    return this._retrieve(ref);
                }
                deserializeRenderFragmentRef(ref) {
                    if (ref == null) {
                        return null;
                    }
                    return this._retrieve(ref);
                }
                _retrieve(ref) {
                    if (ref == null) {
                        return null;
                    }
                    if (!this._lookupByIndex.has(ref)) {
                        return null;
                    }
                    return this._lookupByIndex.get(ref);
                }
                _serializeRenderFragmentOrViewRef(ref) {
                    if (ref == null) {
                        return null;
                    }
                    if (this._onWebWorker) {
                        return ref.serialize();
                    }
                    else {
                        return this._lookupByView.get(ref);
                    }
                }
                serializeViewWithFragments(view) {
                    if (view == null) {
                        return null;
                    }
                    if (this._onWebWorker) {
                        return {
                            'viewRef': view.viewRef.serialize(),
                            'fragmentRefs': view.fragmentRefs.map(val => val.serialize())
                        };
                    }
                    else {
                        return {
                            'viewRef': this._lookupByView.get(view.viewRef),
                            'fragmentRefs': view.fragmentRefs.map(val => this._lookupByView.get(val))
                        };
                    }
                }
                deserializeViewWithFragments(obj) {
                    if (obj == null) {
                        return null;
                    }
                    var viewRef = this.deserializeRenderViewRef(obj['viewRef']);
                    var fragments = obj['fragmentRefs'].map(val => this.deserializeRenderFragmentRef(val));
                    return new api_1.RenderViewWithFragments(viewRef, fragments);
                }
            };
            RenderViewWithFragmentsStore = __decorate([
                di_1.Injectable(),
                __param(0, di_1.Inject(api_2.ON_WEB_WORKER))
            ], RenderViewWithFragmentsStore);
            RenderViewWithFragmentsStore = RenderViewWithFragmentsStore;
            class WebWorkerRenderViewRef extends api_1.RenderViewRef {
                constructor(refNumber) {
                    super();
                    this.refNumber = refNumber;
                }
                serialize() { return this.refNumber; }
                static deserialize(ref) {
                    return new WebWorkerRenderViewRef(ref);
                }
            }
            WebWorkerRenderViewRef = WebWorkerRenderViewRef;
            class WebWorkerRenderFragmentRef extends api_1.RenderFragmentRef {
                constructor(refNumber) {
                    super();
                    this.refNumber = refNumber;
                }
                serialize() { return this.refNumber; }
                static deserialize(ref) {
                    return new WebWorkerRenderFragmentRef(ref);
                }
            }
            WebWorkerRenderFragmentRef = WebWorkerRenderFragmentRef;
        }
    }
});
//# sourceMappingURL=render_view_with_fragments_store.js.map