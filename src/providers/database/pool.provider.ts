import { Provider } from "@nestjs/common";
import { Pool } from "pg";
import { env } from "src/common/env";

export const poolProvider: Provider[] = [
  {
    provide: 'DATABASE_POOL',
    useFactory: () => {
      return new Pool({
        host: env.AZURE_POSTGRESQL_HOST,
        user: env.AZURE_POSTGRESQL_USER,
        password: env.AZURE_POSTGRESQL_PASSWORD,
        database: env.AZURE_POSTGRESQL_DATABASE,
        port: env.AZURE_POSTGRESQL_PORT,
        idleTimeoutMillis: 30000,
      });
    },
  },
];
