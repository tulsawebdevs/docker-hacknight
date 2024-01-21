"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeObject = void 0;
const sanitizeObject = (object) => {
    return JSON.parse(JSON.stringify(object));
};
exports.sanitizeObject = sanitizeObject;
//# sourceMappingURL=sanitizeObject.js.map