"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIntegrityConstraintViolationError = exports.UniqueIntegrityConstraintViolationError = exports.ForeignKeyIntegrityConstraintViolationError = exports.NotNullIntegrityConstraintViolationError = exports.IntegrityConstraintViolationError = exports.SchemaValidationError = exports.DataIntegrityError = exports.NotFoundError = exports.TupleMovedToAnotherPartitionError = exports.BackendTerminatedError = exports.StatementTimeoutError = exports.StatementCancelledError = exports.ConnectionError = exports.UnexpectedStateError = exports.InvalidInputError = exports.InvalidConfigurationError = exports.WrappedPGError = exports.SlonikError = void 0;
const es6_error_1 = __importDefault(require("es6-error"));
class SlonikError extends es6_error_1.default {
}
exports.SlonikError = SlonikError;
class WrappedPGError extends SlonikError {
    constructor(originalError, message) {
        super(`${message} ${originalError.message}`);
        this.originalError = originalError;
    }
}
exports.WrappedPGError = WrappedPGError;
class InvalidConfigurationError extends SlonikError {
}
exports.InvalidConfigurationError = InvalidConfigurationError;
class InvalidInputError extends SlonikError {
}
exports.InvalidInputError = InvalidInputError;
class UnexpectedStateError extends SlonikError {
}
exports.UnexpectedStateError = UnexpectedStateError;
class ConnectionError extends SlonikError {
}
exports.ConnectionError = ConnectionError;
class StatementCancelledError extends WrappedPGError {
    constructor(error, message = 'Statement has been cancelled.') {
        super(error, message);
    }
}
exports.StatementCancelledError = StatementCancelledError;
class StatementTimeoutError extends StatementCancelledError {
    constructor(error) {
        super(error, 'Statement has been cancelled due to a statement_timeout.');
    }
}
exports.StatementTimeoutError = StatementTimeoutError;
class BackendTerminatedError extends WrappedPGError {
    constructor(error) {
        super(error, 'Backend has been terminated.');
    }
}
exports.BackendTerminatedError = BackendTerminatedError;
class TupleMovedToAnotherPartitionError extends WrappedPGError {
    constructor(error, message = 'Tuple moved to another partition due to concurrent update.') {
        super(error, message);
    }
}
exports.TupleMovedToAnotherPartitionError = TupleMovedToAnotherPartitionError;
class NotFoundError extends SlonikError {
    constructor(query) {
        super('Resource not found.');
        this.sql = query.sql;
        this.values = query.values;
    }
}
exports.NotFoundError = NotFoundError;
class DataIntegrityError extends SlonikError {
    constructor(query) {
        super('Query returns an unexpected result.');
        this.sql = query.sql;
        this.values = query.values;
    }
}
exports.DataIntegrityError = DataIntegrityError;
class SchemaValidationError extends SlonikError {
    constructor(query, row, issues) {
        super('Query returned rows that do not conform with the schema.');
        this.sql = query.sql;
        this.values = query.values;
        this.row = row;
        this.issues = issues;
    }
}
exports.SchemaValidationError = SchemaValidationError;
class IntegrityConstraintViolationError extends WrappedPGError {
    constructor(error, constraint, message = 'Query violates an integrity constraint.') {
        super(error, message);
        this.constraint = constraint;
    }
}
exports.IntegrityConstraintViolationError = IntegrityConstraintViolationError;
// @todo When does restrict_violation and exclusion_violation happen?
// @see https://www.postgresql.org/docs/9.4/static/errcodes-appendix.html
class NotNullIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error, constraint) {
        super(error, constraint, 'Query violates a not NULL integrity constraint.');
    }
}
exports.NotNullIntegrityConstraintViolationError = NotNullIntegrityConstraintViolationError;
class ForeignKeyIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error, constraint) {
        super(error, constraint, 'Query violates a foreign key integrity constraint.');
    }
}
exports.ForeignKeyIntegrityConstraintViolationError = ForeignKeyIntegrityConstraintViolationError;
class UniqueIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error, constraint) {
        super(error, constraint, 'Query violates a unique integrity constraint.');
    }
}
exports.UniqueIntegrityConstraintViolationError = UniqueIntegrityConstraintViolationError;
class CheckIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error, constraint) {
        super(error, constraint, 'Query violates a check integrity constraint.');
    }
}
exports.CheckIntegrityConstraintViolationError = CheckIntegrityConstraintViolationError;
//# sourceMappingURL=errors.js.map