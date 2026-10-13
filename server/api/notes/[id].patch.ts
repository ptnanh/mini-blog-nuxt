import { eq } from "drizzle-orm";
import { notes } from "../../database/schema";
import { useDb } from "../../utils/db";
import { getNoteById, parseId } from "../../utils/noteRepo";

export default defineEventHandler(async (event) => {
  const id = parseId(getRouterParam(event, "id"));
  const body = (await readBody<Record<string, unknown> | null>(event)) ?? {};
  const { text, done, description } = body;

  // chỉ nhận những trường hợp lệ
  const patch: Partial<typeof notes.$inferInsert> = {};
  if (typeof text === "string" && text.trim()) patch.text = text.trim();
  if (typeof done === "boolean") patch.done = done;
  if (typeof description === "string") patch.description = description;

  if (Object.keys(patch).length > 0) {
    await useDb().update(notes).set(patch).where(eq(notes.id, id));
  }

  const note = await getNoteById(id);
  if (!note) {
    throw createError({ statusCode: 404, message: "Không tìm thấy ghi chú" });
  }
  return note;
});
