import {Directive} from '../core/metadata';
import {StringMapWrapper} from 'angular2/src/core/facade/collection';

import {Router} from './router';
import {Location} from './location';
import {Instruction, stringifyInstruction} from './instruction';

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
@Directive({
  selector: '[router-link]',
  inputs: ['routeParams: routerLink'],
  host: {
    '(click)': 'onClick()',
    '[attr.href]': 'visibleHref',
    '[class.router-link-active]': 'isRouteActive'
  }
})
export class RouterLink {
  private _routeParams: any[];

  // the url displayed on the anchor element.
  visibleHref: string;

  // the instruction passed to the router to navigate
  private _navigationInstruction: Instruction;

  constructor(private _router: Router, private _location: Location) {}

  get isRouteActive(): boolean { return this._router.isRouteActive(this._navigationInstruction); }

  set routeParams(changes: any[]) {
    this._routeParams = changes;
    this._navigationInstruction = this._router.generate(this._routeParams);

    // TODO: is this the right spot for this?
    var navigationHref = '/' + stringifyInstruction(this._navigationInstruction);
    this.visibleHref = this._location.normalizeAbsolutely(navigationHref);
  }

  onClick(): boolean {
    this._router.navigateByInstruction(this._navigationInstruction);
    return false;
  }
}
