<!-- <script setup lang="ts">
// ref() tạo ra "dữ liệu phản ứng" - khi giá trị đổi, giao diện tự cập nhật
const newNote = ref("");
const notes = ref([
  { id: 1, text: "Học vue 3", done: false },
  { id: 2, text: "Học Nuxt", done: false },
  { id: 3, text: "Đọc sách", done: false },
  { id: 4, text: "Nấu ăn", done: false },
  { id: 5, text: "Siêu thị", done: false },
]);
let nextId = 6;

function addNote(text: string) {
  notes.value.push({ id: nextId++, text, done: false });
}

function removeNote(id: number) {
  notes.value = notes.value.filter((n) => n.id !== id);
}

function toggleNote(id: number) {
  const note = notes.value.find((n) => n.id === id);
  if (note) note.done = !note.done;
}

// filter giữ lại những phần tử thỏa điều kiện.
// Ở đây !n.done nghĩa là chỉ giữ ghi chú chưa hoàn thành, nên các mục đã tick sẽ biến mất.
// Cách này giống hàm removeNote ở trên: gán lại cả mảng mới cho notes.value.
function clearDone() {
  notes.value = notes.value.filter((n) => !n.done);
}

// computed: lưu kết quả và chỉ tính lại khi dữ liệu phụ thuộc đổi
const doneCount = computed(() => notes.value.filter((n) => n.done).length);

// Bộ lọc đang chọn: 'all' | 'todo' | 'done'
const filters = [
  { key: "all", label: "Tất cả" },
  { key: "todo", label: "Chưa xong" },
  { key: "done", label: "Đã xong" },
];
const filter = ref("all");

// Danh sách hiển thị, tự tính lại khi `notes` hoặc `filter` đổi
const visibleNotes = computed(() => {
  if (filter.value === "todo") return notes.value.filter((n) => !n.done);
  if (filter.value === "done") return notes.value.filter((n) => n.done);
  return notes.value;
});
</script> -->
<script setup lang="ts">
import type { NoteFilter } from "#shared/types/note";

const {
  notes,
  error,
  filter,
  doneCount,
  visibleNotes,
  addNote,
  removeNote,
  toggleNote,
  clearDone,
} = useNotes();

const filters: { key: NoteFilter; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "todo", label: "Chưa xong" },
  { key: "done", label: "Đã xong" },
];

const percent = computed(() =>
  notes.value.length
    ? Math.round((doneCount.value / notes.value.length) * 100)
    : 0,
);
const allDone = computed(
  () => notes.value.length > 0 && doneCount.value === notes.value.length,
);

useSeoMeta({
  title: "Sổ tay của tôi",
  description: "Ghi chú và việc cần làm, được lưu trên server.",
});
</script>

<template>
  <article class="sheet">
    <header class="head">
      <h1>Sổ tay của tôi</h1>

      <div class="progress">
        <div
          class="bar"
          role="progressbar"
          aria-label="Tiến độ hoàn thành"
          :aria-valuenow="percent"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div class="fill" :style="{ width: percent + '%' }"></div>
        </div>
        <p class="progress-text">
          {{
            allDone ? "Xong hết rồi!" : `${doneCount}/${notes.length} đã xong`
          }}
        </p>
      </div>
    </header>

    <NoteForm @add="addNote" />

    <nav class="tabs" aria-label="Lọc ghi chú">
      <button
        v-for="f in filters"
        :key="f.key"
        class="tab"
        :class="{ active: filter === f.key }"
        :aria-pressed="filter === f.key"
        @click="filter = f.key"
      >
        {{ f.label }}
      </button>
    </nav>

    <p v-if="error" class="empty">
      Không tải được ghi chú. Hãy thử tải lại trang.
    </p>
    <p v-else-if="notes.length === 0" class="empty">
      Sổ còn trống. Viết ghi chú đầu tiên ở ô phía trên.
    </p>
    <p v-else-if="visibleNotes.length === 0" class="empty">
      Không có ghi chú nào ở mục này.
    </p>

    <ul class="list">
      <NoteItem
        v-for="note in visibleNotes"
        :key="note.id"
        :note="note"
        @remove="removeNote"
        @toggle="toggleNote"
      />
    </ul>

    <footer v-if="doneCount > 0" class="foot">
      <button class="btn ghost" @click="clearDone">Xóa các mục đã xong</button>
    </footer>
  </article>
</template>

<style scoped>
.head {
  margin-bottom: 1.5rem;
}

.progress {
  margin-top: 1rem;
}

.bar {
  height: 1.1rem;
  background: var(--surface);
  border: 3px solid var(--line);
  border-radius: 999px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--mint);
  transition: width 0.4s ease;
}

.progress-text {
  margin: 0.5rem 0 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  font-weight: 600;
}

.tabs {
  display: inline-flex;
  max-width: 100%;
  gap: 0.25rem;
  margin: 1.5rem 0 1rem;
  padding: 0.25rem;
  background: var(--surface);
  border: var(--border);
  border-radius: 999px;
}

.tab {
  background: none;
  border: 0;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  color: var(--ink-soft);
  font-weight: 600;
  cursor: pointer;
}

.tab.active {
  background: var(--violet);
  color: var(--on-violet);
}

.empty {
  margin: 0;
  padding: 1.25rem;
  text-align: center;
  color: var(--ink-soft);
  border: 3px dashed var(--line);
  border-radius: 14px;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.foot {
  margin-top: 1.5rem;
}
</style>
