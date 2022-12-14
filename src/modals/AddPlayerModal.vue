<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div @click="closeModal" class="modal-background"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Player</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">
        <div class="field">
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <fa icon="fas fa-pen"></fa>
            </span>
            <input
              id="firstName"
              v-model="firstName"
              class="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <fa icon="fas fa-pen"></fa>
            </span>
            <input
              id="lastName"
              v-model="lastName"
              class="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <fa icon="fas fa-hashtag"></fa>
            </span>
            <input
              @keyup.enter="addPlayer"
              id="shirtNumber"
              v-model="shirtNumber"
              class="input"
              type="number"
              placeholder="Shirt No."
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
            <button @click="addPlayer" class="button is-success add">
              Add
            </button>
          </div>
        </div>
      </footer>
    </div>
  </div>

  <v-snackbar v-model="showSnackbar" :timeout="1500" color="error">
    We could not add the player.
  </v-snackbar>
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
  closeAddPlayerModal: null,
});

const database = inject("database");
const shirtNumber = ref();
const firstName = ref("");
const lastName = ref("");
const showSnackbar = ref(false);
const snackbarText = ref("");

function cleanTheForm() {
  shirtNumber.value = null;
  firstName.value = "";
  lastName.value = "";
}

function closeModal() {
  cleanTheForm();
  emit("closeAddPlayerModal", false);
}

async function addPlayer() {
  let playerDoesNotExist = !(await database.playerExists(shirtNumber.value));
  if (isValidForm() && playerDoesNotExist) {
    await database.addPlayer(
      firstName.value,
      lastName.value,
      +shirtNumber.value
    );
    cleanTheForm();
    emit("closeAddPlayerModal", true);
  } else {
    showSnackbar.value = true;
  }
}

function isValidForm() {
  let validForm = true;
  if (firstName.value.length == 0) {
    validForm = false;
  }
  if (lastName.value.length == 0) {
    validForm = false;
  }
  if (isNaN(+shirtNumber.value) || +shirtNumber.value <= 0) {
    validForm = false;
  }
  return validForm;
}
</script>
