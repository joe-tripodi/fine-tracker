<template>
  <div class="ml-5 mt-5">
    <h1 class="title">Club Fines</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Reason</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fine, index in allClubFines" :key="index">
          <ClubFine :fine="fine"></ClubFine>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import ClubFine from '../components/ClubFine.vue';

const database = inject('database');
const allClubFines = ref([]);

onMounted(async () => {
  allClubFines.value = await database.getAllClubFines();
})

</script>
