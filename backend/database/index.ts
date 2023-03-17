import {
	createPool, sql
} from 'slonik';

export const dbPool = await createPool('postgresql://postgres:password@localhost:5432/database');
