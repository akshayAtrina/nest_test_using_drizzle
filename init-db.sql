DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test_db') THEN
      CREATE DATABASE test_db;
   END IF;
END
$$;
