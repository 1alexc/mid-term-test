import { pool } from "./index.js";

/**
 * @param {{ week: string; subject: string; title: string; resource: string }[]} data
 */
export async function resetAllTables(data) {
  // If you're unsure about DROP TABLE, see: https://www.postgresql.org/docs/current/sql-droptable.html
  // If you're unsure about NOT NULL, see: https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6
  await pool.query(`
    DROP TABLE IF EXISTS resource_library;
    CREATE TABLE resource_library (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      week VARCHAR(200) NOT NULL,
      subject VARCHAR(200) NOT NULL,
      title VARCHAR(200) NOT NULL,
      resource VARCHAR(200) NOT NULL

    );
  `);

  const inserted = await pool.query(
    `INSERT INTO resource_library (
      week,
      subject,
      title,
      resource
    ) (
      SELECT week, subject, title, resource
      FROM json_populate_recordset(NULL::resource_library, $1::JSON)
    )
    RETURNING *;`,
    [JSON.stringify(data)]
  );

  return inserted.rows;
}