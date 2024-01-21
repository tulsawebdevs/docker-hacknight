"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentifierSqlFragment = void 0;
const errors_1 = require("../errors");
const utilities_1 = require("../utilities");
const createIdentifierSqlFragment = (token) => {
    const sql = token.names
        .map((identifierName) => {
        if (typeof identifierName !== 'string') {
            throw new errors_1.InvalidInputError('Identifier name array member type must be a string.');
        }
        return (0, utilities_1.escapeIdentifier)(identifierName);
    })
        .join('.');
    return {
        sql,
        values: [],
    };
};
exports.createIdentifierSqlFragment = createIdentifierSqlFragment;
//# sourceMappingURL=createIdentifierSqlFragment.js.map