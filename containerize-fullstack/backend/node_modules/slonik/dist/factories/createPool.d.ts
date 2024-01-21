import { type ClientConfigurationInput, type DatabasePool } from '../types';
/**
 * @param connectionUri PostgreSQL [Connection URI](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).
 */
export declare const createPool: (connectionUri: string, clientConfigurationInput?: ClientConfigurationInput) => Promise<DatabasePool>;
//# sourceMappingURL=createPool.d.ts.map