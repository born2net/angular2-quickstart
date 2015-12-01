System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/src/core/facade/collection', './abstract_change_detector', './change_detection_util', './constants', './proto_record'], function(exports_1) {
    var lang_1, exceptions_1, collection_1, abstract_change_detector_1, change_detection_util_1, constants_1, proto_record_1;
    var DynamicChangeDetector;
    function isSame(a, b) {
        if (a === b)
            return true;
        if (a instanceof String && b instanceof String && a == b)
            return true;
        if ((a !== a) && (b !== b))
            return true;
        return false;
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
            },
            function (abstract_change_detector_1_1) {
                abstract_change_detector_1 = abstract_change_detector_1_1;
            },
            function (change_detection_util_1_1) {
                change_detection_util_1 = change_detection_util_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (proto_record_1_1) {
                proto_record_1 = proto_record_1_1;
            }],
        execute: function() {
            class DynamicChangeDetector extends abstract_change_detector_1.AbstractChangeDetector {
                constructor(id, dispatcher, numberOfPropertyProtoRecords, propertyBindingTargets, directiveIndices, strategy, _records, _eventBindings, _directiveRecords, _genConfig) {
                    super(id, dispatcher, numberOfPropertyProtoRecords, propertyBindingTargets, directiveIndices, strategy);
                    this._records = _records;
                    this._eventBindings = _eventBindings;
                    this._directiveRecords = _directiveRecords;
                    this._genConfig = _genConfig;
                    this.directives = null;
                    var len = _records.length + 1;
                    this.values = collection_1.ListWrapper.createFixedSize(len);
                    this.localPipes = collection_1.ListWrapper.createFixedSize(len);
                    this.prevContexts = collection_1.ListWrapper.createFixedSize(len);
                    this.changes = collection_1.ListWrapper.createFixedSize(len);
                    this.dehydrateDirectives(false);
                }
                handleEventInternal(eventName, elIndex, locals) {
                    var preventDefault = false;
                    this._matchingEventBindings(eventName, elIndex)
                        .forEach(rec => {
                        var res = this._processEventBinding(rec, locals);
                        if (res === false) {
                            preventDefault = true;
                        }
                    });
                    return preventDefault;
                }
                /** @internal */
                _processEventBinding(eb, locals) {
                    var values = collection_1.ListWrapper.createFixedSize(eb.records.length);
                    values[0] = this.values[0];
                    for (var i = 0; i < eb.records.length; ++i) {
                        var proto = eb.records[i];
                        var res = this._calculateCurrValue(proto, values, locals);
                        if (proto.lastInBinding) {
                            this._markPathAsCheckOnce(proto);
                            return res;
                        }
                        else {
                            this._writeSelf(proto, res, values);
                        }
                    }
                    throw new exceptions_1.BaseException("Cannot be reached");
                }
                /** @internal */
                _markPathAsCheckOnce(proto) {
                    if (!proto.bindingRecord.isDefaultChangeDetection()) {
                        var dir = proto.bindingRecord.directiveRecord;
                        this._getDetectorFor(dir.directiveIndex).markPathToRootAsCheckOnce();
                    }
                }
                /** @internal */
                _matchingEventBindings(eventName, elIndex) {
                    return collection_1.ListWrapper.filter(this._eventBindings, eb => eb.eventName == eventName && eb.elIndex === elIndex);
                }
                hydrateDirectives(directives) {
                    this.values[0] = this.context;
                    this.directives = directives;
                    if (this.strategy === constants_1.ChangeDetectionStrategy.OnPushObserve) {
                        for (var i = 0; i < this.directiveIndices.length; ++i) {
                            var index = this.directiveIndices[i];
                            super.observeDirective(directives.getDirectiveFor(index), i);
                        }
                    }
                }
                dehydrateDirectives(destroyPipes) {
                    if (destroyPipes) {
                        this._destroyPipes();
                    }
                    this.values[0] = null;
                    this.directives = null;
                    collection_1.ListWrapper.fill(this.values, change_detection_util_1.ChangeDetectionUtil.uninitialized, 1);
                    collection_1.ListWrapper.fill(this.changes, false);
                    collection_1.ListWrapper.fill(this.localPipes, null);
                    collection_1.ListWrapper.fill(this.prevContexts, change_detection_util_1.ChangeDetectionUtil.uninitialized);
                }
                /** @internal */
                _destroyPipes() {
                    for (var i = 0; i < this.localPipes.length; ++i) {
                        if (lang_1.isPresent(this.localPipes[i])) {
                            change_detection_util_1.ChangeDetectionUtil.callPipeOnDestroy(this.localPipes[i]);
                        }
                    }
                }
                checkNoChanges() { this.runDetectChanges(true); }
                detectChangesInRecordsInternal(throwOnChange) {
                    var protos = this._records;
                    var changes = null;
                    var isChanged = false;
                    for (var i = 0; i < protos.length; ++i) {
                        var proto = protos[i];
                        var bindingRecord = proto.bindingRecord;
                        var directiveRecord = bindingRecord.directiveRecord;
                        if (this._firstInBinding(proto)) {
                            this.propertyBindingIndex = proto.propertyBindingIndex;
                        }
                        if (proto.isLifeCycleRecord()) {
                            if (proto.name === "DoCheck" && !throwOnChange) {
                                this._getDirectiveFor(directiveRecord.directiveIndex).doCheck();
                            }
                            else if (proto.name === "OnInit" && !throwOnChange && !this.alreadyChecked) {
                                this._getDirectiveFor(directiveRecord.directiveIndex).onInit();
                            }
                            else if (proto.name === "OnChanges" && lang_1.isPresent(changes) && !throwOnChange) {
                                this._getDirectiveFor(directiveRecord.directiveIndex).onChanges(changes);
                            }
                        }
                        else {
                            var change = this._check(proto, throwOnChange, this.values, this.locals);
                            if (lang_1.isPresent(change)) {
                                this._updateDirectiveOrElement(change, bindingRecord);
                                isChanged = true;
                                changes = this._addChange(bindingRecord, change, changes);
                            }
                        }
                        if (proto.lastInDirective) {
                            changes = null;
                            if (isChanged && !bindingRecord.isDefaultChangeDetection()) {
                                this._getDetectorFor(directiveRecord.directiveIndex).markAsCheckOnce();
                            }
                            isChanged = false;
                        }
                    }
                }
                /** @internal */
                _firstInBinding(r) {
                    var prev = change_detection_util_1.ChangeDetectionUtil.protoByIndex(this._records, r.selfIndex - 1);
                    return lang_1.isBlank(prev) || prev.bindingRecord !== r.bindingRecord;
                }
                afterContentLifecycleCallbacksInternal() {
                    var dirs = this._directiveRecords;
                    for (var i = dirs.length - 1; i >= 0; --i) {
                        var dir = dirs[i];
                        if (dir.callAfterContentInit && !this.alreadyChecked) {
                            this._getDirectiveFor(dir.directiveIndex).afterContentInit();
                        }
                        if (dir.callAfterContentChecked) {
                            this._getDirectiveFor(dir.directiveIndex).afterContentChecked();
                        }
                    }
                }
                afterViewLifecycleCallbacksInternal() {
                    var dirs = this._directiveRecords;
                    for (var i = dirs.length - 1; i >= 0; --i) {
                        var dir = dirs[i];
                        if (dir.callAfterViewInit && !this.alreadyChecked) {
                            this._getDirectiveFor(dir.directiveIndex).afterViewInit();
                        }
                        if (dir.callAfterViewChecked) {
                            this._getDirectiveFor(dir.directiveIndex).afterViewChecked();
                        }
                    }
                }
                /** @internal */
                _updateDirectiveOrElement(change, bindingRecord) {
                    if (lang_1.isBlank(bindingRecord.directiveRecord)) {
                        super.notifyDispatcher(change.currentValue);
                    }
                    else {
                        var directiveIndex = bindingRecord.directiveRecord.directiveIndex;
                        bindingRecord.setter(this._getDirectiveFor(directiveIndex), change.currentValue);
                    }
                    if (this._genConfig.logBindingUpdate) {
                        super.logBindingUpdate(change.currentValue);
                    }
                }
                /** @internal */
                _addChange(bindingRecord, change, changes) {
                    if (bindingRecord.callOnChanges()) {
                        return super.addChange(changes, change.previousValue, change.currentValue);
                    }
                    else {
                        return changes;
                    }
                }
                /** @internal */
                _getDirectiveFor(directiveIndex) { return this.directives.getDirectiveFor(directiveIndex); }
                /** @internal */
                _getDetectorFor(directiveIndex) { return this.directives.getDetectorFor(directiveIndex); }
                /** @internal */
                _check(proto, throwOnChange, values, locals) {
                    if (proto.isPipeRecord()) {
                        return this._pipeCheck(proto, throwOnChange, values);
                    }
                    else {
                        return this._referenceCheck(proto, throwOnChange, values, locals);
                    }
                }
                /** @internal */
                _referenceCheck(proto, throwOnChange, values, locals) {
                    if (this._pureFuncAndArgsDidNotChange(proto)) {
                        this._setChanged(proto, false);
                        return null;
                    }
                    var currValue = this._calculateCurrValue(proto, values, locals);
                    if (this.strategy === constants_1.ChangeDetectionStrategy.OnPushObserve) {
                        super.observeValue(currValue, proto.selfIndex);
                    }
                    if (proto.shouldBeChecked()) {
                        var prevValue = this._readSelf(proto, values);
                        if (!isSame(prevValue, currValue)) {
                            if (proto.lastInBinding) {
                                var change = change_detection_util_1.ChangeDetectionUtil.simpleChange(prevValue, currValue);
                                if (throwOnChange)
                                    this.throwOnChangeError(prevValue, currValue);
                                this._writeSelf(proto, currValue, values);
                                this._setChanged(proto, true);
                                return change;
                            }
                            else {
                                this._writeSelf(proto, currValue, values);
                                this._setChanged(proto, true);
                                return null;
                            }
                        }
                        else {
                            this._setChanged(proto, false);
                            return null;
                        }
                    }
                    else {
                        this._writeSelf(proto, currValue, values);
                        this._setChanged(proto, true);
                        return null;
                    }
                }
                /** @internal */
                _calculateCurrValue(proto, values, locals) {
                    switch (proto.mode) {
                        case proto_record_1.RecordType.Self:
                            return this._readContext(proto, values);
                        case proto_record_1.RecordType.Const:
                            return proto.funcOrValue;
                        case proto_record_1.RecordType.PropertyRead:
                            var context = this._readContext(proto, values);
                            return proto.funcOrValue(context);
                        case proto_record_1.RecordType.SafeProperty:
                            var context = this._readContext(proto, values);
                            return lang_1.isBlank(context) ? null : proto.funcOrValue(context);
                        case proto_record_1.RecordType.PropertyWrite:
                            var context = this._readContext(proto, values);
                            var value = this._readArgs(proto, values)[0];
                            proto.funcOrValue(context, value);
                            return value;
                        case proto_record_1.RecordType.KeyedWrite:
                            var context = this._readContext(proto, values);
                            var key = this._readArgs(proto, values)[0];
                            var value = this._readArgs(proto, values)[1];
                            context[key] = value;
                            return value;
                        case proto_record_1.RecordType.Local:
                            return locals.get(proto.name);
                        case proto_record_1.RecordType.InvokeMethod:
                            var context = this._readContext(proto, values);
                            var args = this._readArgs(proto, values);
                            return proto.funcOrValue(context, args);
                        case proto_record_1.RecordType.SafeMethodInvoke:
                            var context = this._readContext(proto, values);
                            if (lang_1.isBlank(context)) {
                                return null;
                            }
                            var args = this._readArgs(proto, values);
                            return proto.funcOrValue(context, args);
                        case proto_record_1.RecordType.KeyedRead:
                            var arg = this._readArgs(proto, values)[0];
                            return this._readContext(proto, values)[arg];
                        case proto_record_1.RecordType.Chain:
                            var args = this._readArgs(proto, values);
                            return args[args.length - 1];
                        case proto_record_1.RecordType.InvokeClosure:
                            return lang_1.FunctionWrapper.apply(this._readContext(proto, values), this._readArgs(proto, values));
                        case proto_record_1.RecordType.Interpolate:
                        case proto_record_1.RecordType.PrimitiveOp:
                        case proto_record_1.RecordType.CollectionLiteral:
                            return lang_1.FunctionWrapper.apply(proto.funcOrValue, this._readArgs(proto, values));
                        default:
                            throw new exceptions_1.BaseException(`Unknown operation ${proto.mode}`);
                    }
                }
                /** @internal */
                _pipeCheck(proto, throwOnChange, values) {
                    var context = this._readContext(proto, values);
                    var selectedPipe = this._pipeFor(proto, context);
                    if (!selectedPipe.pure || this._argsOrContextChanged(proto)) {
                        var args = this._readArgs(proto, values);
                        var currValue = selectedPipe.pipe.transform(context, args);
                        if (proto.shouldBeChecked()) {
                            var prevValue = this._readSelf(proto, values);
                            if (!isSame(prevValue, currValue)) {
                                currValue = change_detection_util_1.ChangeDetectionUtil.unwrapValue(currValue);
                                if (proto.lastInBinding) {
                                    var change = change_detection_util_1.ChangeDetectionUtil.simpleChange(prevValue, currValue);
                                    if (throwOnChange)
                                        this.throwOnChangeError(prevValue, currValue);
                                    this._writeSelf(proto, currValue, values);
                                    this._setChanged(proto, true);
                                    return change;
                                }
                                else {
                                    this._writeSelf(proto, currValue, values);
                                    this._setChanged(proto, true);
                                    return null;
                                }
                            }
                            else {
                                this._setChanged(proto, false);
                                return null;
                            }
                        }
                        else {
                            this._writeSelf(proto, currValue, values);
                            this._setChanged(proto, true);
                            return null;
                        }
                    }
                }
                /** @internal */
                _pipeFor(proto, context) {
                    var storedPipe = this._readPipe(proto);
                    if (lang_1.isPresent(storedPipe))
                        return storedPipe;
                    var pipe = this.pipes.get(proto.name);
                    this._writePipe(proto, pipe);
                    return pipe;
                }
                /** @internal */
                _readContext(proto, values) {
                    if (proto.contextIndex == -1) {
                        return this._getDirectiveFor(proto.directiveIndex);
                    }
                    else {
                        return values[proto.contextIndex];
                    }
                    return values[proto.contextIndex];
                }
                /** @internal */
                _readSelf(proto, values) { return values[proto.selfIndex]; }
                /** @internal */
                _writeSelf(proto, value, values) { values[proto.selfIndex] = value; }
                /** @internal */
                _readPipe(proto) { return this.localPipes[proto.selfIndex]; }
                /** @internal */
                _writePipe(proto, value) { this.localPipes[proto.selfIndex] = value; }
                /** @internal */
                _setChanged(proto, value) {
                    if (proto.argumentToPureFunction)
                        this.changes[proto.selfIndex] = value;
                }
                /** @internal */
                _pureFuncAndArgsDidNotChange(proto) {
                    return proto.isPureFunction() && !this._argsChanged(proto);
                }
                /** @internal */
                _argsChanged(proto) {
                    var args = proto.args;
                    for (var i = 0; i < args.length; ++i) {
                        if (this.changes[args[i]]) {
                            return true;
                        }
                    }
                    return false;
                }
                /** @internal */
                _argsOrContextChanged(proto) {
                    return this._argsChanged(proto) || this.changes[proto.contextIndex];
                }
                /** @internal */
                _readArgs(proto, values) {
                    var res = collection_1.ListWrapper.createFixedSize(proto.args.length);
                    var args = proto.args;
                    for (var i = 0; i < args.length; ++i) {
                        res[i] = values[args[i]];
                    }
                    return res;
                }
            }
            DynamicChangeDetector = DynamicChangeDetector;
        }
    }
});
//# sourceMappingURL=dynamic_change_detector.js.map