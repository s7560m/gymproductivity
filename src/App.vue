<template>
  <div id="app">
    <v-app>
      <v-app-bar max-height="60px" color="deep-purple accent-4" dark>
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
        {icon: "mdi-login", text: "Register.", link: "/"},
        {icon: "mdi-account-group-outline", text: "Create a group.", link: "/create"},
        {icon: "mdi-account-group", text: "Join a group.", link: "/join"},
        {icon: "mdi-weight-lifter", text: "Submit a workout.", link: "/submit"},
        {icon: "mdi-file-document", text: "View stats.", link: "/stats"}
      ]
    }
  },
  methods: {
    navigate (link) {
      this.drawer = false;
      this.$router.push(link);
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
