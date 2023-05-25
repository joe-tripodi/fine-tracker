<template>
  <div>
    <div>
      <StatCard
        v-for="(player, index) in sortedPlayerFineStatistics"
        :key="index"
        :rank="index+1"
        :player="player"
      />
    </div>
  </div>
</template>


<script setup>
import StatCard from "../components/StatCard.vue";
import { computed, inject, onMounted, ref } from "vue";

const database = inject("database");
const allPaidFines = ref([])
const playerFineStatistics = ref({})

onMounted(async () => {
  await database.getAllPaidFines().then((res) => {
    allPaidFines.value = res;
  });
  allPaidFines.value.forEach(fine => {
    if(playerFineStatistics.value[fine.playerId]) {
      playerFineStatistics.value[fine.playerId].numberOfFines += 1
      playerFineStatistics.value[fine.playerId].totalValue += fine.amount
    } else {
      playerFineStatistics.value[fine.playerId] = {
        numberOfFines: 1,
        totalValue: fine.amount,
        name: fine.playerName,
      }
    }
  });
});

// create a computed function that returns the playerFineStatics as an array that is sorted by totalValue desc
const sortedPlayerFineStatistics = computed(() => {
  const sortedPlayerFineStatistics = []
  for (const playerId in playerFineStatistics.value) {
    sortedPlayerFineStatistics.push(playerFineStatistics.value[playerId]);
  }
  sortedPlayerFineStatistics.sort((playerA, playerB) => (playerA.totalValue < playerB.totalValue ? 1 : -1));
  return sortedPlayerFineStatistics;
});

</script>
