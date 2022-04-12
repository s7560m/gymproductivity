<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container style="width: 40vh">
    <p class="paragraph">Type in your name and bio below to get started.</p>
    <div style="height: 5vh"></div>
    <v-text-field v-model="name" label="Name" solo-inverted placeholder="E.g. Hugh Janus"></v-text-field>
    <v-textarea v-model="bio" label="Bio" solo-inverted placeholder="Make this a short bio about yourself!"></v-textarea>
    <div style="height: 5vh"></div>
    <v-btn @click="register" fab dark color="deep-purple accent-4">
      <v-icon>mdi-check</v-icon>
    </v-btn>
    </v-container>


    <!--  Snackbar  -->
    <v-snackbar
      v-model="snackbar"
      timeout="3000">
      {{ message }}
    </v-snackbar>

    <!--  Dialog  -->
    <v-dialog v-model="dialog" width="50vh">
      <v-card>
        <v-card-title>You've been successfully registered!</v-card-title>
        <v-card-text>Welcome to the gym accountability app! Your 4-letter code is {{userCode}}. Save it somewhere safe and secret so you don't lose it! You'll need this code to join groups and submit exercises.</v-card-text>
        <v-card-actions>
          <v-btn @click="ok" text color="purple">copy code and close modal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AppBarDialog from "./components/AppBarDialog";
import gymproductivityAPI from "./gymproductivityAPI";
export default {
  name: "Signup",
  components: {AppBarDialog},
  data () {
    return {
      dialog: false,
      name: '',
      bio: '',
      message: '',
      snackbar: false,
      userCode: '',
    }
  },
  methods: {
    ok() {
      // close the dialog and copy the code
      navigator.clipboard.writeText(this.userCode);
      this.dialog = false;
      this.message = "Code copied to clipboard successfully!"
      this.snackbar = true;
    },
    async register () {
      const api = new gymproductivityAPI();
      if (this.name !== '' && this.bio !== '') {
        this.userCode = await api.addUser(this.name, this.bio);
        this.name = '';
        this.bio = '';
        this.dialog = true;
      } else if (this.name === '') {
        this.message = "Please enter a name.";
        this.snackbar = true;
      } else if (this.bio === '') {
        this.message = "Please enter a bio.";
        this.snackbar = true;
      }

    }
  }

}
</script>

<style scoped>
.paragraph {
  font-size: 20px;
}
#app {
  text-align: center
}
</style>
