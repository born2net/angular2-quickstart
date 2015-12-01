System.register(['angular2/src/core/facade/async', 'angular2/src/core/facade/collection', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/angular2', './router', './instruction', './route_data', './lifecycle_annotations', './route_lifecycle_reflector'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var async_1, collection_1, lang_1, exceptions_1, angular2_1, routerMod, instruction_1, route_data_1, hookMod, route_lifecycle_reflector_1;
    var _resolveToTrue, RouterOutlet;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (routerMod_1) {
                routerMod = routerMod_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            },
            function (route_data_1_1) {
                route_data_1 = route_data_1_1;
            },
            function (hookMod_1) {
                hookMod = hookMod_1;
            },
            function (route_lifecycle_reflector_1_1) {
                route_lifecycle_reflector_1 = route_lifecycle_reflector_1_1;
            }],
        execute: function() {
            let _resolveToTrue = async_1.PromiseWrapper.resolve(true);
            /**
             * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
             *
             * ## Use
             *
             * ```
             * <router-outlet></router-outlet>
             * ```
             */
            let RouterOutlet = class {
                constructor(_elementRef, _loader, _parentRouter, nameAttr) {
                    this._elementRef = _elementRef;
                    this._loader = _loader;
                    this._parentRouter = _parentRouter;
                    this.name = null;
                    this._componentRef = null;
                    this._currentInstruction = null;
                    if (lang_1.isPresent(nameAttr)) {
                        this.name = nameAttr;
                        this._parentRouter.registerAuxOutlet(this);
                    }
                    else {
                        this._parentRouter.registerPrimaryOutlet(this);
                    }
                }
                /**
                 * Called by the Router to instantiate a new component during the commit phase of a navigation.
                 * This method in turn is responsible for calling the `onActivate` hook of its child.
                 */
                activate(nextInstruction) {
                    var previousInstruction = this._currentInstruction;
                    this._currentInstruction = nextInstruction;
                    var componentType = nextInstruction.componentType;
                    var childRouter = this._parentRouter.childRouter(componentType);
                    var providers = angular2_1.Injector.resolve([
                        angular2_1.provide(route_data_1.ROUTE_DATA, { useValue: nextInstruction.routeData() }),
                        angular2_1.provide(instruction_1.RouteParams, { useValue: new instruction_1.RouteParams(nextInstruction.params) }),
                        angular2_1.provide(routerMod.Router, { useValue: childRouter })
                    ]);
                    return this._loader.loadNextToLocation(componentType, this._elementRef, providers)
                        .then((componentRef) => {
                        this._componentRef = componentRef;
                        if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.onActivate, componentType)) {
                            return this._componentRef.instance.onActivate(nextInstruction, previousInstruction);
                        }
                    });
                }
                /**
                 * Called by the {@link Router} during the commit phase of a navigation when an outlet
                 * reuses a component between different routes.
                 * This method in turn is responsible for calling the `onReuse` hook of its child.
                 */
                reuse(nextInstruction) {
                    var previousInstruction = this._currentInstruction;
                    this._currentInstruction = nextInstruction;
                    if (lang_1.isBlank(this._componentRef)) {
                        throw new exceptions_1.BaseException(`Cannot reuse an outlet that does not contain a component.`);
                    }
                    return async_1.PromiseWrapper.resolve(route_lifecycle_reflector_1.hasLifecycleHook(hookMod.onReuse, this._currentInstruction.componentType) ?
                        this._componentRef.instance.onReuse(nextInstruction, previousInstruction) :
                        true);
                }
                /**
                 * Called by the {@link Router} when an outlet reuses a component across navigations.
                 * This method in turn is responsible for calling the `onReuse` hook of its child.
                 */
                deactivate(nextInstruction) {
                    var next = _resolveToTrue;
                    if (lang_1.isPresent(this._componentRef) && lang_1.isPresent(this._currentInstruction) &&
                        route_lifecycle_reflector_1.hasLifecycleHook(hookMod.onDeactivate, this._currentInstruction.componentType)) {
                        next = async_1.PromiseWrapper.resolve(this._componentRef.instance.onDeactivate(nextInstruction, this._currentInstruction));
                    }
                    return next.then((_) => {
                        if (lang_1.isPresent(this._componentRef)) {
                            this._componentRef.dispose();
                            this._componentRef = null;
                        }
                    });
                }
                /**
                 * Called by the {@link Router} during recognition phase of a navigation.
                 *
                 * If this resolves to `false`, the given navigation is cancelled.
                 *
                 * This method delegates to the child component's `canDeactivate` hook if it exists,
                 * and otherwise resolves to true.
                 */
                canDeactivate(nextInstruction) {
                    if (lang_1.isBlank(this._currentInstruction)) {
                        return _resolveToTrue;
                    }
                    if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.canDeactivate, this._currentInstruction.componentType)) {
                        return async_1.PromiseWrapper.resolve(this._componentRef.instance.canDeactivate(nextInstruction, this._currentInstruction));
                    }
                    return _resolveToTrue;
                }
                /**
                 * Called by the {@link Router} during recognition phase of a navigation.
                 *
                 * If the new child component has a different Type than the existing child component,
                 * this will resolve to `false`. You can't reuse an old component when the new component
                 * is of a different Type.
                 *
                 * Otherwise, this method delegates to the child component's `canReuse` hook if it exists,
                 * or resolves to true if the hook is not present.
                 */
                canReuse(nextInstruction) {
                    var result;
                    if (lang_1.isBlank(this._currentInstruction) ||
                        this._currentInstruction.componentType != nextInstruction.componentType) {
                        result = false;
                    }
                    else if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.canReuse, this._currentInstruction.componentType)) {
                        result = this._componentRef.instance.canReuse(nextInstruction, this._currentInstruction);
                    }
                    else {
                        result = nextInstruction == this._currentInstruction ||
                            (lang_1.isPresent(nextInstruction.params) && lang_1.isPresent(this._currentInstruction.params) &&
                                collection_1.StringMapWrapper.equals(nextInstruction.params, this._currentInstruction.params));
                    }
                    return async_1.PromiseWrapper.resolve(result);
                }
            };
            RouterOutlet = __decorate([
                angular2_1.Directive({ selector: 'router-outlet' }),
                __param(3, angular2_1.Attribute('name'))
            ], RouterOutlet);
            RouterOutlet = RouterOutlet;
        }
    }
});
//# sourceMappingURL=router_outlet.js.map