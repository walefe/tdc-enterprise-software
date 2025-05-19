import { config } from 'dotenv';
import fs from 'node:fs';

const testEnvFile = `.env.test`;
const envFile = `.env`;

if (!fs.existsSync(envFile)) throw new Error('.env file not found');

if (!fs.existsSync(testEnvFile)) throw new Error('.env.test file not found');

config({ path: envFile });
config({ path: testEnvFile, override: true });
