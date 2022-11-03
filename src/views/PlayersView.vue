<template>
  <div class="ml-5 mr-5 mb-5" v-if="isDataLoaded">
    <div class="columns">
      <div class="column">
        <div class="column is-one-fifth is-pulled-left">
          <span class="control has-icons-left ">
            <input id="search" class="input is-rounded" placeholder="Search..." v-model="playerSearchText">
            <span class="icon is-small is-left">
              <fa icon="fas fa-search"></fa>
            </span>
          </span>
        </div> 
        <table class="table is-striped is-fullwidth">
          <tbody>
            <tr v-for="player, index in searchedPlayers" :key="index">
              <PlayerTd :player="player"></PlayerTd>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed } from 'vue';

import PlayerTd from '../components/PlayerTd.vue';

const database = inject('database');
const allPlayers = ref([]);
const isDataLoaded = ref(false);
const playerSearchText = ref('');

const searchedPlayers = computed(() => {
  const filteredPlayers = allPlayers.value.filter((player) => player.firstName.toLowerCase().includes(playerSearchText.value.toLowerCase()));
  return filteredPlayers;
})

onMounted(async () => {
  allPlayers.value = await database.getAllPlayers();
  isDataLoaded.value = true;
})

</script>
