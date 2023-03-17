"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeIdentifier = void 0;
const rule = /"/gu;
/**
 * @see https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/lib/client.js#L306-L322
 */
const escapeIdentifier = (identifier) => {
    return '"' + identifier.replace(rule, '""') + '"';
};
exports.escapeIdentifier = escapeIdentifier;
//# sourceMappingURL=escapeIdentifier.js.map