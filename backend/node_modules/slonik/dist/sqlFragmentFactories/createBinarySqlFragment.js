"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBinarySqlFragment = void 0;
const errors_1 = require("../errors");
const createBinarySqlFragment = (token, greatestParameterPosition) => {
    if (!Buffer.isBuffer(token.data)) {
        throw new errors_1.InvalidInputError('Binary value must be a buffer.');
    }
    return {
        sql: '$' + String(greatestParameterPosition + 1),
        values: [
            token.data,
        ],
    };
};
exports.createBinarySqlFragment = createBinarySqlFragment;
//# sourceMappingURL=createBinarySqlFragment.js.map