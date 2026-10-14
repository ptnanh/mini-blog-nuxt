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
      placeholder="Hôm nay cần làm gì?"
      aria-label="Ghi chú mới"
      @keyup.enter="submit"
    />
    <button class="btn" @click="submit">Thêm</button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  gap: 0.75rem;
}

.input {
  flex: 1;
  min-width: 0;
}
</style>
