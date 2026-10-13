<script setup lang="js">
// defineProps khai báo dữ liệu nhận từ cha. trong template dùng trực tiếp (note.text)
const props = defineProps({
  note: { type: Object, required: true },
});

// defineEmits: khai báo sự kiện gửi lên cha. Cha lắng nghe bằng @add, @remove, @toggle
const emit = defineEmits(["remove", "toggle"]);

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
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--rule);
}

.check {
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
  accent-color: var(--ink);
  cursor: pointer;
}

.text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

/* bút dạ quang: vệt vàng quét từ trái sang phải khi tick */
.label {
  padding: 0.25em 0.5em;
  margin: 0 -0.25em;
  border-radius: 10px;

  background-image: linear-gradient(var(--highlight), var(--highlight));
  background-repeat: no-repeat;
  background-position: 0 50%;
  background-size: 0% 75%;

  transition: background-size 0.25s ease;

  /* nếu ghi chú dài xuống nhiều dòng, mỗi dòng đều có vệt riêng */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  text-decoration: none;
  color: inherit;
  line-height: 1.2;
}

.label:hover {
  text-decoration: underline;
}

.label.done {
  background-size: 100% 75%;
  color: var(--on-highlight);
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

@media (prefers-reduced-motion: reduce) {
  .label {
    transition: none;
  }
}

.count {
  color: var(--ink-soft);
  font-size: 0.85rem;
}
</style>
