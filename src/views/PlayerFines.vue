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
  </v-container>
</template>
  
<script setup>
import { inject, onMounted, ref, computed } from 'vue';
import FineCard from '../components/FineCard.vue';

const database = inject('database');
const allFines = ref([]);
const isDataLoaded = ref(false);

const allUnpaidFines = computed(() => {
  return allFines.value.filter((fine) => fine.paid == false).sort((fineA, fineB) => fineA.playerId - fineB.playerId);
})

onMounted(async () => {
  allFines.value = await database.getAllFines();
  isDataLoaded.value = true;
})
</script>
  