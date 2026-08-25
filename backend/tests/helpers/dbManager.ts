// test/helpers/dbManager.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import {
  setTestDatabase,
  disconnectPrisma,
} from '../../src/lib/prisma';

const execPromise = promisify(exec);

let currentDbName: string = '';

const getWorkerId = () => {
  const workerId = process.env.VITEST_WORKER_ID || 
                   process.env.VITEST_POOL_ID || 
                   Date.now().toString();
  return workerId.replace(/[^a-zA-Z0-9_]/g, '_');
};

const getDatabaseName = () => {
  const workerId = getWorkerId();
  return `test_db_${workerId}`;
};

const getDatabaseUrl = (dbName: string) => {
  const user = process.env.POSTGRES_USER;
  if (!user) {
    throw new Error('DB_USER is not defined');
  }
  const password = process.env.POSTGRES_PASSWORD;
  if (!password) {
  throw new Error('DB_PASSWORD is not defined');
}
  const host = process.env.POSTGRES_HOST || 'localhost';
  const port = process.env.POSTGRES_PORT || '5432';
  
  return `postgresql://${user}:${password}@${host}:${port}/${dbName}`;
};

// Helper to execute SQL commands via psql
async function executePsqlCommand(sql: string, database: string = 'postgres') {
  const user = process.env.POSTGRES_USER;
  if (!user) {
    throw new Error('DB_USER is not defined');
  }
  const password = process.env.POSTGRES_PASSWORD;
  if (!password) {
    throw new Error('DB_PASSWORD is not defined');
  }
  const host = process.env.POSTGRES_HOST || 'localhost';
  const port = process.env.POSTGRES_PORT || '5432';
  
  // On Windows, we need to use the full path or ensure psql is in PATH
  const psqlCmd = process.env.PSQL_PATH || 'psql';
  
  const command = `"${psqlCmd}" -U ${user} -h ${host} -p ${port} -d ${database} -c "${sql}"`;
  
  // Set PGPASSWORD environment variable for authentication
  const env = {
    ...process.env,
    PGPASSWORD: password,
  };
  
  try {
    const { stdout, stderr } = await execPromise(command, { env });
    if (stderr && !stderr.includes('NOTICE')) {
      console.warn('psql warning:', stderr);
    }
    return stdout;
  } catch (error: any) {
    // Check if it's a "database already exists" error which is fine
    if (error.message?.includes('already exists')) {
      return;
    }
    throw error;
  }
}

export async function setupTestDatabase() {
  const dbName = getDatabaseName();
  currentDbName = dbName;

  const dbUrl = getDatabaseUrl(dbName);

  console.log(
    `[Worker ${getWorkerId()}] Creating database: ${dbName}`,
  );

  try {
    await executePsqlCommand(
      `DROP DATABASE IF EXISTS "${dbName}"`,
    );

    await executePsqlCommand(
      `CREATE DATABASE "${dbName}"`,
    );

    process.env.DATABASE_URL = dbUrl;

    await setTestDatabase(dbUrl);

    await execPromise(`npx prisma migrate deploy`, {
      env: {
        ...process.env,
        DATABASE_URL: dbUrl,
      },
    });

    console.log(
      `[Worker ${getWorkerId()}] Database ${dbName} configured successfully`,
    );

    return { dbName, dbUrl };
  } catch (error) {
    console.error(
      `[Worker ${getWorkerId()}] Error setting up database:`,
      error,
    );

    throw error;
  }
}

export async function teardownTestDatabase() {
  await disconnectPrisma();

  if (currentDbName) {
    console.log(
      `[Worker ${getWorkerId()}] Dropping database: ${currentDbName}`,
    );

    try {
      await executePsqlCommand(
        `DROP DATABASE IF EXISTS "${currentDbName}"`,
      );

      console.log(
        `[Worker ${getWorkerId()}] Database ${currentDbName} dropped successfully`,
      );
    } catch (error) {
      console.error(
        `[Worker ${getWorkerId()}] Error dropping database:`,
        error,
      );
    }

    currentDbName = '';
  }
}
