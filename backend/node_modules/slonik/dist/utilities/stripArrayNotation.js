"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripArrayNotation = void 0;
const stripArrayNotation = (identifierName) => {
    let tail = identifierName.trim();
    while (tail.endsWith('[]')) {
        tail = tail.trim().slice(0, -2);
    }
    return tail;
};
exports.stripArrayNotation = stripArrayNotation;
//# sourceMappingURL=stripArrayNotation.js.map