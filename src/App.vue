<template>
  <div class="navbar is-white has-shadow" role="navigation" aria-label="main-navigation">
    <div class="navbar-menu is-active">
      <div class="navbar-start">
        <RouterLink class="navbar-item has-text-black" to="/">Home</RouterLink>
        <RouterLink class="navbar-item has-text-black" to="/clubfines">Club Fines</RouterLink>
        <RouterLink class="navbar-item has-text-black" to="/playerfines">Fines</RouterLink>
        <RouterLink class="navbar-item has-text-black" to="/statistics">Statistics</RouterLink>
      </div>
    </div>
  </div>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style>
@import 'bulma/css/bulma.css';
.navbar-item:hover{
  background-color: white !important;
  text-decoration: underline;
}
</style>
