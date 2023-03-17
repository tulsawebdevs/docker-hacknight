"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockPool = void 0;
const Logger_1 = require("../Logger");
const bindPool_1 = require("../binders/bindPool");
const state_1 = require("../state");
const utilities_1 = require("../utilities");
const createClientConfiguration_1 = require("./createClientConfiguration");
const createMockPool = (overrides, clientConfigurationInput) => {
    const clientConfiguration = (0, createClientConfiguration_1.createClientConfiguration)(clientConfigurationInput);
    const poolId = (0, utilities_1.createUid)();
    const poolLog = Logger_1.Logger.child({
        poolId,
    });
    const pool = {
        connect: () => {
            const connection = {
                off: () => { },
                on: () => { },
                query: overrides.query,
                release: () => { },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            };
            return connection;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    state_1.poolStateMap.set(pool, {
        ended: false,
        mock: true,
        poolId,
        typeOverrides: null,
    });
    return (0, bindPool_1.bindPool)(poolLog, pool, clientConfiguration);
};
exports.createMockPool = createMockPool;
//# sourceMappingURL=createMockPool.js.map