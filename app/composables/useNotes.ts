export function useNotes() {
  // useFetch: tải danh sách khi trang hiển thị (cả trên server lẫn trình duyệt)
  const {
    data: notes,
    error,
    refresh,
  } = useFetch("/api/notes", {
    key: "notes", // cùng khóa thì mọi nơi dùng chung một dữ liệu
    default: () => [],
  });

  // bộ lọc chỉ là trạng thái giao diện nên vẫn để trong useState
  const filter = useState("notes-filter", () => "all");

  // id trên URL luôn là chuỗi ("1"), còn id trong dữ liệu là số
  function getNote(id) {
    return notes.value.find((n) => n.id === Number(id));
  }

  // --- các hành động: gửi lên server rồi tải lại danh sách ---
  async function addNote(text) {
    await $fetch("/api/notes", { method: "POST", body: { text } });
    await refresh();
  }

  async function updateNote(id, patch) {
    await $fetch(`/api/notes/${id}`, { method: "PATCH", body: patch });
    await refresh();
  }

  async function removeNote(id) {
    await $fetch(`/api/notes/${id}`, { method: "DELETE" });
    await refresh();
  }

  function toggleNote(id) {
    const note = getNote(id);
    if (note) return updateNote(id, { done: !note.done });
  }

  async function clearDone() {
    const doneIds = notes.value.filter((n) => n.done).map((n) => n.id);
    // xóa lần lượt từng cái, không xóa song song (giải thích ở phần dưới)
    for (const id of doneIds) {
      await $fetch(`/api/notes/${id}`, { method: "DELETE" });
    }
    await refresh();
  }

  // --- mục con: tạo mảng tasks mới rồi gửi cả mảng lên ---
  async function addTask(noteId: number, text: string): Promise<void> {
    await $fetch(`/api/notes/${noteId}/tasks`, {
      method: "POST",
      body: { text },
    });
    await refresh();
  }

  async function toggleTask(noteId: number, taskId: number): Promise<void> {
    const task = getNote(noteId)?.tasks.find((t) => t.id === taskId);
    if (!task) return;
    await $fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      body: { done: !task.done },
    });
    await refresh();
  }

  async function removeTask(_noteId: number, taskId: number): Promise<void> {
    await $fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
    await refresh();
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
    addNote,
    updateNote,
    removeNote,
    toggleNote,
    clearDone,
    addTask,
    toggleTask,
    removeTask,
  };
}
