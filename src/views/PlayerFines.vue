<template>
  <v-tabs fixed-tabs v-model="tab">
    <v-tab value="due">DUE</v-tab>
    <v-tab value="paid">PAID</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="due">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" v-for="fine, index in allUnpaidFines" :key="index">
            <FineCard @click="showFineDetail(fine)" :fine="fine"></FineCard>
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>
    <v-window-item value="paid">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" v-for="fine, index in allPaidFines" :key="index">
            <FineCard :fine="fine"></FineCard>
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>
    <a v-if="isLoggedIn" @click="showFineAPlayerModal" class="button is-floating is-dark is-small" id="floating-add">
      <fa icon="fas fa-add"></fa>
    </a>
    <PlayerFineEditModal @closeEditPlayerFineModal="closeEditPlayerFineModal" :fine="fineToEdit" :isActive="editPlayerFineModalIsActive"></PlayerFineEditModal>
    <PlayerFineModal @closeFineAPlayerModal="closeFineAPlayerModal" :isActive="addplayerFineModalIsActive"></PlayerFineModal>
  </v-window>
</template>
  
<script setup>
import { inject, onMounted, ref, computed } from "vue";
import { useAuthentication } from "../composables/authentication"
import FineCard from "../components/FineCard.vue";
import PlayerFineModal from "../modals/PlayerFineModal.vue";
import PlayerFineEditModal from "../modals/PlayerFineEditModal.vue"

const database = inject("database");
const allFines = ref([]);
const isDataLoaded = ref(false);
const addplayerFineModalIsActive = ref(false);
const editPlayerFineModalIsActive = ref(false);
const fineToEdit = ref({});
const tab = ref(null);
const isLoggedIn = useAuthentication().isLoggedIn;

onMounted(async () => {
  allFines.value = await database.getAllFines();
  isDataLoaded.value = true;
})

const allUnpaidFines = computed(() => {
  return allFines.value.filter((fine) => fine.paid == false && fine.void == false).sort((fineA, fineB) => {
    if(fineA.dateCreated < fineB.dateCreated) return -1;
    if(fineA.dateCreated > fineB.dateCreated) return 1;
    return 0;
  });
})

const allPaidFines = computed(() => {
  return allFines.value.filter((fine) => fine.paid == true && fine.void == false).sort((fineA, fineB) => {
    if(fineA.dateCreated < fineB.dateCreated) return -1;
    if(fineA.dateCreated > fineB.dateCreated) return 1;
    return 0;
  });
})

async function closeFineAPlayerModal(fetchNewFines){
  addplayerFineModalIsActive.value = false;
  if(fetchNewFines){
    allFines.value = await database.getAllFines();
  }
}

function showFineAPlayerModal(){
  addplayerFineModalIsActive.value = true;
}

function showFineDetail(fine){
  fineToEdit.value = fine;
  editPlayerFineModalIsActive.value = true;
}

async function closeEditPlayerFineModal(fetchNewFines){
  editPlayerFineModalIsActive.value = false;
  if(fetchNewFines){
    allFines.value = await database.getAllFines();
  }
}

</script>
  