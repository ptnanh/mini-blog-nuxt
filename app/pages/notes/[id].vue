<script setup lang="ts">
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
  if (!note.value) return;
  if (description.value !== note.value.description) {
    updateNote(note.value.id, { description: description.value });
  }
}

function submitTask() {
  if (!note.value) return;
  const text = newTask.value.trim();
  if (!text) return;
  addTask(note.value.id, text);
  newTask.value = "";
}

async function remove() {
  if (!note.value) return;
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
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
  font-size: 1.15rem;
}

.count {
  background: var(--yellow);
  color: var(--on-color);
  border: 2px solid var(--line);
  border-radius: 999px;
  padding: 0 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.muted {
  color: var(--ink-soft);
}

.area {
  width: 100%;
  background: var(--surface);
  border: var(--border);
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  resize: vertical;
}

.tasks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.task {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: var(--surface);
  border: 2.5px solid var(--line);
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  transition: background-color 0.2s;
}

.task:has(.check:checked) {
  background: var(--mint);
  color: var(--on-color);
}

.task-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.task-text.done {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.add-task {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.add-task .input {
  flex: 1;
  min-width: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 2rem;
}
</style>
