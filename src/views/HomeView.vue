<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/playerfines')"
          color="success"
          width="50%"
          height=40
        >Fine a player</v-btn>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/players')"
          color="primary"
          width="50%"
          height=40
        >Teamsheet</v-btn>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/clubfines')"
          color="warning"
          width="50%"
          height=40
        >Club Fines</v-btn>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          @click="router.push('/login')"
          color="black"
          width="50%"
          height=40
        >Admin Login</v-btn>
      </v-col>
  </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
