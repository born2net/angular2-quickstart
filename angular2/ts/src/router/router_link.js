System.register(['../core/metadata', './instruction'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var metadata_1, instruction_1;
    var RouterLink;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            /**
             * The RouterLink directive lets you link to specific parts of your app.
             *
             * Consider the following route configuration:
            
             * ```
             * @RouteConfig([
             *   { path: '/user', component: UserCmp, as: 'User' }
             * ]);
             * class MyComp {}
             * ```
             *
             * When linking to this `User` route, you can write:
             *
             * ```
             * <a [router-link]="['./User']">link to user component</a>
             * ```
             *
             * RouterLink expects the value to be an array of route names, followed by the params
             * for that level of routing. For instance `['/Team', {teamId: 1}, 'User', {userId: 2}]`
             * means that we want to generate a link for the `Team` route with params `{teamId: 1}`,
             * and with a child route `User` with params `{userId: 2}`.
             *
             * The first route name should be prepended with `/`, `./`, or `../`.
             * If the route begins with `/`, the router will look up the route from the root of the app.
             * If the route begins with `./`, the router will instead look in the current component's
             * children for the route. And if the route begins with `../`, the router will look at the
             * current component's parent.
             */
            let RouterLink = class {
                constructor(_router, _location) {
                    this._router = _router;
                    this._location = _location;
                }
                get isRouteActive() { return this._router.isRouteActive(this._navigationInstruction); }
                set routeParams(changes) {
                    this._routeParams = changes;
                    this._navigationInstruction = this._router.generate(this._routeParams);
                    // TODO: is this the right spot for this?
                    var navigationHref = '/' + instruction_1.stringifyInstruction(this._navigationInstruction);
                    this.visibleHref = this._location.normalizeAbsolutely(navigationHref);
                }
                onClick() {
                    this._router.navigateByInstruction(this._navigationInstruction);
                    return false;
                }
            };
            RouterLink = __decorate([
                metadata_1.Directive({
                    selector: '[router-link]',
                    inputs: ['routeParams: routerLink'],
                    host: {
                        '(click)': 'onClick()',
                        '[attr.href]': 'visibleHref',
                        '[class.router-link-active]': 'isRouteActive'
                    }
                })
            ], RouterLink);
            RouterLink = RouterLink;
        }
    }
});
//# sourceMappingURL=router_link.js.map