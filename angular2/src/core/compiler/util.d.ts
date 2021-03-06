export declare var IS_DART: boolean;
export declare var MODULE_SUFFIX: string;
export declare function camelCaseToDashCase(input: string): string;
export declare function dashCaseToCamelCase(input: string): string;
export declare function escapeSingleQuoteString(input: string): string;
export declare function escapeDoubleQuoteString(input: string): string;
export declare function codeGenExportVariable(name: string, isConst?: boolean): string;
export declare function codeGenConcatArray(expression: string): string;
export declare function codeGenMapArray(argNames: string[], callback: string): string;
export declare function codeGenReplaceAll(pattern: string, expression: string): string;
export declare function codeGenValueFn(params: string[], value: string, fnName?: string): string;
export declare function codeGenToString(expr: string): string;
export declare function splitAtColon(input: string, defaultValues: string[]): string[];
