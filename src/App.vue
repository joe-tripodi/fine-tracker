<template>
  <div class="nav">
    <RouterLink class="routerLink" to="/">Home</RouterLink>
    <RouterLink class="routerLink" to="/club-fines">Club Fines</RouterLink>
    <RouterLink class="routerLink" to="/fines">Fines</RouterLink>
    <RouterLink class="routerLink" to="/statistics">Statistics</RouterLink>
  </div>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid rgba(60, 60, 60, 0.12);
}

.nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 2rem;
}

.nav a.router-link-exact-active {
  color: #2c3e50;
}

.nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
