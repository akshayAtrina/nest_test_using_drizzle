import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function getDrizzleConfig() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);
  const databaseUrl = configService.get<string>('DB_URL');

  return defineConfig({
    schema: './drizzle/database_module/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
      url: databaseUrl,
    },
    verbose: true,
    strict: true,
  });
}

export default getDrizzleConfig();
