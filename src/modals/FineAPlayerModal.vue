<template>
  <v-dialog v-model="isActive" persistent>
    <v-card>
      <v-card-title>Fine a player</v-card-title>
      <v-select
        density="compact"
        label="Select a club fine (or enter a custom fine)">
      </v-select>
      <v-text-field density="compact" required label="Reason"></v-text-field>
      <v-text-field density="compact" required label="$"></v-text-field>
      <v-select
        v-model="players"
        return-object
        multiple
        chips
        clearable
        density="compact"
        :items="allPlayers"
        item-title="fullName"
        item-value="shirtNumber"
        label="Player"></v-select>
        <v-card-actions>
          <v-btn icon
          variant="tonal"
            color="red"
            @click="closeModal"
          >
          <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn icon
          variant="tonal"
            color="green"
            @click="closeModal"
          >
          <v-icon>mdi-floppy</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>

<script setup>
import { inject, onMounted, computed, ref} from "vue";
const database = inject('database');

const emit = defineEmits({
  closeFineAPlayerModal: null,
})

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  }
})

const allPlayers = ref([])
const players = ref([]);

const selectedPlayers = computed(() => {
  console.log(players.value)
  return players.value;
})

onMounted(async () => {
  allPlayers.value = await database.getAllPlayers();
  allPlayers.value.forEach((player) => {
    player.fullName = `${player.firstName} ${player.lastName}`
  })
})

function closeModal(){
  emit("closeFineAPlayerModal", false);
}

</script>