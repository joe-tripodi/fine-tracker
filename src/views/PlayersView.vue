<template>
  <div class="ml-5 mr-5 mb-5" v-if="isDataLoaded">
    <div class="columns">
      <div class="column">
        <table class="table is-striped is-fullwidth">
          <tbody>
            <tr v-for="player, index in searchedPlayers" :key="index">
              <PlayerTd :player="player"></PlayerTd>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <a @click="showAddPlayerModal" class="button is-floating is-dark is-small" id="floating-add">
       <fa icon="fas fa-add"></fa>
    </a>

    <AddPlayerModal @closeAddPlayerModal="closeAddPlayerModal" :isActive="isActive" ></AddPlayerModal>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed } from 'vue';
import PlayerService from '../services/player.js';

import PlayerTd from '../components/PlayerTd.vue';
import AddPlayerModal from '../modals/AddPlayerModal.vue';

const database = inject('database');
const allPlayers = ref([]);
const isDataLoaded = ref(false);
const playerSearchText = ref('');
const isActive = ref(false);

const searchedPlayers = computed(() => {
  const filteredPlayers = allPlayers.value.filter((player) => PlayerService.playerDataContainsText(player, playerSearchText.value.toLowerCase()));
  return filteredPlayers.sort((playerA, playerB) => playerA.firstName > playerB.firstName ? 1 : -1);
})

async function closeAddPlayerModal(playerCreated){
  if(playerCreated){
    allPlayers.value = await database.getAllPlayers();
  }
  isActive.value = false;
}

function showAddPlayerModal(){
  isActive.value = true;
}

onMounted(async () => {
  allPlayers.value = await database.getAllPlayers();
  isDataLoaded.value = true;
})

</script>
