"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimestampWithTimeZoneTypeParser = void 0;
const timestampParser = (value) => {
    return value === null ? value : Date.parse(value);
};
const createTimestampWithTimeZoneTypeParser = () => {
    return {
        name: 'timestamptz',
        parse: timestampParser,
    };
};
exports.createTimestampWithTimeZoneTypeParser = createTimestampWithTimeZoneTypeParser;
//# sourceMappingURL=createTimestampWithTimeZoneTypeParser.js.map