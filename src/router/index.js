import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "../Home";
import Signup from "../SignUp";
import SubmitWorkoout from "../SubmitWorkout";
import ViewStats from "../ViewStats";
import JoinGroup from "../JoinGroup";
import CreateGroup from "../CreateGroup";

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/submit',
      name: 'Submit Workout',
      component: SubmitWorkoout
    },
    {
      path: '/stats',
      name: 'View Stats',
      component: ViewStats
    },
    {
      path: '/create',
      name: 'Create Group',
      component: CreateGroup
    },
    {
      path: '/join',
      name: 'Join Group',
      component: JoinGroup
    }
  ]
})
