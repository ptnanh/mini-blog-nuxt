<template>
  <div class="shell">
    <header class="topbar">
      <NuxtLink to="/" class="brand">Sổ tay</NuxtLink>

      <nav class="nav" aria-label="Điều hướng chính">
        <NuxtLink to="/">Ghi chú</NuxtLink>
        <NuxtLink to="/about">Giới thiệu</NuxtLink>
      </nav>
    </header>

    <main class="content">
      <slot />
    </main>
  </div>
</template>
<style scoped>
.shell {
  min-height: 100vh;
}

.topbar,
.content {
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.25rem;
}

.content {
  padding-bottom: 3rem;
}

.brand {
  font-family: "Bricolage Grotesque", "Public Sans", sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 1.25rem;
}

.nav a {
  color: var(--ink-soft);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  padding: 0.25rem 0;
}

.nav a.router-link-exact-active {
  color: var(--ink);
  border-bottom-color: var(--ink);
}
</style>
