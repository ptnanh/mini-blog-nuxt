<script setup lang="ts">
import type { Note } from "#shared/types/note";
// defineProps khai báo dữ liệu nhận từ cha. trong template dùng trực tiếp (note.text)
const props = defineProps<{ note: Note }>();
// defineEmits: khai báo sự kiện gửi lên cha. Cha lắng nghe bằng @add, @remove, @toggle
const emit = defineEmits<{
  remove: [id: number];
  toggle: [id: number];
}>();

// số mục con đã xong, tự tính lại khi tick
const doneTasks = computed(() => props.note.tasks.filter((t) => t.done).length);
</script>
<template>
  <li class="item">
    <input
      type="checkbox"
      class="check"
      :checked="note.done"
      :aria-label="`Đánh dấu xong: ${note.text}`"
      @change="emit('toggle', note.id)"
    />
    <div class="text">
      <NuxtLink
        :to="`/notes/${note.id}`"
        class="label"
        :class="{ done: note.done }"
      >
        {{ note.text }}
      </NuxtLink>
    </div>
    <span v-if="note.tasks.length" class="count">
      {{ doneTasks }}/{{ note.tasks.length }}
    </span>
    <button class="remove" @click="emit('remove', note.id)">Xóa</button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: var(--surface);
  border: 3px solid var(--line);
  border-radius: 14px;
  padding: 0.7rem 0.9rem;
  box-shadow: 3px 3px 0 var(--line);
  transition: background-color 0.2s;
}

/* mục đã xong: nền xanh bạc hà */
.item:has(.check:checked) {
  background: var(--mint);
  color: var(--on-color);
}

.text {
  flex: 1;
  min-width: 0;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.label {
  color: inherit;
  text-decoration: none;
}

.label:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

.label.done {
  text-decoration: line-through;
  text-decoration-thickness: 3px;
}

.count {
  background: var(--yellow);
  color: var(--on-color);
  border: 2px solid var(--line);
  border-radius: 999px;
  padding: 0 0.55rem;
  font-size: 0.8rem;
  font-weight: 700;
}
</style>
