"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientConfiguration = void 0;
const errors_1 = require("../errors");
const createTypeParserPreset_1 = require("./createTypeParserPreset");
const createClientConfiguration = (clientUserConfigurationInput) => {
    const typeParsers = [];
    const configuration = {
        captureStackTrace: false,
        connectionRetryLimit: 3,
        connectionTimeout: 5000,
        idleInTransactionSessionTimeout: 60000,
        idleTimeout: 5000,
        interceptors: [],
        maximumPoolSize: 10,
        queryRetryLimit: 5,
        statementTimeout: 60000,
        transactionRetryLimit: 5,
        typeParsers,
        ...clientUserConfigurationInput,
    };
    if (configuration.maximumPoolSize < 1) {
        throw new errors_1.InvalidConfigurationError('maximumPoolSize must be equal to or greater than 1.');
    }
    if (!configuration.typeParsers || configuration.typeParsers === typeParsers) {
        configuration.typeParsers = (0, createTypeParserPreset_1.createTypeParserPreset)();
    }
    return configuration;
};
exports.createClientConfiguration = createClientConfiguration;
//# sourceMappingURL=createClientConfiguration.js.map