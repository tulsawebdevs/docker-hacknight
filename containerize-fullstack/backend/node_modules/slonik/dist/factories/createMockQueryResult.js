"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockQueryResult = void 0;
const createMockQueryResult = (rows) => {
    return {
        command: 'SELECT',
        fields: [],
        notices: [],
        rowCount: rows.length,
        rows,
    };
};
exports.createMockQueryResult = createMockQueryResult;
//# sourceMappingURL=createMockQueryResult.js.map