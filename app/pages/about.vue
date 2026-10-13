<script setup lang="ts">
// Đặt tiêu đề tab trình duyệt riêng cho trang này
useHead({ title: "Giới thiệu" });
</script>
<template>
  <article class="sheet">
    <h1>Giới thiệu</h1>
    <p>
      Sổ tay là dự án demo mình dùng để học Vue 3 và Nuxt: từ ref và component
      đến routing, gọi API và state dùng chung.
    </p>
    <p>
      <NuxtLink to="/">Quay lại danh sách ghi chú</NuxtLink>
    </p>
  </article>
</template>
