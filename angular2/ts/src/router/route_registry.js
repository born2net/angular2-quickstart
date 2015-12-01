System.register(['./route_recognizer', './instruction', 'angular2/src/core/facade/collection', 'angular2/src/core/facade/async', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', './route_config_impl', 'angular2/src/core/reflection/reflection', 'angular2/angular2', './route_config_nomalizer', './url_parser'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var route_recognizer_1, instruction_1, collection_1, async_1, lang_1, exceptions_1, route_config_impl_1, reflection_1, angular2_1, route_config_nomalizer_1, url_parser_1;
    var _resolveToNull, RouteRegistry;
    /*
     * Given a list of instructions, returns the most specific instruction
     */
    function mostSpecific(instructions) {
        return collection_1.ListWrapper.maximum(instructions, (instruction) => instruction.component.specificity);
    }
    function assertTerminalComponent(component, path) {
        if (!lang_1.isType(component)) {
            return;
        }
        var annotations = reflection_1.reflector.annotations(component);
        if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof route_config_impl_1.RouteConfig) {
                    throw new exceptions_1.BaseException(`Child routes are not allowed for "${path}". Use "..." on the parent's route path.`);
                }
            }
        }
    }
    return {
        setters:[
            function (route_recognizer_1_1) {
                route_recognizer_1 = route_recognizer_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (route_config_impl_1_1) {
                route_config_impl_1 = route_config_impl_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (route_config_nomalizer_1_1) {
                route_config_nomalizer_1 = route_config_nomalizer_1_1;
            },
            function (url_parser_1_1) {
                url_parser_1 = url_parser_1_1;
            }],
        execute: function() {
            var _resolveToNull = async_1.PromiseWrapper.resolve(null);
            /**
             * The RouteRegistry holds route configurations for each component in an Angular app.
             * It is responsible for creating Instructions from URLs, and generating URLs based on route and
             * parameters.
             */
            let RouteRegistry = class {
                constructor() {
                    this._rules = new collection_1.Map();
                }
                /**
                 * Given a component and a configuration object, add the route to this registry
                 */
                config(parentComponent, config) {
                    config = route_config_nomalizer_1.normalizeRouteConfig(config);
                    // this is here because Dart type guard reasons
                    if (config instanceof route_config_impl_1.Route) {
                        route_config_nomalizer_1.assertComponentExists(config.component, config.path);
                    }
                    else if (config instanceof route_config_impl_1.AuxRoute) {
                        route_config_nomalizer_1.assertComponentExists(config.component, config.path);
                    }
                    var recognizer = this._rules.get(parentComponent);
                    if (lang_1.isBlank(recognizer)) {
                        recognizer = new route_recognizer_1.RouteRecognizer();
                        this._rules.set(parentComponent, recognizer);
                    }
                    var terminal = recognizer.config(config);
                    if (config instanceof route_config_impl_1.Route) {
                        if (terminal) {
                            assertTerminalComponent(config.component, config.path);
                        }
                        else {
                            this.configFromComponent(config.component);
                        }
                    }
                }
                /**
                 * Reads the annotations of a component and configures the registry based on them
                 */
                configFromComponent(component) {
                    if (!lang_1.isType(component)) {
                        return;
                    }
                    // Don't read the annotations from a type more than once –
                    // this prevents an infinite loop if a component routes recursively.
                    if (this._rules.has(component)) {
                        return;
                    }
                    var annotations = reflection_1.reflector.annotations(component);
                    if (lang_1.isPresent(annotations)) {
                        for (var i = 0; i < annotations.length; i++) {
                            var annotation = annotations[i];
                            if (annotation instanceof route_config_impl_1.RouteConfig) {
                                let routeCfgs = annotation.configs;
                                routeCfgs.forEach(config => this.config(component, config));
                            }
                        }
                    }
                }
                /**
                 * Given a URL and a parent component, return the most specific instruction for navigating
                 * the application into the state specified by the url
                 */
                recognize(url, parentComponent) {
                    var parsedUrl = url_parser_1.parser.parse(url);
                    return this._recognize(parsedUrl, parentComponent);
                }
                _recognize(parsedUrl, parentComponent) {
                    return this._recognizePrimaryRoute(parsedUrl, parentComponent)
                        .then((instruction) => this._completeAuxiliaryRouteMatches(instruction, parentComponent));
                }
                _recognizePrimaryRoute(parsedUrl, parentComponent) {
                    var componentRecognizer = this._rules.get(parentComponent);
                    if (lang_1.isBlank(componentRecognizer)) {
                        return _resolveToNull;
                    }
                    // Matches some beginning part of the given URL
                    var possibleMatches = componentRecognizer.recognize(parsedUrl);
                    var matchPromises = possibleMatches.map(candidate => this._completePrimaryRouteMatch(candidate));
                    return async_1.PromiseWrapper.all(matchPromises).then(mostSpecific);
                }
                _completePrimaryRouteMatch(partialMatch) {
                    var instruction = partialMatch.instruction;
                    return instruction.resolveComponentType().then((componentType) => {
                        this.configFromComponent(componentType);
                        if (instruction.terminal) {
                            return new instruction_1.PrimaryInstruction(instruction, null, partialMatch.remainingAux);
                        }
                        return this._recognizePrimaryRoute(partialMatch.remaining, componentType)
                            .then((childInstruction) => {
                            if (lang_1.isBlank(childInstruction)) {
                                return null;
                            }
                            else {
                                return new instruction_1.PrimaryInstruction(instruction, childInstruction, partialMatch.remainingAux);
                            }
                        });
                    });
                }
                _completeAuxiliaryRouteMatches(instruction, parentComponent) {
                    if (lang_1.isBlank(instruction)) {
                        return _resolveToNull;
                    }
                    var componentRecognizer = this._rules.get(parentComponent);
                    var auxInstructions = {};
                    var promises = instruction.auxUrls.map((auxSegment) => {
                        var match = componentRecognizer.recognizeAuxiliary(auxSegment);
                        if (lang_1.isBlank(match)) {
                            return _resolveToNull;
                        }
                        return this._completePrimaryRouteMatch(match).then((auxInstruction) => {
                            if (lang_1.isPresent(auxInstruction)) {
                                return this._completeAuxiliaryRouteMatches(auxInstruction, parentComponent)
                                    .then((finishedAuxRoute) => {
                                    auxInstructions[auxSegment.path] = finishedAuxRoute;
                                });
                            }
                        });
                    });
                    return async_1.PromiseWrapper.all(promises).then((_) => {
                        if (lang_1.isBlank(instruction.child)) {
                            return new instruction_1.Instruction(instruction.component, null, auxInstructions);
                        }
                        return this._completeAuxiliaryRouteMatches(instruction.child, instruction.component.componentType)
                            .then((completeChild) => {
                            return new instruction_1.Instruction(instruction.component, completeChild, auxInstructions);
                        });
                    });
                }
                /**
                 * Given a normalized list with component names and params like: `['user', {id: 3 }]`
                 * generates a url with a leading slash relative to the provided `parentComponent`.
                 */
                generate(linkParams, parentComponent) {
                    let segments = [];
                    let componentCursor = parentComponent;
                    var lastInstructionIsTerminal = false;
                    for (let i = 0; i < linkParams.length; i += 1) {
                        let segment = linkParams[i];
                        if (lang_1.isBlank(componentCursor)) {
                            throw new exceptions_1.BaseException(`Could not find route named "${segment}".`);
                        }
                        if (!lang_1.isString(segment)) {
                            throw new exceptions_1.BaseException(`Unexpected segment "${segment}" in link DSL. Expected a string.`);
                        }
                        else if (segment == '' || segment == '.' || segment == '..') {
                            throw new exceptions_1.BaseException(`"${segment}/" is only allowed at the beginning of a link DSL.`);
                        }
                        let params = {};
                        if (i + 1 < linkParams.length) {
                            let nextSegment = linkParams[i + 1];
                            if (lang_1.isStringMap(nextSegment)) {
                                params = nextSegment;
                                i += 1;
                            }
                        }
                        var componentRecognizer = this._rules.get(componentCursor);
                        if (lang_1.isBlank(componentRecognizer)) {
                            throw new exceptions_1.BaseException(`Component "${lang_1.getTypeNameForDebugging(componentCursor)}" has no route config.`);
                        }
                        var response = componentRecognizer.generate(segment, params);
                        if (lang_1.isBlank(response)) {
                            throw new exceptions_1.BaseException(`Component "${lang_1.getTypeNameForDebugging(componentCursor)}" has no route named "${segment}".`);
                        }
                        segments.push(response);
                        componentCursor = response.componentType;
                        lastInstructionIsTerminal = response.terminal;
                    }
                    var instruction = null;
                    if (!lastInstructionIsTerminal) {
                        instruction = this._generateRedirects(componentCursor);
                        if (lang_1.isPresent(instruction)) {
                            let lastInstruction = instruction;
                            while (lang_1.isPresent(lastInstruction.child)) {
                                lastInstruction = lastInstruction.child;
                            }
                            lastInstructionIsTerminal = lastInstruction.component.terminal;
                        }
                        if (lang_1.isPresent(componentCursor) && !lastInstructionIsTerminal) {
                            throw new exceptions_1.BaseException(`Link "${collection_1.ListWrapper.toJSON(linkParams)}" does not resolve to a terminal or async instruction.`);
                        }
                    }
                    while (segments.length > 0) {
                        instruction = new instruction_1.Instruction(segments.pop(), instruction, {});
                    }
                    return instruction;
                }
                // if the child includes a redirect like : "/" -> "/something",
                // we want to honor that redirection when creating the link
                _generateRedirects(componentCursor) {
                    if (lang_1.isBlank(componentCursor)) {
                        return null;
                    }
                    var componentRecognizer = this._rules.get(componentCursor);
                    if (lang_1.isBlank(componentRecognizer)) {
                        return null;
                    }
                    for (let i = 0; i < componentRecognizer.redirects.length; i += 1) {
                        let redirect = componentRecognizer.redirects[i];
                        // we only handle redirecting from an empty segment
                        if (redirect.segments.length == 1 && redirect.segments[0] == '') {
                            var toSegments = url_parser_1.pathSegmentsToUrl(redirect.toSegments);
                            var matches = componentRecognizer.recognize(toSegments);
                            var primaryInstruction = collection_1.ListWrapper.maximum(matches, (match) => match.instruction.specificity);
                            if (lang_1.isPresent(primaryInstruction)) {
                                var child = this._generateRedirects(primaryInstruction.instruction.componentType);
                                return new instruction_1.Instruction(primaryInstruction.instruction, child, {});
                            }
                            return null;
                        }
                    }
                    return null;
                }
            };
            RouteRegistry = __decorate([
                angular2_1.Injectable()
            ], RouteRegistry);
            RouteRegistry = RouteRegistry;
        }
    }
});
//# sourceMappingURL=route_registry.js.map