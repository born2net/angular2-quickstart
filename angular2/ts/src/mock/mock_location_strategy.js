System.register(['angular2/src/core/facade/async', 'angular2/src/router/location_strategy'], function(exports_1) {
    var async_1, location_strategy_1;
    var MockLocationStrategy;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            }],
        execute: function() {
            class MockLocationStrategy extends location_strategy_1.LocationStrategy {
                constructor() {
                    super();
                    this.internalBaseHref = '/';
                    this.internalPath = '/';
                    this.internalTitle = '';
                    this.urlChanges = [];
                    /** @internal */
                    this._subject = new async_1.EventEmitter();
                }
                simulatePopState(url) {
                    this.internalPath = url;
                    async_1.ObservableWrapper.callNext(this._subject, null);
                }
                path() { return this.internalPath; }
                simulateUrlPop(pathname) {
                    async_1.ObservableWrapper.callNext(this._subject, { 'url': pathname });
                }
                pushState(ctx, title, path, query) {
                    this.internalTitle = title;
                    var url = path + (query.length > 0 ? ('?' + query) : '');
                    this.internalPath = url;
                    this.urlChanges.push(url);
                }
                onPopState(fn) { async_1.ObservableWrapper.subscribe(this._subject, fn); }
                getBaseHref() { return this.internalBaseHref; }
                back() {
                    if (this.urlChanges.length > 0) {
                        this.urlChanges.pop();
                        var nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
                        this.simulatePopState(nextUrl);
                    }
                }
                forward() { throw 'not implemented'; }
            }
            MockLocationStrategy = MockLocationStrategy;
        }
    }
});
//# sourceMappingURL=mock_location_strategy.js.map