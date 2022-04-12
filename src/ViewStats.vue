<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container style="width: 40vh">
      <p class="paragraph">Type in your group code to view the leaderboard and individual stats.</p>
      <div style="height: 5vh"></div>
      <div>
        <v-text-field v-model="group_code" @input="submit(group_code)" label="Group code." solo-inverted placeholder="E.g. G-SPOT"></v-text-field>
        <p class="group-code-label" v-if="invalid_group">Group code is invalid.</p>
      </div>
      <v-card elevation="5">
        <v-card-title>Leaderboard.</v-card-title>
      <v-simple-table
        height="30vh"
        style="padding-top: 20px"
      >
        <thead>
        <tr>
          <th class="text-left">
            Name.
          </th>
          <th class="text-left">
            # of workouts.
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="user in leaderboard">
          <td class="text-left">{{ user.user.name }}</td>
          <td class="text-left">{{ user.exercises.length }}</td>
        </tr>
        </tbody>
      </v-simple-table>
      </v-card>
      <div style="height: 50px"></div>
      <v-divider></v-divider>
      <div style="height: 50px"></div>
      <v-combobox @change="selectUser" v-model="selected_user" placeholder="Choose a user." solo-inverted :items="getLeaderboardArray"></v-combobox>
      <v-card elevation="5">
        <v-card-title>Workout logs.</v-card-title>
        <v-simple-table
          fixed-header
          height="30vh"
          style="padding-top: 20px"
        >
          <thead>
          <tr>
            <th class="text-left">
              Date.
            </th>
            <th class="text-left">
              Description.
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="log in logs">
            <td class="text-left">{{log.timestamp.split("T")[0]}}</td>
            <td class="text-left">{{log.description}}</td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-card>
      <div style="height: 5vh"></div>
    </v-container>
  </v-app>
</template>

<script>

import gymproductivityAPI from "./gymproductivityAPI";
export default {
  name: "ViewStats",
  async created () {
    // this.api = new gymproductivityAPI();
  },
  data () {
    return {
      api: new gymproductivityAPI(),
      group_code: "",
      leaderboard: [],
      invalid_group: false,
      users: [],
      selected_user: null,
      logs: [],
    }
  },
  methods: {
    async submit(group_code) {

      // update leaderboard based on form input
      if (group_code.length >= 6) {
        console.log("update");
        this.leaderboard = await this.api.getLeaderboardOfGroup(this.group_code);
        if (this.leaderboard === "Group code is invalid!") {
          this.invalid_group = true;
        } else {
          this.invalid_group = false;

          function compare( a, b ) {
            if ( a.exercises.length < b.exercises.length ){
              return 1;
            }
            if ( a.exercises.length > b.exercises.length ){
              return -1;
            }
            return 0;
          }

          this.leaderboard.sort(compare);
          this.logs = [];
          this.selected_user = null;
        }
      }
    },
    selectUser () {
      // update workout logs if user is selected
      if (this.selected_user !== null) {
        // find the index of the leaderboard based on the name
        this.logs = this.leaderboard.filter(v => v.user.name === this.selected_user)[0].exercises.reverse();
      }
    }
  },
  computed: {
    getLeaderboardArray() {
      if (this.leaderboard !== []) return this.leaderboard.map(user => user.user.name);
      else return [];
    }
  },


}
</script>

<style scoped>
#app {
  text-align: center;
}
.paragraph {
  font-size: 20px;
}
.group-code-label {
  text-align: left;
  font-size: 15px;
  color: red;
}
</style>
