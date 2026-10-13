import type { Task } from "#shared/types/note";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const body = (await readBody<Record<string, unknown> | null>(event)) ?? {};

  const notes = await readNotes();
  const note = notes.find((n) => n.id === id);
  if (!note) {
    throw createError({ statusCode: 404, message: "Không tìm thấy ghi chú" });
  }

  // dữ liệu từ client là `unknown`: phải kiểm tra kiểu rồi mới dùng
  const { text, done, description, tasks } = body;

  if (typeof text === "string" && text.trim()) note.text = text.trim();
  if (typeof done === "boolean") note.done = done;
  if (typeof description === "string") note.description = description;
  if (Array.isArray(tasks)) {
    note.tasks = tasks.map((t: Partial<Task>) => ({
      id: Number(t.id),
      text: String(t.text),
      done: Boolean(t.done),
    }));
  }

  await writeNotes(notes);
  return note;
});
