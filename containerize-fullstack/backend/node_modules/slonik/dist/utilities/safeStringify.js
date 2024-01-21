"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeStringify = void 0;
const safe_stable_stringify_1 = require("safe-stable-stringify");
const stringify = (0, safe_stable_stringify_1.configure)({
    bigint: true,
    circularValue: '[Circular]',
    strict: true,
});
const safeStringify = (subject, replacer, space) => {
    const result = stringify(subject, replacer, space);
    if (result === undefined) {
        throw new Error('Expected result to be string');
    }
    return result;
};
exports.safeStringify = safeStringify;
//# sourceMappingURL=safeStringify.js.map