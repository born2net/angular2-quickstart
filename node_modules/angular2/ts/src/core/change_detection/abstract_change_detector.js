System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/src/core/facade/collection', './change_detection_util', './change_detector_ref', './exceptions', './constants', '../profile/profile', './observable_facade'], function(exports_1) {
    var lang_1, exceptions_1, collection_1, change_detection_util_1, change_detector_ref_1, exceptions_2, constants_1, profile_1, observable_facade_1;
    var _scope_check, _Context, AbstractChangeDetector;
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
            },
            function (change_detection_util_1_1) {
                change_detection_util_1 = change_detection_util_1_1;
            },
            function (change_detector_ref_1_1) {
                change_detector_ref_1 = change_detector_ref_1_1;
            },
            function (exceptions_2_1) {
                exceptions_2 = exceptions_2_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (observable_facade_1_1) {
                observable_facade_1 = observable_facade_1_1;
            }],
        execute: function() {
            var _scope_check = profile_1.wtfCreateScope(`ChangeDetector#check(ascii id, bool throwOnChange)`);
            class _Context {
                constructor(element, componentElement, context, locals, injector, expression) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.context = context;
                    this.locals = locals;
                    this.injector = injector;
                    this.expression = expression;
                }
            }
            class AbstractChangeDetector {
                constructor(id, dispatcher, numberOfPropertyProtoRecords, bindingTargets, directiveIndices, strategy) {
                    this.id = id;
                    this.dispatcher = dispatcher;
                    this.numberOfPropertyProtoRecords = numberOfPropertyProtoRecords;
                    this.bindingTargets = bindingTargets;
                    this.directiveIndices = directiveIndices;
                    this.strategy = strategy;
                    this.lightDomChildren = [];
                    this.shadowDomChildren = [];
                    // The names of the below fields must be kept in sync with codegen_name_util.ts or
                    // change detection will fail.
                    this.alreadyChecked = false;
                    this.locals = null;
                    this.mode = null;
                    this.pipes = null;
                    this.ref = new change_detector_ref_1.ChangeDetectorRef_(this);
                }
                addChild(cd) {
                    this.lightDomChildren.push(cd);
                    cd.parent = this;
                }
                removeChild(cd) { collection_1.ListWrapper.remove(this.lightDomChildren, cd); }
                addShadowDomChild(cd) {
                    this.shadowDomChildren.push(cd);
                    cd.parent = this;
                }
                removeShadowDomChild(cd) { collection_1.ListWrapper.remove(this.shadowDomChildren, cd); }
                remove() { this.parent.removeChild(this); }
                handleEvent(eventName, elIndex, locals) {
                    var res = this.handleEventInternal(eventName, elIndex, locals);
                    this.markPathToRootAsCheckOnce();
                    return res;
                }
                handleEventInternal(eventName, elIndex, locals) { return false; }
                detectChanges() { this.runDetectChanges(false); }
                checkNoChanges() { throw new exceptions_1.BaseException("Not implemented"); }
                runDetectChanges(throwOnChange) {
                    if (this.mode === constants_1.ChangeDetectionStrategy.Detached ||
                        this.mode === constants_1.ChangeDetectionStrategy.Checked)
                        return;
                    var s = _scope_check(this.id, throwOnChange);
                    this.detectChangesInRecords(throwOnChange);
                    this._detectChangesInLightDomChildren(throwOnChange);
                    if (!throwOnChange)
                        this.afterContentLifecycleCallbacks();
                    this._detectChangesInShadowDomChildren(throwOnChange);
                    if (!throwOnChange)
                        this.afterViewLifecycleCallbacks();
                    if (this.mode === constants_1.ChangeDetectionStrategy.CheckOnce)
                        this.mode = constants_1.ChangeDetectionStrategy.Checked;
                    this.alreadyChecked = true;
                    profile_1.wtfLeave(s);
                }
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `detectChangesInRecordsInternal` which does the work of detecting changes
                // and which this method will call.
                // This method expects that `detectChangesInRecordsInternal` will set the property
                // `this.propertyBindingIndex` to the propertyBindingIndex of the first proto record. This is to
                // facilitate error reporting.
                detectChangesInRecords(throwOnChange) {
                    if (!this.hydrated()) {
                        this.throwDehydratedError();
                    }
                    try {
                        this.detectChangesInRecordsInternal(throwOnChange);
                    }
                    catch (e) {
                        this._throwError(e, e.stack);
                    }
                }
                // Subclasses should override this method to perform any work necessary to detect and report
                // changes. For example, changes should be reported via `ChangeDetectionUtil.addChange`, lifecycle
                // methods should be called, etc.
                // This implementation should also set `this.propertyBindingIndex` to the propertyBindingIndex of
                // the
                // first proto record to facilitate error reporting. See {@link #detectChangesInRecords}.
                detectChangesInRecordsInternal(throwOnChange) { }
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `hydrateDirectives`.
                hydrate(context, locals, directives, pipes) {
                    this.mode = change_detection_util_1.ChangeDetectionUtil.changeDetectionMode(this.strategy);
                    this.context = context;
                    if (this.strategy === constants_1.ChangeDetectionStrategy.OnPushObserve) {
                        this.observeComponent(context);
                    }
                    this.locals = locals;
                    this.pipes = pipes;
                    this.hydrateDirectives(directives);
                    this.alreadyChecked = false;
                }
                // Subclasses should override this method to hydrate any directives.
                hydrateDirectives(directives) { }
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `dehydrateDirectives`.
                dehydrate() {
                    this.dehydrateDirectives(true);
                    // This is an experimental feature. Works only in Dart.
                    if (this.strategy === constants_1.ChangeDetectionStrategy.OnPushObserve) {
                        this._unsubsribeFromObservables();
                    }
                    this.context = null;
                    this.locals = null;
                    this.pipes = null;
                }
                // Subclasses should override this method to dehydrate any directives. This method should reverse
                // any work done in `hydrateDirectives`.
                dehydrateDirectives(destroyPipes) { }
                hydrated() { return this.context !== null; }
                afterContentLifecycleCallbacks() {
                    this.dispatcher.notifyAfterContentChecked();
                    this.afterContentLifecycleCallbacksInternal();
                }
                afterContentLifecycleCallbacksInternal() { }
                afterViewLifecycleCallbacks() {
                    this.dispatcher.notifyAfterViewChecked();
                    this.afterViewLifecycleCallbacksInternal();
                }
                afterViewLifecycleCallbacksInternal() { }
                /** @internal */
                _detectChangesInLightDomChildren(throwOnChange) {
                    var c = this.lightDomChildren;
                    for (var i = 0; i < c.length; ++i) {
                        c[i].runDetectChanges(throwOnChange);
                    }
                }
                /** @internal */
                _detectChangesInShadowDomChildren(throwOnChange) {
                    var c = this.shadowDomChildren;
                    for (var i = 0; i < c.length; ++i) {
                        c[i].runDetectChanges(throwOnChange);
                    }
                }
                markAsCheckOnce() { this.mode = constants_1.ChangeDetectionStrategy.CheckOnce; }
                markPathToRootAsCheckOnce() {
                    var c = this;
                    while (lang_1.isPresent(c) && c.mode !== constants_1.ChangeDetectionStrategy.Detached) {
                        if (c.mode === constants_1.ChangeDetectionStrategy.Checked)
                            c.mode = constants_1.ChangeDetectionStrategy.CheckOnce;
                        c = c.parent;
                    }
                }
                // This is an experimental feature. Works only in Dart.
                _unsubsribeFromObservables() {
                    if (lang_1.isPresent(this.subscriptions)) {
                        for (var i = 0; i < this.subscriptions.length; ++i) {
                            var s = this.subscriptions[i];
                            if (lang_1.isPresent(this.subscriptions[i])) {
                                s.cancel();
                                this.subscriptions[i] = null;
                            }
                        }
                    }
                }
                // This is an experimental feature. Works only in Dart.
                observeValue(value, index) {
                    if (observable_facade_1.isObservable(value)) {
                        this._createArrayToStoreObservables();
                        if (lang_1.isBlank(this.subscriptions[index])) {
                            this.streams[index] = value.changes;
                            this.subscriptions[index] = value.changes.listen((_) => this.ref.markForCheck());
                        }
                        else if (this.streams[index] !== value.changes) {
                            this.subscriptions[index].cancel();
                            this.streams[index] = value.changes;
                            this.subscriptions[index] = value.changes.listen((_) => this.ref.markForCheck());
                        }
                    }
                    return value;
                }
                // This is an experimental feature. Works only in Dart.
                observeDirective(value, index) {
                    if (observable_facade_1.isObservable(value)) {
                        this._createArrayToStoreObservables();
                        var arrayIndex = this.numberOfPropertyProtoRecords + index + 2; // +1 is component
                        this.streams[arrayIndex] = value.changes;
                        this.subscriptions[arrayIndex] = value.changes.listen((_) => this.ref.markForCheck());
                    }
                    return value;
                }
                // This is an experimental feature. Works only in Dart.
                observeComponent(value) {
                    if (observable_facade_1.isObservable(value)) {
                        this._createArrayToStoreObservables();
                        var index = this.numberOfPropertyProtoRecords + 1;
                        this.streams[index] = value.changes;
                        this.subscriptions[index] = value.changes.listen((_) => this.ref.markForCheck());
                    }
                    return value;
                }
                _createArrayToStoreObservables() {
                    if (lang_1.isBlank(this.subscriptions)) {
                        this.subscriptions = collection_1.ListWrapper.createFixedSize(this.numberOfPropertyProtoRecords +
                            this.directiveIndices.length + 2);
                        this.streams = collection_1.ListWrapper.createFixedSize(this.numberOfPropertyProtoRecords +
                            this.directiveIndices.length + 2);
                    }
                }
                getDirectiveFor(directives, index) {
                    return directives.getDirectiveFor(this.directiveIndices[index]);
                }
                getDetectorFor(directives, index) {
                    return directives.getDetectorFor(this.directiveIndices[index]);
                }
                notifyDispatcher(value) {
                    this.dispatcher.notifyOnBinding(this._currentBinding(), value);
                }
                logBindingUpdate(value) {
                    this.dispatcher.logBindingUpdate(this._currentBinding(), value);
                }
                addChange(changes, oldValue, newValue) {
                    if (lang_1.isBlank(changes)) {
                        changes = {};
                    }
                    changes[this._currentBinding().name] = change_detection_util_1.ChangeDetectionUtil.simpleChange(oldValue, newValue);
                    return changes;
                }
                _throwError(exception, stack) {
                    var error;
                    try {
                        var c = this.dispatcher.getDebugContext(this._currentBinding().elementIndex, null);
                        var context = lang_1.isPresent(c) ? new _Context(c.element, c.componentElement, c.context, c.locals, c.injector, this._currentBinding().debug) :
                            null;
                        error = new exceptions_2.ChangeDetectionError(this._currentBinding().debug, exception, stack, context);
                    }
                    catch (e) {
                        // if an error happens during getting the debug context, we throw a ChangeDetectionError
                        // without the extra information.
                        error = new exceptions_2.ChangeDetectionError(null, exception, stack, null);
                    }
                    throw error;
                }
                throwOnChangeError(oldValue, newValue) {
                    throw new exceptions_2.ExpressionChangedAfterItHasBeenCheckedException(this._currentBinding().debug, oldValue, newValue, null);
                }
                throwDehydratedError() { throw new exceptions_2.DehydratedException(); }
                _currentBinding() {
                    return this.bindingTargets[this.propertyBindingIndex];
                }
            }
            AbstractChangeDetector = AbstractChangeDetector;
        }
    }
});
//# sourceMappingURL=abstract_change_detector.js.map