<template>
  <v-card color="#fafafa" theme="light">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-subtitle class="font-weight-black text-body-1 text-wrap">{{
          fine.reason
        }}</v-card-subtitle>
        <v-card-subtitle>{{ fine.playerName }}</v-card-subtitle>
        <v-card-subtitle>{{ fineDate }}</v-card-subtitle>
      </div>
      <v-card-actions>
        <v-avatar :color="fineColor">${{ fine.amount }}</v-avatar>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  fine: {},
});

const fineDate = computed(() => {
  return new Date(props.fine.fineDate).toDateString();
});

const fineColor = computed(() => {
  if (props.fine.paid) return "success";
  let dateDifference = Math.abs(
    new Date().getDate() -
      new Date(props.fine.fineDate).getDate()
  );
  if (dateDifference > 7) return "red";
  return "blue";
});
</script>
