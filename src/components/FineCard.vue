<template>
  <v-card color="#fafafa" theme="light">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-subtitle class="font-weight-black text-body-1">{{fine.reason}}</v-card-subtitle>
        <v-card-subtitle>{{fine.playerName}}</v-card-subtitle>
        <v-card-subtitle>{{fineDate}}</v-card-subtitle>
      </div>
      <v-card-actions>
        <v-avatar :color="fineColor" >${{fine.amount}}</v-avatar>
      </v-card-actions>
      
    </div>
  </v-card>
  </template>
  
<script setup>
import { computed } from 'vue';

const props = defineProps({
  fine: {}
})

const fineDate = computed(() => {
  return new Date(props.fine.dateCreated.seconds*1000).toDateString();
})

const fineColor = computed(() => {
  let dateDifference = Math.abs(new Date().getDate() - new Date(props.fine.dateCreated.seconds*1000).getDate());
  if(dateDifference > 7) return "red"
  return "blue"
})

</script>
