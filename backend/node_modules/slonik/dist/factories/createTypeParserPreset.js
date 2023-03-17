"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeParserPreset = void 0;
const typeParsers_1 = require("./typeParsers");
const createTypeParserPreset = () => {
    return [
        (0, typeParsers_1.createBigintTypeParser)(),
        (0, typeParsers_1.createDateTypeParser)(),
        (0, typeParsers_1.createIntervalTypeParser)(),
        (0, typeParsers_1.createNumericTypeParser)(),
        (0, typeParsers_1.createTimestampTypeParser)(),
        (0, typeParsers_1.createTimestampWithTimeZoneTypeParser)(),
    ];
};
exports.createTypeParserPreset = createTypeParserPreset;
//# sourceMappingURL=createTypeParserPreset.js.map