"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSqlToken = void 0;
const errors_1 = require("../errors");
const tokens_1 = require("../tokens");
const hasOwnProperty_1 = require("./hasOwnProperty");
const Tokens = [
    tokens_1.ArrayToken,
    tokens_1.BinaryToken,
    tokens_1.ComparisonPredicateToken,
    tokens_1.DateToken,
    tokens_1.FragmentToken,
    tokens_1.IdentifierToken,
    tokens_1.IntervalToken,
    tokens_1.JsonBinaryToken,
    tokens_1.JsonToken,
    tokens_1.ListToken,
    tokens_1.QueryToken,
    tokens_1.TimestampToken,
    tokens_1.UnnestToken,
];
const isSqlToken = (subject) => {
    if (typeof subject !== 'object' || subject === null) {
        return false;
    }
    if (!(0, hasOwnProperty_1.hasOwnProperty)(subject, 'type')) {
        throw new errors_1.UnexpectedStateError('Expected token to include "type" property.');
    }
    if (typeof subject.type !== 'string') {
        throw new errors_1.UnexpectedStateError('Expected type to be string.');
    }
    return Tokens.includes(subject.type);
};
exports.isSqlToken = isSqlToken;
//# sourceMappingURL=isSqlToken.js.map