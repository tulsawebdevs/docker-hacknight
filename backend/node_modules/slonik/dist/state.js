"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolClientState = exports.getPoolState = exports.poolClientStateMap = exports.poolStateMap = void 0;
const errors_1 = require("./errors");
exports.poolStateMap = new WeakMap();
exports.poolClientStateMap = new WeakMap();
const getPoolState = (pool) => {
    const poolState = exports.poolStateMap.get(pool);
    if (!poolState) {
        throw new errors_1.UnexpectedStateError('Pool state is unavailable.');
    }
    return poolState;
};
exports.getPoolState = getPoolState;
const getPoolClientState = (poolClient) => {
    const poolClientState = exports.poolClientStateMap.get(poolClient);
    if (!poolClientState) {
        throw new errors_1.UnexpectedStateError('Pool Client state is unavailable.');
    }
    return poolClientState;
};
exports.getPoolClientState = getPoolClientState;
//# sourceMappingURL=state.js.map