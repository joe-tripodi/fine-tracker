<template>
  <div id="container">
    <div class="playerBox" v-for="(player, index) in finesByPlayer" :key="index">
      <div @click="playerClicked(player)" class="nameAndFine">
        <div>{{ player[0].playerName }}</div>
        <div>${{ totalOwed(player) }}</div>
      </div>
      <div>
        <ul class="fineList" v-if="!player.hidden">
          <li class="fineItem" v-for="(fine, fineIndex) in player" :key="fineIndex">
            <div>
              {{ fine.reason }}
            </div>
            <div>${{ fine.amount }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";

const database = inject("database");
const finesByPlayer = ref([]);

onMounted(() => {
  database.groupUnpaidFinesByPlayer().then((res) => {
    for (let key in res) {
      res[key].hidden = true;
    }
    finesByPlayer.value = res;
  });
});

function playerClicked(player) {
  player.hidden = !player.hidden;
}

function totalOwed(playerFines) {
  let total = 0;
  playerFines.forEach((fine) => {
    total += fine.amount;
  });
  return total;
}
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px;
  border-radius: 20px;
}

.fineList {
  padding: 10px;
  margin-bottom: 5px;
}

.fineItem {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.playerBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: solid black 1px;
  border-radius: 10px;
  box-shadow: 5px 5px;
  margin-bottom: 10px;
}

.nameAndFine {
  display: flex;
  padding: 10px;
  font-weight: bold;
  gap: 10px;
  justify-content: space-between;
}
</style>
