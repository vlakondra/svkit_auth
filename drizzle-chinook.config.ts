import { defineConfig } from 'drizzle-kit';


if (!process.env.CHINOOK_URL) {
  throw new Error('CHINOOK_URL environment variable is not set');
}

const config = defineConfig({
  schema: './src/lib/server/chinook/chi_schema.ts',
  dbCredentials: { url: process.env.CHINOOK_URL },
  verbose: true,
  strict: true,
  dialect: 'sqlite',
});

export default config;