import { Provider } from "@nestjs/common";
import { Pool } from "pg";
import { env } from "src/common/env";

// export const poolProvider: Provider[] = [
//   {
//     provide: 'DATABASE_POOL',
//     useFactory: () => {
//       return new Pool({
//         host: env.AZURE_POSTGRESQL_HOST,
//         user: env.AZURE_POSTGRESQL_USER,
//         password: env.AZURE_POSTGRESQL_PASSWORD,
//         database: env.AZURE_POSTGRESQL_DATABASE,
//         port: env.AZURE_POSTGRESQL_PORT,
//         idleTimeoutMillis: 30000,
//       });
//     },
//   },
// ];


export const poolProvider: Provider[] = [
  {
    provide: 'DATABASE_POOL',
    useFactory: () => {
      return new Pool({
        host: env.POSTGRES_HOST,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_DB,
        port: env.POSTGRES_PORT,
        idleTimeoutMillis: 30000,
      });
    },
  },
];
