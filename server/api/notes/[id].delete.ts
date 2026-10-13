import type { Note, NoteFilter, NotePatch, Task } from "#shared/types/note";

export function useNotes() {
  const {
    data: notes,
    error,
    refresh,
  } = useFetch<Note[]>("/api/notes", {
    key: "notes",
    default: () => [],
  });

  const filter = useState<NoteFilter>("notes-filter", () => "all");

  function getNote(id: number | string): Note | undefined {
    return notes.value.find((n) => n.id === Number(id));
  }

  async function addNote(text: string): Promise<void> {
    await $fetch("/api/notes", { method: "POST", body: { text } });
    await refresh();
  }

  async function updateNote(id: number, patch: NotePatch): Promise<void> {
    await $fetch(`/api/notes/${id}`, { method: "PATCH", body: patch });
    await refresh();
  }

  async function removeNote(id: number): Promise<void> {
    await $fetch(`/api/notes/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function toggleNote(id: number): Promise<void> {
    const note = getNote(id);
    if (note) await updateNote(id, { done: !note.done });
  }

  async function clearDone(): Promise<void> {
    const doneIds = notes.value.filter((n) => n.done).map((n) => n.id);
    for (const id of doneIds) {
      await $fetch(`/api/notes/${id}`, { method: "DELETE" });
    }
    await refresh();
  }

  async function addTask(noteId: number, text: string): Promise<void> {
    const note = getNote(noteId);
    if (!note) return;
    const tasks: Task[] = [
      ...note.tasks,
      { id: Date.now(), text, done: false },
    ];
    await updateNote(noteId, { tasks });
  }

  async function toggleTask(noteId: number, taskId: number): Promise<void> {
    const note = getNote(noteId);
    if (!note) return;
    const tasks = note.tasks.map((t) =>
      t.id === taskId ? { ...t, done: !t.done } : t,
    );
    await updateNote(noteId, { tasks });
  }

  async function removeTask(noteId: number, taskId: number): Promise<void> {
    const note = getNote(noteId);
    if (!note) return;
    const tasks = note.tasks.filter((t) => t.id !== taskId);
    await updateNote(noteId, { tasks });
  }

  const doneCount = computed(() => notes.value.filter((n) => n.done).length);

  const visibleNotes = computed(() => {
    if (filter.value === "todo") return notes.value.filter((n) => !n.done);
    if (filter.value === "done") return notes.value.filter((n) => n.done);
    return notes.value;
  });

  return {
    notes,
    error,
    filter,
    doneCount,
    visibleNotes,
    getNote,
    updateNote,
    addNote,
    removeNote,
    toggleNote,
    clearDone,
    addTask,
    toggleTask,
    removeTask,
  };
}
