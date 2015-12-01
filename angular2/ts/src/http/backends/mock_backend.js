System.register(['angular2/angular2', '../static_request', '../enums', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var angular2_1, static_request_1, enums_1, lang_1, exceptions_1;
    var Rx, Subject, ReplaySubject, MockConnection, MockBackend;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (static_request_1_1) {
                static_request_1 = static_request_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
            let { Subject, ReplaySubject } = Rx;
            /**
             *
             * Mock Connection to represent a {@link Connection} for tests.
             *
             **/
            class MockConnection {
                constructor(req) {
                    this.response = new ReplaySubject(1).take(1);
                    this.readyState = enums_1.ReadyStates.Open;
                    this.request = req;
                }
                /**
                 * Sends a mock response to the connection. This response is the value that is emitted to the
                 * {@link EventEmitter} returned by {@link Http}.
                 *
                 * #Example
                 *
                 * ```
                 * var connection;
                 * backend.connections.subscribe(c => connection = c);
                 * http.request('data.json').subscribe(res => console.log(res.text()));
                 * connection.mockRespond(new Response('fake response')); //logs 'fake response'
                 * ```
                 *
                 */
                mockRespond(res) {
                    if (this.readyState === enums_1.ReadyStates.Done || this.readyState === enums_1.ReadyStates.Cancelled) {
                        throw new exceptions_1.BaseException('Connection has already been resolved');
                    }
                    this.readyState = enums_1.ReadyStates.Done;
                    this.response.next(res);
                    this.response.complete();
                }
                /**
                 * Not yet implemented!
                 *
                 * Sends the provided {@link Response} to the `downloadObserver` of the `Request`
                 * associated with this connection.
                 */
                mockDownload(res) {
                    // this.request.downloadObserver.onNext(res);
                    // if (res.bytesLoaded === res.totalBytes) {
                    //   this.request.downloadObserver.onCompleted();
                    // }
                }
                // TODO(jeffbcross): consider using Response type
                /**
                 * Emits the provided error object as an error to the {@link Response} {@link EventEmitter}
                 * returned
                 * from {@link Http}.
                 */
                mockError(err) {
                    // Matches XHR semantics
                    this.readyState = enums_1.ReadyStates.Done;
                    this.response.error(err);
                }
            }
            MockConnection = MockConnection;
            /**
             * A mock backend for testing the {@link Http} service.
             *
             * This class can be injected in tests, and should be used to override providers
             * to other backends, such as {@link XHRBackend}.
             *
             * #Example
             *
             * ```
             * import {MockBackend, DefaultOptions, Http} from 'angular2/http';
             * it('should get some data', inject([AsyncTestCompleter], (async) => {
             *   var connection;
             *   var injector = Injector.resolveAndCreate([
             *     MockBackend,
             *     provide(Http, {useFactory: (backend, defaultOptions) => {
             *       return new Http(backend, defaultOptions)
             *     }, deps: [MockBackend, DefaultOptions]})]);
             *   var http = injector.get(Http);
             *   var backend = injector.get(MockBackend);
             *   //Assign any newly-created connection to local variable
             *   backend.connections.subscribe(c => connection = c);
             *   http.request('data.json').subscribe((res) => {
             *     expect(res.text()).toBe('awesome');
             *     async.done();
             *   });
             *   connection.mockRespond(new Response('awesome'));
             * }));
             * ```
             *
             * This method only exists in the mock implementation, not in real Backends.
             **/
            let MockBackend = class {
                constructor() {
                    this.connectionsArray = [];
                    this.connections = new Subject();
                    this.connections.subscribe(connection => this.connectionsArray.push(connection));
                    this.pendingConnections = new Subject();
                }
                /**
                 * Checks all connections, and raises an exception if any connection has not received a response.
                 *
                 * This method only exists in the mock implementation, not in real Backends.
                 */
                verifyNoPendingRequests() {
                    let pending = 0;
                    this.pendingConnections.subscribe(c => pending++);
                    if (pending > 0)
                        throw new exceptions_1.BaseException(`${pending} pending connections to be resolved`);
                }
                /**
                 * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
                 * connections, if it's expected that there are connections that have not yet received a response.
                 *
                 * This method only exists in the mock implementation, not in real Backends.
                 */
                resolveAllConnections() { this.connections.subscribe(c => c.readyState = 4); }
                /**
                 * Creates a new {@link MockConnection}. This is equivalent to calling `new
                 * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
                 * emitter of this `MockBackend` instance. This method will usually only be used by tests
                 * against the framework itself, not by end-users.
                 */
                createConnection(req) {
                    if (!lang_1.isPresent(req) || !(req instanceof static_request_1.Request)) {
                        throw new exceptions_1.BaseException(`createConnection requires an instance of Request, got ${req}`);
                    }
                    let connection = new MockConnection(req);
                    this.connections.next(connection);
                    return connection;
                }
            };
            MockBackend = __decorate([
                angular2_1.Injectable()
            ], MockBackend);
            MockBackend = MockBackend;
        }
    }
});
//# sourceMappingURL=mock_backend.js.map