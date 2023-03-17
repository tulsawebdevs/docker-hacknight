"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateTypeParser = void 0;
const dateParser = (value) => {
    return value;
};
const createDateTypeParser = () => {
    return {
        name: 'date',
        parse: dateParser,
    };
};
exports.createDateTypeParser = createDateTypeParser;
//# sourceMappingURL=createDateTypeParser.js.map