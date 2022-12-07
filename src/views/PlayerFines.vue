<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" v-for="fine, index in allUnpaidFines" :key="index">
        <FineCard :fine="fine"></FineCard>
      </v-col>
    </v-row>

    <FineAPlayerModal @closeFineAPlayerModal="closeFineAPlayerModal" :isActive="finePlayerModalIsActive"></FineAPlayerModal>
  </v-container>
  <a @click="showFineAPlayerModal" class="button is-floating is-dark is-small" id="floating-add">
      <fa icon="fas fa-add"></fa>
  </a>
</template>
  
<script setup>
import { inject, onMounted, ref, computed } from 'vue';
import FineCard from '../components/FineCard.vue';
import FineAPlayerModal from '../modals/FineAPlayerModal.vue';

const database = inject('database');
const allFines = ref([]);
const isDataLoaded = ref(false);
const finePlayerModalIsActive = ref(false);

const allUnpaidFines = computed(() => {
  return allFines.value.filter((fine) => fine.paid == false).sort((fineA, fineB) => fineA.playerId - fineB.playerId);
})

function showFineAPlayerModal(){
  finePlayerModalIsActive.value = true;
}

function closeFineAPlayerModal(){
  finePlayerModalIsActive.value = false;
}

onMounted(async () => {
  allFines.value = await database.getAllFines();
  isDataLoaded.value = true;
})
</script>
