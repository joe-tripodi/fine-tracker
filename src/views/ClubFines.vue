<template>
  <div class="ml-5 mt-5 mr-5 mb-5" v-if="isDataLoaded">
    <div class="columns">
      <div class="column">
        <div class="column is-one-fifth is-pulled-left">
          <span class="control has-icons-left ">
            <input id="search" class="input is-rounded" placeholder="Search..." v-model="reasonSearchText">
            <span class="icon is-small is-left">
              <fa icon="fas fa-search"></fa>
            </span>
          </span>
        </div> 
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Reason</th>
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
    </div>
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