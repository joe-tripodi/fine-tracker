<template>
  <div class="ml-5 mr-5 mb-5" v-if="isDataLoaded">
    <div class="columns">
      <div class="column">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Reason</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fine, index) in searchedFines" :key="index">
              <ClubFine :fine="fine"></ClubFine>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <a
      v-if="isLoggedIn"
      @click="showClubFineModal"
      class="button is-floating is-dark is-small"
      id="floating-add"
    >
      <fa icon="fas fa-add"></fa>
    </a>
    <AddClubFineModal
      @closeAddClubFineModal="closeAddClubFineModal"
      :isActive="isActive"
    ></AddClubFineModal>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed } from "vue";
import { useAuthentication } from "../composables/authentication";
import AddClubFineModal from "../modals/AddClubFineModal.vue";

import ClubFine from "../components/ClubFine.vue";

const database = inject("database");
const allClubFines = ref([]);
const isDataLoaded = ref(false);
const reasonSearchText = ref("");
const isActive = ref(false);
const isLoggedIn = useAuthentication().isLoggedIn;

const searchedFines = computed(() => {
  const filteredFines = allClubFines.value.filter((fine) =>
    fine.reason.toLowerCase().includes(reasonSearchText.value.toLowerCase())
  );
  filteredFines.sort((fineA, fineB) => (fineA.amount > fineB.amount ? 1 : -1));
  return filteredFines;
});

async function closeAddClubFineModal(fineCretaed) {
  if (fineCretaed) {
    allClubFines.value = await database.getAllClubFines();
  }
  isActive.value = false;
}

function showClubFineModal() {
  isActive.value = true;
}

onMounted(async () => {
  allClubFines.value = await database.getAllClubFines();
  isDataLoaded.value = true;
});
</script>
