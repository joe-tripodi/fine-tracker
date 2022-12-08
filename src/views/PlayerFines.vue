<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" v-for="fine, index in allUnpaidFines" :key="index">
        <FineCard :fine="fine"></FineCard>
      </v-col>
    </v-row>
    <a @click="showFineAPlayerModal" class="button is-floating is-dark is-small" id="floating-add">
      <fa icon="fas fa-add"></fa>
    </a>
    <PlayerFineModal @closeFineAPlayerModal="closeFineAPlayerModal" :isActive="playerFineModalIsActive"></PlayerFineModal>
  </v-container>
</template>
  
<script setup>
import { inject, onMounted, ref, computed } from "vue";
import FineCard from "../components/FineCard.vue";
import PlayerFineModal from "../modals/PlayerFineModal.vue";

const database = inject("database");
const allFines = ref([]);
const isDataLoaded = ref(false);
const playerFineModalIsActive = ref(false);

onMounted(async () => {
  allFines.value = await database.getAllFines();
  isDataLoaded.value = true;
})

const allUnpaidFines = computed(() => {
  return allFines.value.filter((fine) => fine.paid == false).sort((fineA, fineB) => {
    if(fineA.playerName < fineB.playerName) return -1;
    if(fineA.playerName > fineB.playerName) return 1;
    return 0;
  });
})

async function closeFineAPlayerModal(fetchNewFines){
  playerFineModalIsActive.value = false;
  if(fetchNewFines){
    allFines.value = await database.getAllFines();
  }
}

function showFineAPlayerModal(){
  playerFineModalIsActive.value = true;
}

</script>
  