"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBigintTypeParser = void 0;
const bigintParser = (value) => {
    // @todo Use bigint when value is greater than Number.MAX_SAFE_INTEGER.
    return Number.parseInt(value, 10);
};
const createBigintTypeParser = () => {
    return {
        name: 'int8',
        parse: bigintParser,
    };
};
exports.createBigintTypeParser = createBigintTypeParser;
//# sourceMappingURL=createBigintTypeParser.js.map