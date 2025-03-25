import { Provider } from "@nestjs/common";
import { Pool } from "pg";
import { env } from "src/common/env";

export const poolProvider: Provider[] = [
  {
    provide: 'DATABASE_POOL',
    useFactory: () => {
      return new Pool({
        host: env.POSTGRES_HOST,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_PASSWORD,
        port: env.POSTGRES_PORT,
        idleTimeoutMillis: 30000,
      });
    },
  },
];
