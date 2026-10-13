import "dotenv/config";
import { readFile } from "node:fs/promises";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { Note } from "../../shared/types/note";
import { notes, tasks } from "./schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

async function main() {
  const existing = await db.select({ id: notes.id }).from(notes).limit(1);
  if (existing.length > 0) {
    console.log("Bảng notes đã có dữ liệu, bỏ qua để không bị nhân đôi.");
    return;
  }

  const data: Note[] = JSON.parse(await readFile("data/notes.json", "utf-8"));

  // transaction: hoặc tất cả cùng thành công, hoặc không gì được ghi
  await db.transaction(async (tx) => {
    for (const n of data) {
      const [row] = await tx
        .insert(notes)
        .values({ text: n.text, done: n.done, description: n.description })
        .returning({ id: notes.id });
      if (!row) throw new Error("Không tạo được ghi chú");

      if (n.tasks.length > 0) {
        await tx.insert(tasks).values(
          n.tasks.map((t, index) => ({
            noteId: row.id,
            text: t.text,
            done: t.done,
            position: index,
          })),
        );
      }
    }
  });

  console.log(`Đã nhập ${data.length} ghi chú.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
