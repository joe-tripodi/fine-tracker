<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div @click="closeModal" class="modal-background"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Club Fine</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">
        <div class="field">
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <fa icon="fas fa-gavel"></fa>
            </span>
            <input
              id="reasonForFine"
              v-model="reasonForFine"
              class="input"
              type="text"
              placeholder="Enter a fine reason.."
            />
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <fa icon="fas fa-dollar"></fa>
            </span>
            <input
              @keyup.enter="addClubFine"
              id="fineAmount"
              v-model="fineAmount"
              class="input"
              type="number"
              placeholder="Enter an amount.."
            />
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <div class="field is-grouped">
          <div class="control">
            <button @click="closeModal" class="button cancel">Cancel</button>
          </div>
          <div class="control">
            <button @click="addClubFine" class="button is-success add">
              Add
            </button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  closeAddClubFineModal: null,
});

const database = inject("database");
const fineAmount = ref();
const reasonForFine = ref("");

function cleanTheForm() {
  fineAmount.value = null;
  reasonForFine.value = "";
}

function closeModal() {
  cleanTheForm();
  emit("closeAddClubFineModal", false);
}

async function addClubFine() {
  let fineDoesNotExist = !(await database.clubFineExists(reasonForFine.value));
  if (isValidForm() && fineDoesNotExist) {
    await database.addClubFine(reasonForFine.value, +fineAmount.value);
    cleanTheForm();
    emit("closeAddClubFineModal", true);
  }
}

function isValidForm() {
  let validForm = true;
  if (reasonForFine.value.length == 0) {
    validForm = false;
  }
  if (isNaN(+fineAmount.value) || +fineAmount.value <= 0) {
    validForm = false;
  }
  return validForm;
}
</script>
