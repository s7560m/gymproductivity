<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container :class="{mobile: isMobile, desktop: !isMobile}">
      <p class="paragraph">Submit your workout below. Good on you for hitting a workout today!</p>
      <div style="height: 5vh"></div>
      <v-text-field v-model="userCode" @input="userCodeChange" label="4-Letter user code." solo-inverted placeholder="E.g. ASDF"></v-text-field>
      <v-textarea v-model="log" label="Log of your workout (optional)." solo-inverted placeholder="Type in stuff about your workout here. This could be the exercises you did, your weight, etc."></v-textarea>
      <p class="text-left" id="submit">{{(buttonDisabled) ? "submitting workout..." : ""}}</p>
      <div style="height: 5vh"></div>
      <v-btn :disabled="buttonDisabled" :dark="!buttonDisabled" @click="submit" fab color="deep-purple accent-4">
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
      buttonDisabled: false, // only enabled when
      // mobile / desktop breakpoints
      isMobile: window.innerWidth < 450,
    }
  },
  async created () {

    // we want to load the user's session (if they have any)
    const api = new gymproductivityAPI();
    this.userCode = await api.getUserSession().then(response => {

      // only return the user code if the session exists
      if (response.user) {
        return response.user.code;
      }
    });
  },
  methods: {
    // user code @change listener
    userCodeChange() {
      this.userCode = this.userCode.toUpperCase();
    },

    async submit () {

      // disable button so users can't submit multiple times
      this.buttonDisabled = true;

      const api = new gymproductivityAPI();
      if (this.log === '' && this.userCode !== '') {
        this.log = "No log provided."
      }

      // once the message returns, show the snackbar and re-enable the button
      this.message = await api.addExercise(this.userCode, this.log);
      this.snackbar = true;
      this.buttonDisabled = false;
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
#submit {
  font-style: italic;
  color: grey;
  height: 10px;
}

.mobile {
  width: 90vw;
}

.desktop {
  width: 400px;
}
</style>
