"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyDsn = void 0;
const querystring_1 = require("querystring");
const stringifyDsn = (connectionOptions) => {
    const { applicationName, databaseName, host, password, port, sslMode, username, } = connectionOptions;
    const tokens = [
        'postgresql://',
    ];
    if (username) {
        tokens.push(encodeURIComponent(username));
        if (password) {
            tokens.push(':', encodeURIComponent(password));
        }
        tokens.push('@');
    }
    tokens.push(host !== null && host !== void 0 ? host : '');
    if (port) {
        tokens.push(':', String(port));
    }
    if (databaseName) {
        tokens.push('/', encodeURIComponent(databaseName));
    }
    const namedParameters = {};
    if (applicationName) {
        // eslint-disable-next-line canonical/id-match
        namedParameters.application_name = applicationName;
    }
    if (sslMode) {
        namedParameters.sslmode = sslMode;
    }
    if (Object.keys(namedParameters).length > 0) {
        tokens.push('?', (0, querystring_1.stringify)(namedParameters));
    }
    return tokens.join('');
};
exports.stringifyDsn = stringifyDsn;
//# sourceMappingURL=stringifyDsn.js.map