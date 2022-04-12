<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container style="width: 40vh">
      <p class="paragraph">Submit your workout below. Good on you for hitting a workout today!</p>
      <div style="height: 5vh"></div>
      <v-text-field v-model="userCode" label="4-Letter user code." solo-inverted placeholder="E.g. PENI"></v-text-field>
      <v-textarea v-model="log" label="Log of your workout (optional)." solo-inverted placeholder="Type in stuff about your workout here. This could be the exercises you did, your weight, etc."></v-textarea>
      <div style="height: 5vh"></div>
      <v-btn @click="submit" fab dark color="deep-purple accent-4">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-container>

    <!--  Snackbar  -->
    <v-snackbar
      v-model="snackbar"
      timeout="4000">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import gymproductivityAPI from "./gymproductivityAPI";
export default {
  name: "SubmitWorkout",
  data () {
    return {
      userCode: '',
      log: '',
      snackbar: false,
      message: '',
    }
  },
  methods: {
    async submit () {
      const api = new gymproductivityAPI();
      if (this.log === '' && this.userCode !== '') {
        this.log = "No log provided."
      }
      this.message = await api.addExercise(this.userCode, this.log);
      this.snackbar = true;
    }
  }
}
</script>

<style scoped>
#app {
  text-align: center;
}
.paragraph {
  font-size: 20px;
}
</style>
