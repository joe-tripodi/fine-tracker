<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/playerfines')"
          color="success"
          icon="mdi-cash"
          size="x-large"
        ></v-btn>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/players')"
          color="primary"
          icon="mdi-tshirt-crew"
          size="x-large"
        ></v-btn>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/clubfines')"
          color="warning"
          icon="mdi-list-box-outline"
          size="x-large"
        ></v-btn>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/login')"
          color="black"
          icon="mdi-account"
          size="x-large"
        ></v-btn>
      </v-col>
  </v-row>
  </v-container>
</template>

<script setup>
const router = useRouter();
import { useRouter } from "vue-router";
</script>
