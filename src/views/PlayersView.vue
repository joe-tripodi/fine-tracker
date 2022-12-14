<template>
  <v-container>
    <v-row dense>
      <v-col
        cols="6"
        v-for="(player, index) in allPlayersSortedByFirstName"
        :key="index"
      >
        <PlayerCard :player="player"></PlayerCard>
      </v-col>
    </v-row>

    <a
      v-if="isLoggedIn"
      @click="showAddPlayerModal"
      class="button is-floating is-dark is-small"
      id="floating-add"
    >
      <fa icon="fas fa-add"></fa>
    </a>
    <AddPlayerModal
      @closeAddPlayerModal="closeAddPlayerModal"
      :isActive="isActive"
    ></AddPlayerModal>
  </v-container>
</template>

<script setup>
import { inject, onMounted, ref, computed } from "vue";
import { useAuthentication } from "../composables/authentication";
import AddPlayerModal from "../modals/AddPlayerModal.vue";
import PlayerCard from "../components/PlayerCard.vue";

const database = inject("database");
const allPlayers = ref([]);
const isDataLoaded = ref(false);
const isActive = ref(false);
const isLoggedIn = useAuthentication().isLoggedIn;

const allPlayersSortedByFirstName = computed(() => {
  return allPlayers.value.sort((playerA, playerB) =>
    playerA.firstName > playerB.firstName ? 1 : -1
  );
});

async function closeAddPlayerModal(playerCreated) {
  if (playerCreated) {
    allPlayers.value = await database.getAllPlayers();
  }
  isActive.value = false;
}

function showAddPlayerModal() {
  isActive.value = true;
}

onMounted(async () => {
  allPlayers.value = await database.getAllPlayers();
  isDataLoaded.value = true;
});
</script>
