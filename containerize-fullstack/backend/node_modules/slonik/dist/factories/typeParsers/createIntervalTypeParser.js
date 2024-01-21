"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntervalTypeParser = void 0;
const iso8601_duration_1 = require("iso8601-duration");
const postgres_interval_1 = __importDefault(require("postgres-interval"));
const intervalParser = (value) => {
    return value === null ? value : (0, iso8601_duration_1.toSeconds)((0, iso8601_duration_1.parse)((0, postgres_interval_1.default)(value).toISOString()));
};
const createIntervalTypeParser = () => {
    return {
        name: 'interval',
        parse: intervalParser,
    };
};
exports.createIntervalTypeParser = createIntervalTypeParser;
//# sourceMappingURL=createIntervalTypeParser.js.map