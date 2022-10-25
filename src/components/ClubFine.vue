<template>
  <td>{{props.fine.reason}}</td>
  <td>${{props.fine.amount}}</td>
</template>

<script setup>
const props = defineProps({
  fine: {}
})
</script>