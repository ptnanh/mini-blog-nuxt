<script setup lang="ts">
const emit = defineEmits<{ add: [text: string] }>();

const text = ref("");

function submit() {
  if (!text.value.trim()) return;
  emit("add", text.value.trim()); // báo cho cha có ghi chú mới này
  text.value = "";
}
</script>
<template>
  <div class="form">
    <input
      v-model="text"
      class="input"
      placeholder="Viết ghi chú mới"
      aria-label="Ghi chú mới"
      @keyup.enter="submit"
    />
    <button class="add" @click="submit">Thêm</button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
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

.add {
  background: var(--ink);
  color: var(--on-ink);
  border: 0;
  border-radius: 6px;
  padding: 0.6rem 1.1rem;
  font-weight: 600;
  cursor: pointer;
}

.add:hover {
  background: var(--ink-hover);
}
</style>
