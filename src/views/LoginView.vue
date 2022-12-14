<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" required label="Email"></v-text-field>
          <v-text-field
            v-model="password"
            required
            type="password"
            label="Password"
          ></v-text-field>
          <v-card-actions>
            <div class="mx-auto text-center">
              <p v-if="errorMessage" class="pb-5 text-red">
                {{ errorMessage }}
              </p>
              <v-btn
                @click.prevent="signIn"
                @submit.prevent="signIn"
                type="submit"
                variant="tonal"
                >LOGIN</v-btn
              >
            </div>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

function signIn() {
  errorMessage.value = "";
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push("/playerfines");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = `Invalid email`;
          break;
        case "auth/user-not-found":
          errorMessage.value = `User with the email: ${email.value} does not exist`;
          break;
        case "auth/wrong-password":
          errorMessage.value = `Incorrect password`;
          break;
        default:
          errorMessage.value = `Email or password was incorrect`;
          break;
      }
    });
}
</script>
