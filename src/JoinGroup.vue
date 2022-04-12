<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container style="width: 40vh">
      <p class="paragraph">Join a group below.</p>
      <div style="height: 5vh"></div>
      <v-text-field v-model="userCode" label="4-Letter user code." solo-inverted placeholder="E.g. PENI"></v-text-field>
      <v-text-field v-model="groupCode" label="Group code." solo-inverted placeholder="E.g. G-FXGD"></v-text-field>
      <div style="height: 5vh"></div>
      <v-btn @click="joinGroup" fab dark color="deep-purple accent-4">
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
  name: "JoinGroup",
  data () {
    return {
      userCode: '',
      groupCode: '',
      message: '',
      snackbar: false,
    }
  },
  methods: {
    async joinGroup() {
      const api = new gymproductivityAPI();
      this.message = await api.joinGroup(this.userCode, this.groupCode);
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
