import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './drizzle/database_module/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://admin:pass@123@postgres-db:5432/test_db',
  },
  verbose: true,
  strict: true,
});
