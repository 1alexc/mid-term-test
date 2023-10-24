import { pool } from "../index.js";
import { resetAllTables } from "../helpers.js";

try {
  const insertedRows = await resetAllTables([
    { week: "Week 1", subject: "Mindset", title: "Computational Thinking", resource: "https://www.youtube.com/watch?v=qbnTZCj0ugI" },
    { week: "Week 1", subject: "Mindset", title: "Agile Methodology", resource: "https://www.youtube.com/watch?v=ZZ_vnqvW4DQ" },
    { week: "Week 2", subject: "HTML", title: "Tags", resource: "https://www.youtube.com/watch?v=tv6bxtCjqDI" }
  ]);
  console.log("Reset all tables and inserted data");
  console.log(insertedRows);
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}