"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countArrayDimensions = void 0;
const countArrayDimensions = (identifierName) => {
    let tail = identifierName.trim();
    let arrayDimensionCount = 0;
    while (tail.endsWith('[]')) {
        arrayDimensionCount++;
        tail = tail.trim().slice(0, -2);
    }
    return arrayDimensionCount;
};
exports.countArrayDimensions = countArrayDimensions;
//# sourceMappingURL=countArrayDimensions.js.map