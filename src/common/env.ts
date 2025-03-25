import { config } from "dotenv";
import { cleanEnv, port, str, url, bool } from "envalid";

config();

export const env = cleanEnv(process.env, {
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_HOST: str(),
  POSTGRES_PORT: port({ default: 5432 }),
  POSTGRES_DB: str(),
  POSTGRES_SSL: str({ default: "false" }),
  PORT: port({ default: 5000 }),
  JWT_SECRET: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  FRONTEND_URL: url(),
});
