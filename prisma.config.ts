import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  // prisma schema path
  schema: 'src/prisma/schema.prisma',

  // migration toml path
  migrations: {
    path: 'src/database/migrations',
  },

  // database connection url
  datasource: {
    url: env('DATABASE_URL'),
  },
})
