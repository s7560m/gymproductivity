<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container :class="{mobile: isMobile, desktop: !isMobile}">
      <p class="paragraph">Join a group below.</p>
      <div style="height: 5vh"></div>
      <v-text-field v-model="userCode" @input="userCodeChange" label="4-Letter user code." solo-inverted placeholder="E.g. ASDF"></v-text-field>
      <v-text-field v-model="groupCode" @input="groupCodeChange" label="Group code." solo-inverted placeholder="E.g. G-FGHJ"></v-text-field>
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
      // mobile / desktop breakpoints
      isMobile: window.innerWidth < 450,
    }
  },
  async created () {
    // we want to load the user's session (if they have any)
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

    // group code @change listener
    groupCodeChange() {
      this.groupCode = this.groupCode.toUpperCase();

      if (this.groupCode.length === 1) {
        this.groupCode += "-";
      }
    },

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
.mobile {
  width: 90vw;
}

.desktop {
  width: 400px;
}
</style>
