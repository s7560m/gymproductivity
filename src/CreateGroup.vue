<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container :class="{mobile: isMobile, desktop: !isMobile}">
      <p class="paragraph">Create a group below. Be sure to fill out all the details!</p>
      <div style="height: 5vh"></div>
      <v-text-field v-model="userCode" @input="userCodeChange" label="4-Letter user code." solo-inverted placeholder="E.g. ASDF"></v-text-field>
      <v-text-field v-model="groupName" label="Name of your group." solo-inverted placeholder="E.g. Workout Group 1"></v-text-field>
      <v-textarea v-model="description" label="Description of your group (optional)." solo-inverted :placeholder="descriptionPlaceholder"></v-textarea>
      <div style="height: 5vh"></div>
      <v-btn @click="createGroup" fab dark color="deep-purple accent-4">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-container>

    <!--  Snackbar  -->
    <v-snackbar
      v-model="snackbar"
      timeout="4000">
      {{ message }}
    </v-snackbar>

    <!--  Dialog  -->
    <v-dialog v-model="dialog" width="400px">
      <v-card>
        <v-card-title>Group successfully created!</v-card-title>
        <v-card-text>Your 6-letter group code is {{message}}. Remember to save this code so your friends can join your group too!</v-card-text>
        <v-card-actions>
          <v-btn @click="ok" text color="purple">copy code and close modal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import gymproductivityAPI from "./gymproductivityAPI";

export default {
  name: "CreateGroup",
  data () {
    return {
      descriptionPlaceholder: "E.g. \"We're the monkes of the gym.\"",
      userCode: '',
      groupName: '',
      description: '',
      message: '',
      snackbar: false,
      dialog: false,
      // mobile / desktop breakpoints
      isMobile: window.innerWidth < 450,
    }
  },
  methods: {
    // user code @change listener
    userCodeChange() {
      this.userCode = this.userCode.toUpperCase();
    },

    ok() {
      // close the dialog and copy the code
      navigator.clipboard.writeText(this.message);
      this.dialog = false;
      this.message = "Code copied to clipboard successfully!"
      this.snackbar = true;
    },
    async createGroup() {
      const api = new gymproductivityAPI();
      if (this.userCode !== "" && this.groupName !== "") {
        this.message = await api.createGroup(this.userCode, this.groupName, this.description);

        // make sure the 6-letter code is returned before showing the dialog
        // otherwise it's an error returned by the api -> show the snackbar instead
        if (this.message.length === 6) this.dialog = true;
        else this.snackbar = true;
        this.groupName = '';
        this.userCode = '';
      } else if (this.userCode === "") {
        this.message = "Please enter your 4-letter user code."
        this.snackbar = true;
      } else if (this.groupName === "") {
        this.message = "Please enter a name for your group."
        this.snackbar = true;
      }
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
.mobile {
  width: 90vw;
}

.desktop {
  width: 400px;
}
</style>
