import { eq } from "drizzle-orm";
import { notes } from "../../database/schema";
import { useDb } from "../../utils/db";
import { parseId } from "../../utils/noteRepo";

export default defineEventHandler(async (event) => {
  const id = parseId(getRouterParam(event, "id"));

  // cascade trong schema: xóa ghi chú thì các mục con tự bị xóa theo
  const deleted = await useDb()
    .delete(notes)
    .where(eq(notes.id, id))
    .returning({ id: notes.id });

  if (deleted.length === 0) {
    throw createError({ statusCode: 404, message: "Không tìm thấy ghi chú" });
  }
  return { ok: true };
});
