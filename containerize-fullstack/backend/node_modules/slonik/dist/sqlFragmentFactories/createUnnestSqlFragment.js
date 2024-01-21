"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnnestSqlFragment = void 0;
const errors_1 = require("../errors");
const utilities_1 = require("../utilities");
const createUnnestSqlFragment = (token, greatestParameterPosition) => {
    const { columnTypes, } = token;
    const values = [];
    const unnestBindings = [];
    const unnestSqlTokens = [];
    let columnIndex = 0;
    let placeholderIndex = greatestParameterPosition;
    while (columnIndex < columnTypes.length) {
        const typeMember = columnTypes[columnIndex];
        let columnType = columnTypes[columnIndex];
        let columnTypeIsIdentifier;
        if (typeof typeMember === 'string') {
            columnType = typeMember;
            columnTypeIsIdentifier = false;
        }
        else if (Array.isArray(typeMember)) {
            columnType = typeMember.map((identifierName) => {
                if (typeof identifierName !== 'string') {
                    throw new errors_1.InvalidInputError('sql.unnest column identifier name array member type must be a string (type name identifier) or a SQL token.');
                }
                return (0, utilities_1.escapeIdentifier)(identifierName);
            })
                .join('.');
            columnTypeIsIdentifier = true;
        }
        else {
            columnType = typeMember.sql;
            columnTypeIsIdentifier = true;
        }
        unnestSqlTokens.push('$' +
            String(++placeholderIndex) +
            '::' +
            (columnTypeIsIdentifier ? (0, utilities_1.stripArrayNotation)(columnType) : (0, utilities_1.escapeIdentifier)((0, utilities_1.stripArrayNotation)(columnType))) +
            '[]'.repeat((0, utilities_1.countArrayDimensions)(columnType) + 1));
        unnestBindings[columnIndex] = [];
        columnIndex++;
    }
    let lastTupleSize;
    for (const tupleValues of token.tuples) {
        if (typeof lastTupleSize === 'number' && lastTupleSize !== tupleValues.length) {
            throw new Error('Each tuple in a list of tuples must have an equal number of members.');
        }
        if (tupleValues.length !== columnTypes.length) {
            throw new Error('Column types length must match tuple member length.');
        }
        lastTupleSize = tupleValues.length;
        let tupleColumnIndex = 0;
        for (const tupleValue of tupleValues) {
            if (!Array.isArray(tupleValue) && !(0, utilities_1.isPrimitiveValueExpression)(tupleValue) && !Buffer.isBuffer(tupleValue)) {
                throw new errors_1.InvalidInputError('Invalid unnest tuple member type. Must be a primitive value expression.');
            }
            const tupleBindings = unnestBindings[tupleColumnIndex++];
            if (!tupleBindings) {
                throw new Error('test');
            }
            tupleBindings.push(tupleValue);
        }
    }
    values.push(...unnestBindings);
    const sql = 'unnest(' + unnestSqlTokens.join(', ') + ')';
    return {
        sql,
        values,
    };
};
exports.createUnnestSqlFragment = createUnnestSqlFragment;
//# sourceMappingURL=createUnnestSqlFragment.js.map