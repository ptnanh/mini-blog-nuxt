<script setup lang="ts">
import type { NuxtError } from "#app";
const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error.statusCode === 404);

function goHome() {
  // clearError xóa trạng thái lỗi rồi chuyển về trang chủ
  clearError({ redirect: "/" });
}
</script>

<template>
  <main class="err">
    <article class="sheet">
      <h1>{{ isNotFound ? "Không tìm thấy trang" : "Có lỗi xảy ra" }}</h1>
      <p>
        {{
          isNotFound
            ? "Đường dẫn này không tồn tại hoặc đã bị xóa."
            : "Máy chủ gặp sự cố. Hãy thử tải lại trang."
        }}
      </p>
      <p><button class="btn" @click="goHome">Về trang chủ</button></p>
    </article>
  </main>
</template>

<style scoped>
.err {
  max-width: 36rem;
  margin: 3rem auto;
  padding: 0 1rem;
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
</style>
