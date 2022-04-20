<template>
<v-app>
  <v-img max-height="100vh" style="position: relative" src="../static/gymaction_background_4x.png">
  <div style="height: 100px"></div>
  <v-container :class="{container_desktop: !isMobile, container_mobile: isMobile}">
    <div id="title">
      <div id="headingcontainer">
        <p id="heading1" :class="{heading1desktop: !isMobile, heading1mobile: isMobile}">Gym</p>
        <p id="heading2" :class="{heading2desktop: !isMobile, heading2mobile: isMobile}">action</p>
        <v-icon  id="dumbbell" :class="{dumbbell_desktop: !isMobile, dumbbell_mobile: isMobile}">mdi-dumbbell</v-icon>
      </div>
        <div id="subheadingcontainer">
        <p id="subheading" :class="{subheading_desktop: !isMobile, subheading_mobile: isMobile}">game-ify your workouts</p>
      </div>
    </div>
    <div id="paragraphcontainer">
      <p id="paragraph" :class="{paragraph_desktop: !isMobile, paragraph_mobile: isMobile}">Take your workouts to the next level by competing with your friends in exciting ways.</p>
      <v-btn @click="getStarted" :large="getInnerWidthLarge" :small="isMobile" dark id="button" :class="{button_desktop: !isMobile, button_mobile: isMobile}">try for free</v-btn>
    </div>
  </v-container>
    <div style="position: relative"></div>
    <p id="copyright" :class="{copyright_mobile: isMobile}">© Hayden Hoffman 2022</p>
  </v-img>
</v-app>
</template>

<script>
export default {
  name: "LandingPage",
  data () {
    return {
      isMobile: window.innerWidth < 450,
    }
  },
  created () {
    this.$emit('hideAppBar');
  },
  methods: {
    getStarted() {
      this.$router.push('/register');
    }
  },
  computed: {
    getInnerWidthLarge () {
      return window.innerWidth > 1500;
    },

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
#title {
  transform: translateY(-30px);
}

.container_mobile {
  padding: 30px;
}

.container_desktop {
  position: absolute;
  left: 10%;
}

/* heading 1 */
#heading1 {
  font-family: 'Bebas Neue', cursive;
  font-weight: bold;
  display: inline-block;
}
.heading1mobile {
  font-size: 18vw;
}

.heading1desktop {
  /*font-size: 110px;*/
  font-size: 8vw;
}

/* heading 2 */
#heading2 {
  font-weight: bold;
  font-family: 'Bebas Neue', cursive;

  display: inline-block;
  color: rebeccapurple;
}
.heading2mobile {
  font-size: 18vw;
}
.heading2desktop {
  font-size: 8vw;
}
#subheading {
  font-family: 'Bebas Neue', cursive;
  color: #9e9e9e;
  font-weight: bold;
  position: absolute;

}
.subheading_mobile {
  font-size: 10vw;
  transform: translateY(20vw);
}
.subheading_desktop {
  /*font-size: 60px;*/
  font-size: 4vw;
  /*transform: translateY(160px);*/
  transform: translateY(9.5vw);
}

#dumbbell {

}

.dumbbell_desktop {
  /* vuetify uses !important in their styling, so use !important to override it */
  font-size: 6vw !important;
  bottom: 2.5vw;
  left: 20px;
}

.dumbbell_mobile {
  font-size: 14vw !important;
  bottom: 5vw;
  left: 10px;
}

#headingcontainer {
  position: absolute;
}
#subheadingcontainer {

}

#paragraphcontainer {
  width: 300px;
}
#paragraph {
  position: absolute;
  font-family: 'Bebas Neue', cursive;

}

.paragraph_desktop {
  width: 550px;
  font-size: 1.8vw;
  transform: translateY(18vw);
}
.paragraph_mobile {
  width: 70vw;
  font-size: 6vw;
  transform: translateY(50vw);
}

#button {
  position: absolute;
  font-family: 'Bebas Neue', cursive;
}

.button_mobile {
  transform: translateY(87vw);
  font-size: 6vw !important;
}
.button_desktop {
  transform: translateY(30vw);
  font-size: 1.3vw !important;
}

#copyright {
  color: white;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  /*margin-left: -10%;*/
}
.copyright_mobile {
  font-size: 4vw;
}
</style>
