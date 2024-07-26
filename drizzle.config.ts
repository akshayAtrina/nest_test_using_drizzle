import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./drizzle/database_module/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://admin:pass@123@localhost:5434/test_db",
  },
  verbose: true,
  strict: true,
})
