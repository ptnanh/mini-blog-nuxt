import { notes } from "../../database/schema";
import { useDb } from "../../utils/db";
import { toNote } from "../../utils/noteRepo";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ text?: unknown } | null>(event);
  const text = typeof body?.text === "string" ? body.text.trim() : "";

  if (!text) {
    throw createError({ statusCode: 400, message: "Thiếu nội dung ghi chú" });
  }

  const [row] = await useDb().insert(notes).values({ text }).returning();
  if (!row) {
    throw createError({ statusCode: 500, message: "Không tạo được ghi chú" });
  }

  setResponseStatus(event, 201);
  return toNote(row, []);
});
