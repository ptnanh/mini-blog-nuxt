import { asc, eq } from "drizzle-orm";
import { createError } from "h3";
import type { Note, Task } from "#shared/types/note";
import { notes, tasks } from "../database/schema";
import { useDb } from "./db";

// Kiểm tra id lấy từ URL: phải là số nguyên dương
export function parseId(raw: string | undefined): number {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, message: "id không hợp lệ" });
  }
  return id;
}

type NoteRow = typeof notes.$inferSelect;
type TaskRow = typeof tasks.$inferSelect;

function toTask(t: TaskRow): Task {
  return { id: t.id, text: t.text, done: t.done };
}

export function toNote(n: NoteRow, taskRows: TaskRow[]): Note {
  return {
    id: n.id,
    text: n.text,
    done: n.done,
    description: n.description,
    tasks: taskRows.map(toTask),
  };
}

export async function listNotes(): Promise<Note[]> {
  const db = useDb();
  const noteRows = await db.select().from(notes).orderBy(asc(notes.id));
  const taskRows = await db
    .select()
    .from(tasks)
    .orderBy(asc(tasks.position), asc(tasks.id));

  // gom mục con theo ghi chú: đúng 2 truy vấn thay vì 1 truy vấn cho mỗi ghi chú
  const byNote = new Map<number, TaskRow[]>();
  for (const t of taskRows) {
    const list = byNote.get(t.noteId) ?? [];
    list.push(t);
    byNote.set(t.noteId, list);
  }

  return noteRows.map((n) => toNote(n, byNote.get(n.id) ?? []));
}

export async function getNoteById(id: number): Promise<Note | undefined> {
  const db = useDb();
  const [note] = await db.select().from(notes).where(eq(notes.id, id));
  if (!note) return undefined;

  const taskRows = await db
    .select()
    .from(tasks)
    .where(eq(tasks.noteId, id))
    .orderBy(asc(tasks.position), asc(tasks.id));

  return toNote(note, taskRows);
}
