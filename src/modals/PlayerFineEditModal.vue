<template>
  <v-dialog @click:outside="close" v-model="showModal">
    <v-card>
      <v-card-title>Fine</v-card-title>
      <v-card-text>
        <v-text-field
          readonly
          label="Player"
          :model-value="playerName"
        ></v-text-field>
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
          prefix="$"
        >
          <template v-slot:append-inner>
            <v-icon
              class="pr-5"
              @click="doubleFine"
              icon="mdi-arrow-up"
            ></v-icon>
            <v-icon @click="halveFine" icon="mdi-arrow-down"></v-icon>
          </template>
        </v-text-field>
        <v-card-actions>
          <div class="mx-auto">
            <v-btn
              @click.prevent="saveFine"
              variant="flat"
              color="success"
            >
              save
            </v-btn>
            <v-btn
              @click.prevent="finePaid"
              variant="flat"
              color="primary"
            >
              paid
            </v-btn>
            <v-btn
              @click.prevent="voidFine"
              variant="flat"
              color="error"
            >
              void
            </v-btn>
          </div>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-snackbar color="error" v-model="invalidFine" timeout="2000">
      Enter a valid fine reason and amount.
    </v-snackbar>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { watch, inject } from "vue";

const database = inject("database");

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  fine: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits({
  closeEditPlayerFineModal: null,
});

const showModal = ref(props.isActive);
const playerName = ref("");
const fineReason = ref("");
const fineAmount = ref("");
const invalidFine = ref(false);
const playerFine = ref({});

watch(
  () => props.isActive,
  async (newValue) => {
    showModal.value = newValue;
  }
);

watch(
  () => props.fine,
  async (fine) => {
    fineReason.value = fine.reason;
    fineAmount.value = fine.amount;
    playerName.value = fine.playerName;
    playerFine.value = fine;
  }
);

function isFormValid() {
  if (fineReason.value.length == 0) {
    invalidFine.value = true;
    return false;
  }
  if (isNaN(+fineAmount.value) || +fineAmount.value <= 0) {
    invalidFine.value = true;
    return false;
  }
  return true;
}

async function voidFine() {
  await database.voidFine(playerFine.value.id);
  emit("closeEditPlayerFineModal", true);
}

function doubleFine() {
  fineAmount.value = fineAmount.value * 2;
}

function halveFine() {
  fineAmount.value = fineAmount.value / 2;
}

async function saveFine() {
  if (!isFormValid()) return;
  let saveFine = {
    reason: fineReason.value,
    amount: fineAmount.value,
    id: playerFine.value.id,
  };
  await database.saveFine(saveFine);
  emit("closeEditPlayerFineModal", true);
}

async function finePaid() {
  if (!isFormValid()) return;
  await database.finePaid(playerFine.value.id);
  emit("closeEditPlayerFineModal", true);
}

function close() {
  emit("closeEditPlayerFineModal", false);
}
</script>
