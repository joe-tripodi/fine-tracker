<template>
  <td>{{props.player.firstName}} {{props.player.lastName}}</td>
</template>

<script setup>
const props = defineProps({
  player: {}
})
</script>
