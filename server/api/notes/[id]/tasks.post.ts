import { eq, max } from "drizzle-orm";
import { notes, tasks } from "../../../database/schema";
import { useDb } from "../../../utils/db";
import { parseId } from "../../../utils/noteRepo";

export default defineEventHandler(async (event) => {
  const noteId = parseId(getRouterParam(event, "id"));
  const body = await readBody<{ text?: unknown } | null>(event);
  const text = typeof body?.text === "string" ? body.text.trim() : "";

  if (!text) {
    throw createError({ statusCode: 400, message: "Thiếu nội dung" });
  }

  const db = useDb();

  const [note] = await db
    .select({ id: notes.id })
    .from(notes)
    .where(eq(notes.id, noteId));
  if (!note) {
    throw createError({ statusCode: 404, message: "Không tìm thấy ghi chú" });
  }

  // đặt mục mới xuống cuối danh sách
  const [last] = await db
    .select({ value: max(tasks.position) })
    .from(tasks)
    .where(eq(tasks.noteId, noteId));
  const position = (last?.value ?? -1) + 1;

  const [row] = await db
    .insert(tasks)
    .values({ noteId, text, position })
    .returning();
  if (!row) {
    throw createError({ statusCode: 500, message: "Không tạo được mục" });
  }

  setResponseStatus(event, 201);
  return { id: row.id, text: row.text, done: row.done };
});
