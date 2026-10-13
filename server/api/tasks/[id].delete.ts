import { eq } from "drizzle-orm";
import { tasks } from "../../database/schema";
import { useDb } from "../../utils/db";
import { parseId } from "../../utils/noteRepo";

export default defineEventHandler(async (event) => {
  const id = parseId(getRouterParam(event, "id"));

  const deleted = await useDb()
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning({ id: tasks.id });

  if (deleted.length === 0) {
    throw createError({ statusCode: 404, message: "Không tìm thấy mục" });
  }
  return { ok: true };
});
