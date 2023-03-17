"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedTransaction = void 0;
const serialize_error_1 = require("serialize-error");
const binders_1 = require("../binders");
const constants_1 = require("../constants");
const state_1 = require("../state");
const utilities_1 = require("../utilities");
const execNestedTransaction = async (parentLog, connection, clientConfiguration, handler, newTransactionDepth) => {
    const poolClientState = (0, state_1.getPoolClientState)(connection);
    if (poolClientState.mock === false) {
        await connection.query('SAVEPOINT slonik_savepoint_' + String(newTransactionDepth));
    }
    try {
        const result = await handler((0, binders_1.bindTransactionConnection)(parentLog, connection, clientConfiguration, newTransactionDepth));
        return result;
    }
    catch (error) {
        if (poolClientState.mock === false) {
            await connection.query('ROLLBACK TO SAVEPOINT slonik_savepoint_' + String(newTransactionDepth));
        }
        parentLog.error({
            error: (0, serialize_error_1.serializeError)(error),
        }, 'rolling back transaction due to an error');
        throw error;
    }
};
const retryNestedTransaction = async (parentLog, connection, clientConfiguration, handler, transactionDepth, transactionRetryLimit) => {
    const poolClientState = (0, state_1.getPoolClientState)(connection);
    let remainingRetries = transactionRetryLimit !== null && transactionRetryLimit !== void 0 ? transactionRetryLimit : clientConfiguration.transactionRetryLimit;
    let attempt = 0;
    let result;
    while (remainingRetries-- > 0) {
        attempt++;
        try {
            parentLog.trace({
                attempt,
                parentTransactionId: poolClientState.transactionId,
            }, 'retrying nested transaction');
            result = await execNestedTransaction(parentLog, connection, clientConfiguration, handler, transactionDepth);
            // If the attempt succeeded break out of the loop
            break;
        }
        catch (error) {
            if (typeof error.code === 'string' && error.code.startsWith(constants_1.TRANSACTION_ROLLBACK_ERROR_PREFIX) && remainingRetries > 0) {
                continue;
            }
            throw error;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result;
};
const nestedTransaction = async (parentLog, connection, clientConfiguration, handler, transactionDepth, transactionRetryLimit) => {
    const poolClientState = (0, state_1.getPoolClientState)(connection);
    const newTransactionDepth = transactionDepth + 1;
    const log = parentLog.child({
        transactionId: (0, utilities_1.createUid)(),
    });
    try {
        poolClientState.transactionDepth = newTransactionDepth;
        return await execNestedTransaction(log, connection, clientConfiguration, handler, newTransactionDepth);
    }
    catch (error) {
        const transactionRetryLimitToUse = transactionRetryLimit !== null && transactionRetryLimit !== void 0 ? transactionRetryLimit : clientConfiguration.transactionRetryLimit;
        const shouldRetry = typeof error.code === 'string' && error.code.startsWith(constants_1.TRANSACTION_ROLLBACK_ERROR_PREFIX) && transactionRetryLimitToUse > 0;
        if (shouldRetry) {
            return await retryNestedTransaction(parentLog, connection, clientConfiguration, handler, newTransactionDepth, transactionRetryLimit);
        }
        else {
            throw error;
        }
    }
    finally {
        poolClientState.transactionDepth = newTransactionDepth - 1;
    }
};
exports.nestedTransaction = nestedTransaction;
//# sourceMappingURL=nestedTransaction.js.map