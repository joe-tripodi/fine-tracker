<template>
  <div
    class="navbar is-white has-shadow"
    role="navigation"
    aria-label="main-navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" @click="navigateToHomeAndCloseBurgerMenu()">
        <v-icon size="large" icon="mdi-home"></v-icon>
      </a>
      <a
        role="button"
        @click="toggleIsActive()"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        :class="active ? 'is-active' : ''"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="active ? 'is-active' : ''">
      <div class="navbar-start">
        <RouterLink
          @click="closeBurgerMenu()"
          class="navbar-item has-text-black"
          to="/home"
          >Home</RouterLink
        >
        <RouterLink
          @click="closeBurgerMenu()"
          class="navbar-item has-text-black"
          to="/clubfines"
          >Club Fines</RouterLink
        >
        <RouterLink
          @click="closeBurgerMenu()"
          class="navbar-item has-text-black"
          to="/playerfines"
          >Player Fines</RouterLink
        >
        <RouterLink
          @click="closeBurgerMenu()"
          class="navbar-item has-text-black"
          to="/players"
          >Players</RouterLink
        >
        <RouterLink
          @click="closeBurgerMenu()"
          class="navbar-item has-text-black"
          to="/statistics"
          >Statistics</RouterLink
        >
        <RouterLink
          @click="closeBurgerMenu()"
          class="navbar-item has-text-black"
          to="/login"
          >Admin login</RouterLink
        >
      </div>
    </div>
  </div>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

const router = useRouter();
const active = ref(false);

function toggleIsActive() {
  active.value = !active.value;
}

function closeBurgerMenu() {
  active.value = false;
}

function navigateToHomeAndCloseBurgerMenu(){
  active.value = false;
  router.push("/home")
}

</script>

<style>
@import "bulma/css/bulma.css";
@import "bulma-floating-button/dist/css/bulma-floating-button.min.css";

.navbar-item:hover {
  background-color: white !important;
  text-decoration: underline;
}
</style>
