<template>
  <div role="button" class="stat-wrapper">
    <p class="player-rank">{{ rank }}</p>
    <div class="player-details">
      <div class="player-name">{{ player.name }}</div>
      <div class="number-of-fines">Number of fines: {{ player.numberOfFines }}</div>
    </div>
    <p class="total-value">${{ player.totalValue }}</p>
  </div>
  
</template>

<script setup>
const props = defineProps({
  player: {},
  rank: 0,
});

</script>

<style scoped>
.stat-wrapper {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 30px;
  box-shadow: 3px 3px 0 black;
  background-color: #f3d840;
  font-family: Circular, Roboto, Helvetica, Arial, sans-serif;
}
.player-rank {
  color: white;
  font-weight: bold;
  padding: 0px 5px;  
  border: 1px solid black;
  border-radius: 25%;
  background-color: #017d5e;
  box-shadow: 3px 3px 0 black;
}

.player-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
}

.player-name {
  font-weight: bolder;
  font-size: 20px;
  padding: 0px;
  margin: 0px;
}

.number-of-fines {
  font-size: 14px;
  padding: 0px;
  margin: 0px;
}

.total-value {
  font-weight: bolder;
  text-align: center;
  color: white;
  font-size: 18px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 25%;
  background-color: #0d60a8;
  box-shadow: 3px 3px 0 black;
}
</style>