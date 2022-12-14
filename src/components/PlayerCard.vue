<template>
  <v-card color="#fafafa" theme="light">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-subtitle-1"
          >{{ player.firstName[0] }}. {{ player.lastName }}</v-card-title
        >
      </div>
      <v-avatar class="" rounded="0">#{{ player.shirtNumber }}</v-avatar>
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  player: {},
});
</script>
