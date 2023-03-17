"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDsn = void 0;
const url_1 = require("url");
const Logger_1 = require("../Logger");
const log = Logger_1.Logger.child({
    namespace: 'parseDsn',
});
const parseDsn = (dsn) => {
    if (dsn.trim() === '') {
        return {};
    }
    const url = new url_1.URL(dsn);
    const connectionOptions = {};
    if (url.host) {
        connectionOptions.host = decodeURIComponent(url.hostname);
    }
    if (url.port) {
        connectionOptions.port = Number(url.port);
    }
    if (url.pathname && url.pathname !== '/') {
        connectionOptions.databaseName = decodeURIComponent(url.pathname.split('/')[1]);
    }
    if (url.username) {
        connectionOptions.username = decodeURIComponent(url.username);
    }
    if (url.password) {
        connectionOptions.password = decodeURIComponent(url.password);
    }
    const { application_name: applicationName, sslmode: sslMode, ...unsupportedOptions } = Object.fromEntries(url.searchParams);
    if (Object.keys(unsupportedOptions).length > 0) {
        log.warn({
            unsupportedOptions,
        }, 'unsupported DSN parameters');
    }
    if (applicationName) {
        connectionOptions.applicationName = applicationName;
    }
    if (sslMode) {
        connectionOptions.sslMode = sslMode;
    }
    return connectionOptions;
};
exports.parseDsn = parseDsn;
//# sourceMappingURL=parseDsn.js.map