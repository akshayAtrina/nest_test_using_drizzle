import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useFactory: async (config: ConfigService) => {
        const pool = new Pool({
          user: config.get('DB_USER'),
          host: config.get('DB_HOST'),
          database: config.get('DB_NAME'),
          password: config.get('DB_PASS'),
          port: Number(config.get('DB_PORT')),
        });
        return drizzle(pool, { schema, logger: true });
      },
      inject: [ConfigService], // Inject ConfigService here
    },
  ],
  exports: ['DRIZZLE'],
})
export class DrizzleModule {}
