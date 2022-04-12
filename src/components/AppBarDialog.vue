<template>
  <div>
    <v-card>
  <div v-for="button in buttons" class="menu-button">
  <v-btn width="50vw" color="deep-purple accent-4" dark>{{button.text}}</v-btn>
  </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AppBarDialog",
  data () {
    return {
      buttons: [
        {text: "Sign up", link: ""},
        {text: "bruh", link: ""}
      ]
    }
  }
}
</script>

<style scoped>
.menu-button {
  padding: 10px;
}
</style>
