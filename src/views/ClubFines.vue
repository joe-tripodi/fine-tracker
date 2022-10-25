<template>
  <div class="ml-5 mt-5" v-if="isDataLoaded">
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Reason <input id="search" placeholder="...Search" v-model="reasonSearchText"> </th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fine, index in searchedFines" :key="index">
          <ClubFine :fine="fine"></ClubFine>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed } from 'vue';
import ClubFine from '../components/ClubFine.vue';

const database = inject('database');
const allClubFines = ref([]);
const isDataLoaded = ref(false);
const reasonSearchText = ref('');

const searchedFines = computed(() => {
  const filteredFines = allClubFines.value.filter((fine) => fine.reason.toLowerCase().includes(reasonSearchText.value.toLowerCase()));
  return filteredFines;
})

onMounted(async () => {
  allClubFines.value = await database.getAllClubFines();
  isDataLoaded.value = true;
})

</script>
