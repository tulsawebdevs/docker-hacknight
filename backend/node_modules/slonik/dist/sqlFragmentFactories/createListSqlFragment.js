"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListSqlFragment = void 0;
const errors_1 = require("../errors");
const factories_1 = require("../factories");
const utilities_1 = require("../utilities");
const createListSqlFragment = (token, greatestParameterPosition) => {
    const values = [];
    const placeholders = [];
    let placeholderIndex = greatestParameterPosition;
    if (token.members.length === 0) {
        throw new errors_1.InvalidInputError('Value list must have at least 1 member.');
    }
    for (const member of token.members) {
        if ((0, utilities_1.isSqlToken)(member)) {
            const sqlFragment = (0, factories_1.createSqlTokenSqlFragment)(member, placeholderIndex);
            placeholders.push(sqlFragment.sql);
            placeholderIndex += sqlFragment.values.length;
            values.push(...sqlFragment.values);
        }
        else if ((0, utilities_1.isPrimitiveValueExpression)(member)) {
            placeholders.push('$' + String(++placeholderIndex));
            values.push(member);
        }
        else {
            throw new errors_1.InvalidInputError('Invalid list member type. Must be a SQL token or a primitive value expression.');
        }
    }
    return {
        sql: placeholders.join(token.glue.sql),
        values: (0, factories_1.createPrimitiveValueExpressions)(values),
    };
};
exports.createListSqlFragment = createListSqlFragment;
//# sourceMappingURL=createListSqlFragment.js.map