/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a {@link ControlGroup} that
 * consists of
 * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
 * to read information
 * from the form DOM elements.
 *
 * This module is not included in the `angular2` module; you must import the forms module
 * explicitly.
 *
 */
System.register(['./forms/model', './forms/directives/abstract_control_directive', './forms/directives/control_container', './forms/directives/ng_control_name', './forms/directives/ng_form_control', './forms/directives/ng_model', './forms/directives/ng_control', './forms/directives/ng_control_group', './forms/directives/ng_form_model', './forms/directives/ng_form', './forms/directives/default_value_accessor', './forms/directives/ng_control_status', './forms/directives/checkbox_value_accessor', './forms/directives/select_control_value_accessor', './forms/directives', './forms/validators', './forms/directives/validators', './forms/form_builder', './facade/lang'], function(exports_1) {
    var form_builder_1, lang_1;
    var FORM_PROVIDERS, FORM_BINDINGS;
    return {
        setters:[
            function (model_1_1) {
                exports_1({
                    "AbstractControl": model_1_1["AbstractControl"],
                    "Control": model_1_1["Control"],
                    "ControlGroup": model_1_1["ControlGroup"],
                    "ControlArray": model_1_1["ControlArray"]
                });
            },
            function (abstract_control_directive_1_1) {
                exports_1({
                    "AbstractControlDirective": abstract_control_directive_1_1["AbstractControlDirective"]
                });
            },
            function (control_container_1_1) {
                exports_1({
                    "ControlContainer": control_container_1_1["ControlContainer"]
                });
            },
            function (ng_control_name_1_1) {
                exports_1({
                    "NgControlName": ng_control_name_1_1["NgControlName"]
                });
            },
            function (ng_form_control_1_1) {
                exports_1({
                    "NgFormControl": ng_form_control_1_1["NgFormControl"]
                });
            },
            function (ng_model_1_1) {
                exports_1({
                    "NgModel": ng_model_1_1["NgModel"]
                });
            },
            function (ng_control_1_1) {
                exports_1({
                    "NgControl": ng_control_1_1["NgControl"]
                });
            },
            function (ng_control_group_1_1) {
                exports_1({
                    "NgControlGroup": ng_control_group_1_1["NgControlGroup"]
                });
            },
            function (ng_form_model_1_1) {
                exports_1({
                    "NgFormModel": ng_form_model_1_1["NgFormModel"]
                });
            },
            function (ng_form_1_1) {
                exports_1({
                    "NgForm": ng_form_1_1["NgForm"]
                });
            },
            function (default_value_accessor_1_1) {
                exports_1({
                    "DefaultValueAccessor": default_value_accessor_1_1["DefaultValueAccessor"]
                });
            },
            function (ng_control_status_1_1) {
                exports_1({
                    "NgControlStatus": ng_control_status_1_1["NgControlStatus"]
                });
            },
            function (checkbox_value_accessor_1_1) {
                exports_1({
                    "CheckboxControlValueAccessor": checkbox_value_accessor_1_1["CheckboxControlValueAccessor"]
                });
            },
            function (select_control_value_accessor_1_1) {
                exports_1({
                    "NgSelectOption": select_control_value_accessor_1_1["NgSelectOption"],
                    "SelectControlValueAccessor": select_control_value_accessor_1_1["SelectControlValueAccessor"]
                });
            },
            function (directives_1_1) {
                exports_1({
                    "FORM_DIRECTIVES": directives_1_1["FORM_DIRECTIVES"]
                });
            },
            function (validators_1_1) {
                exports_1({
                    "NG_VALIDATORS": validators_1_1["NG_VALIDATORS"],
                    "Validators": validators_1_1["Validators"]
                });
            },
            function (validators_2_1) {
                exports_1({
                    "RequiredValidator": validators_2_1["RequiredValidator"],
                    "MinLengthValidator": validators_2_1["MinLengthValidator"],
                    "MaxLengthValidator": validators_2_1["MaxLengthValidator"]
                });
            },
            function (form_builder_2_1) {
                exports_1({
                    "FormBuilder": form_builder_2_1["FormBuilder"]
                });
                form_builder_1 = form_builder_2_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Shorthand set of providers used for building Angular forms.
             *
             * ### Example:
             *
             * ```typescript
             * bootstrap(MyApp, [FORM_PROVIDERS]);
             * ```
             */
            FORM_PROVIDERS = lang_1.CONST_EXPR([form_builder_1.FormBuilder]);
            /**
             * @deprecated
             */
            FORM_BINDINGS = FORM_PROVIDERS;
        }
    }
});
//# sourceMappingURL=forms.js.map