import { config } from 'dotenv-safe';
import { postgresJsConfig } from './util/config.ts';

// Adds all environment variables inside
// .env file to `process.env`
config();

export default postgresJsConfig;
