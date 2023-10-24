import pg from "pg";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if (undefined === databaseUrl) {
  throw new Error(
    "This project requires a database url. Did you forget to create a .env file at the root of the project? Please create one and ensure it contains a DATABASE_URL variable."
  );
}

export const pool = new pg.Pool({
  connectionString: databaseUrl,
});