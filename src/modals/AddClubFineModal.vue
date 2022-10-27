<template>
  <div class="modal" :class="{'is-active': isActive}">
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
          <input class="input" v-model="reasonEntered" type="text" placeholder="Enter a fine reason..">
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <fa icon="fas fa-dollar"></fa>
          </span>
          <input class="input" v-model="amountEntered" type="number" placeholder="Enter an amount.." >
        </div>
      </div>

    </section>
    <footer class="modal-card-foot">
      <div class="field is-grouped">
        <div class="control">
          <button @click="closeModal" class="button">Cancel</button>
        </div>
        <div class="control">
          <button @click="addClubFine()" class="button  is-success">Add</button>
        </div>
      </div>
    </footer>
  </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
const database = inject('database');


const amountEntered = ref();
const reasonEntered = ref('');

const emit = defineEmits({
  closeAddClubFineModal: null,
})

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  }
})

function cleanTheForm(){
  amountEntered.value = null;
  reasonEntered.value = '';
}

function closeModal(){
  cleanTheForm();
  emit('closeAddClubFineModal');
}

async function addClubFine(){
  await database.addClubFine(reasonEntered.value, amountEntered.value);
  cleanTheForm();
  emit('closeAddClubFineModal');
}

</script>