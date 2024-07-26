import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Global() // Make this module globally available
@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useFactory: () => {
        const pool = new Pool({
          // connectionString:
          //   'postgresql://admin:pass@123@localhost:5432/test_db',
          connectionString:
            'postgres://admin:pass@123@postgres-db:5432/test_db',
        });
        return drizzle(pool, { schema, logger: true });
      },
    },
  ],
  exports: ['DRIZZLE'],
})
export class DrizzleModule {}
