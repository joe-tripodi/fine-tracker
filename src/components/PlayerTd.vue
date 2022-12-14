<template>
  <td>
    {{ props.player.firstName }} {{ props.player.lastName }} #{{
      player.shirtNumber
    }}
  </td>
</template>

<script setup>
const props = defineProps({
  player: {},
});
</script>
