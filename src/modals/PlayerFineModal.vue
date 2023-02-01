<template>
  <v-dialog @click:outside="close" v-model="showModal">
    <v-card>
      <v-card-title>Fine a player</v-card-title>
      <v-card-text class="text-body-2 font-italic" wrap
        >You can select a club fine to pre-fill the Reason and $
        fields</v-card-text
      >
      <v-card-text>
        <v-select
          v-model="selectedFine"
          variant="solo"
          label="A list of club fines"
          item-title="reason"
          item-value="reason"
          :items="clubFines"
          :menu-props="{location: 'top'}"
          return-object
        >
        </v-select>
        <v-text-field
          v-model="fineReason"
          required
          variant="solo"
          label="Reason"
        ></v-text-field>
        <v-text-field
          v-model="fineAmount"
          required
          variant="solo"
          label="$"
        ></v-text-field>
        <v-select
          v-model="selectedPlayers"
          item-title="fullName"
          item-value="id"
          :items="players"
          color="red"
          required
          variant="solo"
          rounded
          density="compact"
          :menu-props="{location: 'top'}"
          multiple
          label="Player(s)"
          chips
          clearable
          return-object
        >
        </v-select>
        <v-card-actions>
          <v-btn
            @click.prevent="finePlayers"
            depressed
            rounded
            variant="flat"
            color="primary"
          >
            SUBMIT
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { inject, onMounted } from "vue";
import { watch } from "vue";

const database = inject("database");

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  closeFineAPlayerModal: null,
});

const showModal = ref(props.isActive);

const players = ref([]);
const clubFines = ref([]);
const selectedPlayers = ref([]);
const selectedFine = ref("");
const fineReason = ref("");
const fineAmount = ref("");

onMounted(async () => {
  players.value = await database.getAllPlayersNameAndIds();
  players.value.forEach((player) => {
    player.fullName = `${player.firstName} ${player.lastName}`;
  });
  clubFines.value = await database.getAllClubFines();
});

watch(
  () => props.isActive,
  async (newValue) => {
    showModal.value = newValue;
  }
);

watch(selectedFine, async (newValue) => {
  if (newValue != null) {
    fineReason.value = newValue.reason;
    fineAmount.value = newValue.amount;
  }
});

function finePlayers() {
  if (!isFormValid()) return;
  let playerFines = [];
  selectedPlayers.value.forEach((player) => {
    let playerFine = {
      reason: fineReason.value,
      amount: fineAmount.value,
      doubleFactor: 0,
      dateCreated: new Date(),
      credited: false,
      paid: false,
      playerId: player.id,
      playerName: `${player.firstName} ${player.lastName}`,
      void: false,
    };
    playerFines.push(playerFine);
  });
  database.addPlayerFines(playerFines);
  clearForm();
  emit("closeFineAPlayerModal", true);
}

function isFormValid() {
  let validForm = true;
  if (fineReason.value.length == 0) {
    validForm = false;
  }
  if (selectedPlayers.value.length == 0) {
    validForm = false;
  }
  if (isNaN(+fineAmount.value) || +fineAmount.value <= 0) {
    validForm = false;
  }
  return validForm;
}

function clearForm() {
  selectedFine.value = "";
  fineAmount.value = "";
  fineReason.value = "";
  selectedPlayers.value = [];
}

function close() {
  clearForm();
  emit("closeFineAPlayerModal");
}
</script>
