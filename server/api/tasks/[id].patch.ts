import { eq } from "drizzle-orm";
import { tasks } from "../../database/schema";
import { useDb } from "../../utils/db";
import { parseId } from "../../utils/noteRepo";

export default defineEventHandler(async (event) => {
  const id = parseId(getRouterParam(event, "id"));
  const body = (await readBody<Record<string, unknown> | null>(event)) ?? {};
  const { text, done } = body;

  const patch: Partial<typeof tasks.$inferInsert> = {};
  if (typeof text === "string" && text.trim()) patch.text = text.trim();
  if (typeof done === "boolean") patch.done = done;

  if (Object.keys(patch).length === 0) {
    throw createError({ statusCode: 400, message: "Không có gì để cập nhật" });
  }

  const [row] = await useDb()
    .update(tasks)
    .set(patch)
    .where(eq(tasks.id, id))
    .returning();

  if (!row) {
    throw createError({ statusCode: 404, message: "Không tìm thấy mục" });
  }
  return { id: row.id, text: row.text, done: row.done };
});
