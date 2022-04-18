<template>
  <v-app id="app">
    <div style="height: 10vh"></div>
    <v-container :class="{mobile: isMobile, desktop: !isMobile}">
      <p class="paragraph">Type in your group code to view the leaderboard and individual stats.</p>
      <div style="height: 5vh"></div>
      <div>
        <v-text-field v-model="group_code" @input="submit()" label="Group code." solo-inverted placeholder="E.g. G-FGHJ"></v-text-field>
        <p class="group-code-label" v-if="invalid_group">Group code is invalid.</p>
      </div>
      <v-card elevation="5">
        <v-card-title>Leaderboard.</v-card-title>
        <v-skeleton-loader v-if="loadingLeaderboard" type="card" :class="{mobileSkeleton: isMobile, desktopSkeleton: !isMobile}"></v-skeleton-loader>
      <v-simple-table
        v-if="!loadingLeaderboard"
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
          <td class="text-left">{{ getName(user)}}</td>
          <td class="text-left">{{ getExerciseNumber(user)}}</td>
        </tr>
        </tbody>
      </v-simple-table>
      </v-card>
      <div style="height: 50px"></div>
      <v-divider></v-divider>
      <div style="height: 50px"></div>
      <v-combobox @change="selectUser" v-model="selected_user" placeholder="Choose a user." solo-inverted :items="comboboxUsers"></v-combobox>
      <v-card elevation="5">
        <v-card-title class="text-left">Workout logs{{(selected_user !== null) ? " for " + selected_user : ""}}.</v-card-title>
        <v-card-subtitle class="text-left">
          {{selected_user_bio}}
          <v-btn @mouseover="showEditableSnackbar" @mouseleave="editable_bio_snackbar_show = false" @click="editable_bio_dialog = true" fab x-small text v-if="editable_bio"><v-icon small>mdi-pencil</v-icon></v-btn>
          <v-snackbar v-model="editable_bio_snackbar_show">Click to edit your bio.</v-snackbar>
        </v-card-subtitle>
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
            <td class="text-left">{{ getTimestamp(log) }}</td>
            <td class="text-left">{{log.description}}</td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-card>
      <div style="height: 5vh"></div>
    </v-container>
    <v-dialog v-model="editable_bio_dialog" width="400px">
      <v-card>
        <v-card-title>Edit your bio here.</v-card-title>
        <v-container style="padding: 20px">
        <v-text-field v-model="loggedInUser.bio"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-btn @click="editable_bio_dialog = false" text color="purple">Cancel</v-btn>
          <v-btn @click="updateBio" text color="purple">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="editable_bio_snackbar_show" timeout="3000">{{editable_bio_snackbar_message}}</v-snackbar>
  </v-app>
</template>
<script>

import gymproductivityAPI from "./gymproductivityAPI";
export default {
  name: "ViewStats",
  async created () {
    const session = await this.api.getUserSession();

    // if the user's session exists, get their group code
    if (session.group !== undefined) {
      this.group_code = session.group.groupCode;
      await this.submit();
    }

    // get the user if their session exists
    if (session.user !== undefined) {
      this.loggedInUser = session.user;
    }
  },
  data () {
    return {
      api: new gymproductivityAPI(),
      group_code: "",
      leaderboard: [],
      invalid_group: false,
      users: [],
      selected_user: null,
      selected_user_bio: '',
      logs: [],
      comboboxUsers: null,

      // sometimes tables take a while to load, so use this for skeleton loaders instead
      loadingLeaderboard: false,

      // save the current user that's saved in the cookies, plus set editable to true if the user selects themselves in the log dropdown
      loggedInUser: {bio: ""},
      editable_bio: false,
      editable_bio_snackbar_show: false,
      editable_bio_dialog: false,
      editable_bio_snackbar_message: "Click to edit your bio.",

      // mobile / desktop breakpoints
      isMobile: window.innerWidth < 450,
    }
  },
  methods: {

    // textfield @change listener
    async submit() {

      // group code should always be uppercase
      this.group_code = this.group_code.toUpperCase();

      // add '-' to make group code easier to type in
      if (this.group_code.length === 1) {
        this.group_code += "-";
      }
      // update leaderboard based on form input
      else if (this.group_code.length >= 6) {
        this.loadingLeaderboard = true;
        this.leaderboard = await this.api.getLeaderboardOfGroup(this.group_code);

        // show that the group code is invalid and get rid of the loading state
        if (this.leaderboard === "Group code is invalid!") {
          this.invalid_group = true;
          this.loadingLeaderboard = false;
          this.leaderboard = [];
        } else {

          // valid group code, sort the leaderboard in descending order based on how many exercises have been performed by users
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
          this.comboboxUsers = this.leaderboard.map(user => user.user.name);
        }
        this.loadingLeaderboard = false;
      } else {
        // no need to show it's invalid when it's less than 6 characters
        this.invalid_group = false;
      }
    },

    selectUser () {
      // update workout logs if user is selected
      if (this.selected_user !== null) {
        // filter leaderboard by its name and also return the index of it too
        let foundIndex;
        let filteredLeaderboard = this.leaderboard.filter((v, i) => {

          if (v.user.name === this.selected_user) {
            foundIndex = i;
            return true;
          }
        })[0];
        this.selected_user_bio = "\"" + filteredLeaderboard.user.bio + "\"";

        // check whether the current user is the user selected, if so, make their bio editable
        // we're using IDs to make the transition from codes to user + pw auth easier
        this.editable_bio = this.leaderboard[foundIndex].user._id === this.loggedInUser._id;

        // sort exercises based on the timestamp in descending order
        function compare( a, b ) {
          if ( a.timestamp < b.timestamp ){
            return 1;
          }
          if ( a.timestamp > b.timestamp ){
            return -1;
          }
          return 0;
        }
        this.logs = filteredLeaderboard.exercises.sort(compare);
      }
    },
    getName(user) {
      return (user.user) ? user.user.name : "";
    },
    getExerciseNumber(user) {
      return (user.exercises) ? user.exercises.length : "";
    },

    getTimestamp(log) {
      let newTimestamp;
      // make sure log timestamp is not undefined yet
      if (log.timestamp) {

        // if it includes T it's the old timestamp format, otherwise use the new timestamp format
        if (log.timestamp.includes("T")) {
          newTimestamp = log.timestamp.split("T")[0] + ", " + log.timestamp.split("T")[1].split(".")[0]
        } else {
          newTimestamp = log.timestamp;
        }

      }
      return newTimestamp;
    },

    // update bio
    async updateBio () {
      this.editable_bio_snackbar_message = "Bio has been updated! Reloading to update changes.";
      await this.api.updateBio(this.loggedInUser);
      this.editable_bio_dialog = false;
      this.editable_bio_snackbar_show = true;

      // delay reload
      setTimeout(() => {location.reload()}, 2000);
    },

    showEditableSnackbar () {
      this.editable_bio_snackbar_show = true
      this.editable_bio_snackbar_message = "Click to edit your bio.";
    }
  },
  computed: {

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
td {
  padding-bottom:20px;
}

.mobile {
  width: 90vw;
}

.desktop {
  width: 400px;
}

.mobileSkeleton {
  width: 80vw;
}

.desktopSkeleton {
  width: 370px;
}
</style>
