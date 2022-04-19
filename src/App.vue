<template>
  <div id="app">
    <v-app>
      <v-app-bar v-if="showAppBar" elevation="10" max-height="60px" dark color="deep-purple accent-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer absolute v-model="drawer">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Menu.
            </v-list-item-title>
            <v-list-item-subtitle>
              Choose an option.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list nav>
          <v-list-item v-for="listItem in list" link @click="navigate(listItem.link)">
            <v-list-item-icon>
              <v-icon>
              {{listItem.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{listItem.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <router-view v-on:openNav="drawer = true" />
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      list: [
        {icon: "mdi-login", text: "Register.", link: "/register"},
        {icon: "mdi-account-group-outline", text: "Create a group.", link: "/create"},
        {icon: "mdi-account-group", text: "Join a group.", link: "/join"},
        {icon: "mdi-weight-lifter", text: "Submit a workout.", link: "/submit"},
        {icon: "mdi-file-document", text: "View stats.", link: "/stats"}
      ],
      showAppBar: false,
    }
  },
  created () {
    // hide app bar if route path is landing page ("/")
    // we want to call it in the created because when a user navigates to a url manually we want to listen to that
    this.showAppBarFunction(this.$route);
  },
  methods: {
    navigate (link) {
      this.drawer = false;
      this.$router.push(link);
    },

    showAppBarFunction(route) {
      this.showAppBar = route.name !== "Landing";
    }
  },
  watch: {
    $route (to, from) {
      this.showAppBarFunction(to);
      // this.showAppBar = this.$route.name !== "Landing";
      // alert(this.$route.name);
    }
  }


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
