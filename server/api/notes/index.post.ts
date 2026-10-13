import type { Note } from "#shared/types/note";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ text?: unknown } | null>(event);
  const text = typeof body?.text === "string" ? body.text.trim() : "";

  if (!text) {
    throw createError({ statusCode: 400, message: "Thiếu nội dung ghi chú" });
  }

  const notes = await readNotes();
  const id = notes.reduce((max, n) => Math.max(max, n.id), 0) + 1;
  const note: Note = { id, text, done: false, description: "", tasks: [] };

  notes.push(note);
  await writeNotes(notes);

  setResponseStatus(event, 201);
  return note;
});
