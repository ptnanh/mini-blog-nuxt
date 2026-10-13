<script setup>
const route = useRoute();
const {
  getNote,
  updateNote,
  toggleNote,
  removeNote,
  addTask,
  toggleTask,
  removeTask,
} = useNotes();

// route.params.id lấy từ URL: /notes/2 thì id là "2"
const note = computed(() => getNote(route.params.id));
const newTask = ref("");

// bản nháp mô tả: gõ vào đây trước, rời ô mới lưu lên server
const description = ref("");
watch(
  () => note.value?.description,
  (value) => {
    description.value = value ?? "";
  },
  { immediate: true },
);

const doneTasks = computed(() =>
  note.value ? note.value.tasks.filter((t) => t.done).length : 0,
);

useSeoMeta({
  title: () => (note.value ? note.value.text : "Không tìm thấy ghi chú"),
  description: () => note.value?.description || "Chi tiết ghi chú",
  ogTitle: () => (note.value ? note.value.text : "Không tìm thấy ghi chú"),
  ogDescription: () => note.value?.description || "Chi tiết ghi chú",
});

function saveDescription() {
  if (description.value !== note.value.description) {
    updateNote(note.value.id, { description: description.value });
  }
}

function submitTask() {
  const text = newTask.value.trim();
  if (!text) return;
  addTask(note.value.id, text);
  newTask.value = "";
}

async function remove() {
  await removeNote(note.value.id);
  await navigateTo("/");
}
</script>
<template>
  <article class="sheet">
    <template v-if="note">
      <h1>{{ note.text }}</h1>
      <p>{{ note.done ? "Đã xong" : "Chưa xong" }}</p>

      <section class="block">
        <h2>Mô tả</h2>
        <textarea
          v-model="description"
          class="area"
          rows="3"
          placeholder="Viết thêm về mục này..."
          aria-label="Mô tả"
          @blur="saveDescription"
        ></textarea>
      </section>

      <section class="block">
        <h2>
          Các việc cần làm
          <span v-if="note.tasks.length" class="count">
            {{ doneTasks }}/{{ note.tasks.length }}
          </span>
        </h2>

        <p v-if="note.tasks.length === 0" class="muted">
          Chưa có mục nào. Thêm việc cần làm ở ô bên dưới.
        </p>

        <ul class="tasks">
          <li v-for="task in note.tasks" :key="task.id" class="task">
            <input
              type="checkbox"
              class="check"
              :checked="task.done"
              :aria-label="`Đánh dấu xong: ${task.text}`"
              @change="toggleTask(note.id, task.id)"
            />
            <span class="task-text" :class="{ done: task.done }">
              {{ task.text }}
            </span>
            <button class="remove" @click="removeTask(note.id, task.id)">
              Xóa
            </button>
          </li>
        </ul>

        <div class="add-task">
          <input
            v-model="newTask"
            class="input"
            placeholder="Thêm việc cần làm"
            aria-label="Nội dung mới"
            @keyup.enter="submitTask"
          />
          <button class="btn" @click="submitTask">Thêm</button>
        </div>
      </section>

      <div class="actions">
        <button class="btn" @click="toggleNote(note.id)">
          {{ note.done ? "Bỏ đánh dấu xong" : "Đánh dấu xong" }}
        </button>
        <button class="btn ghost" @click="remove">Xóa ghi chú</button>
      </div>
    </template>

    <template v-else>
      <h1>Không tìm thấy ghi chú</h1>
      <p>Ghi chú này không tồn tại hoặc đã bị xóa.</p>
    </template>

    <p><NuxtLink to="/">Quay lại danh sách</NuxtLink></p>
  </article>
</template>

<style scoped>
.block {
  margin-top: 1.75rem;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.count {
  margin-left: 0.4rem;
  color: var(--ink-soft);
  font-size: 0.85rem;
  font-weight: 400;
}

.muted {
  color: var(--ink-soft);
}

.area {
  width: 100%;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  resize: vertical;
}

.tasks {
  list-style: none;
  margin: 0;
  padding: 0;
}

.task {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--rule);
}

.check {
  width: 1.15rem;
  height: 1.15rem;
  margin: 0;
  accent-color: var(--ink);
  cursor: pointer;
}

.task-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.task-text.done {
  color: var(--ink-soft);
  text-decoration: line-through;
}

.remove {
  background: none;
  border: 0;
  padding: 0.25rem 0.5rem;
  color: var(--ink-soft);
  cursor: pointer;
}

.remove:hover {
  color: var(--ink);
}

.add-task {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  border-bottom: 2px solid var(--ink);
  padding: 0.6rem 0;
}

.input::placeholder {
  color: var(--ink-soft);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.btn {
  background: var(--ink);
  color: var(--on-ink);
  border: 0;
  border-radius: 6px;
  padding: 0.6rem 1.1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background: var(--ink-hover);
}

.btn.ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--rule);
}

.btn.ghost:hover {
  background: transparent;
  border-color: var(--ink);
}
</style>
