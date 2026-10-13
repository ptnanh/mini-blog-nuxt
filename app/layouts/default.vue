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
.topbar,
.content {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.topbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.content {
  padding-bottom: 4rem;
}

/* logo như một miếng dán hơi nghiêng */
.brand {
  background: var(--yellow);
  color: var(--on-color);
  border: var(--border);
  border-radius: 12px;
  padding: 0.2rem 0.8rem;
  font-size: 1.2rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 3px 3px 0 var(--line);
  transform: rotate(-2deg);
}

.nav {
  display: flex;
  gap: 0.5rem;
}

.nav a {
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  border: 3px solid transparent;
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
}

.nav a:hover {
  border-color: var(--line);
}

.nav a.router-link-exact-active {
  background: var(--pink);
  color: var(--on-color);
  border-color: var(--line);
}
</style>
