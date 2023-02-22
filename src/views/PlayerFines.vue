<template>
  <v-tabs grow v-model="tab">
    <v-tab value="due">DUE</v-tab>
    <v-tab value="paid">PAID</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="due">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" v-for="(fine, index) in allUnpaidFines" :key="index">
            <FineCard @click="showFineDetail(fine)" :fine="fine"></FineCard>
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>
    <v-window-item value="paid">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" v-for="(fine, index) in allPaidFines" :key="index">
            <FineCard :fine="fine"></FineCard>
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>
  </v-window>
  <a
    v-if="isLoggedIn"
    @click="showFineAPlayerModal"
    class="button is-floating is-dark is-small"
    id="floating-add"
  >
    <fa icon="fas fa-add"></fa>
  </a>
  <PlayerFineEditModal
    @closeEditPlayerFineModal="closeEditPlayerFineModal"
    :fine="fineToEdit"
    :isActive="editPlayerFineModalIsActive"
  ></PlayerFineEditModal>
  <PlayerFineModal
    @closeFineAPlayerModal="closeFineAPlayerModal"
    :isActive="addplayerFineModalIsActive"
  ></PlayerFineModal>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useAuthentication } from "../composables/authentication";
import FineCard from "../components/FineCard.vue";
import PlayerFineModal from "../modals/PlayerFineModal.vue";
import PlayerFineEditModal from "../modals/PlayerFineEditModal.vue";

const database = inject("database");
const addplayerFineModalIsActive = ref(false);
const editPlayerFineModalIsActive = ref(false);
const fineToEdit = ref({});
const tab = ref(null);
const isLoggedIn = useAuthentication().isLoggedIn;
const allUnpaidFines = ref([]);
const allPaidFines = ref([]);

onMounted(async () => {
  database.getAllUnpaidFines().then((res) => {
    allUnpaidFines.value = res.sort((a, b) => {
      if (a.fineDate < b.fineDate) return -1
      else return 1
    });
  });
  database.getAllPaidFines().then((res) => {
    allPaidFines.value = res;
  });
});

async function closeFineAPlayerModal(fetchNewFines) {
  addplayerFineModalIsActive.value = false;
  if (fetchNewFines) {
    database.getAllUnpaidFines().then((res) => {
      allUnpaidFines.value = res.sort((a, b) => {
      if (a.fineDate < b.fineDate) return -1
      else return 1
    });
    });
    database.getAllPaidFines().then((res) => {
      allPaidFines.value = res;
    });
  }
}

function showFineAPlayerModal() {
  addplayerFineModalIsActive.value = true;
}

function showFineDetail(fine) {
  if (isLoggedIn.value) {
    fineToEdit.value = fine;
    editPlayerFineModalIsActive.value = true;
  }
}

async function closeEditPlayerFineModal(fetchNewFines) {
  editPlayerFineModalIsActive.value = false;
  if (fetchNewFines) {
    database.getAllUnpaidFines().then((res) => {
      allUnpaidFines.value = res;
    });
    database.getAllPaidFines().then((res) => {
      allPaidFines.value = res;
    });
  }
}
</script>
