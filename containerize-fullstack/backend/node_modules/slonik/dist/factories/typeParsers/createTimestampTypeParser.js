"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimestampTypeParser = void 0;
const timestampParser = (value) => {
    return value === null ? value : Date.parse(value + ' UTC');
};
const createTimestampTypeParser = () => {
    return {
        name: 'timestamp',
        parse: timestampParser,
    };
};
exports.createTimestampTypeParser = createTimestampTypeParser;
//# sourceMappingURL=createTimestampTypeParser.js.map