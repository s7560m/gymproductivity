import Axios from 'axios'

// const addy = 'https://gymproductivity.herokuapp.com'
const addy = 'http://localhost:3000'
const api = Axios.create({
  baseURL: addy,
  withCredentials: true
})
class gymproductivityAPI {
  constructor() {

  }
  // ============= USER STUFF ========================
  // add a user
  async addUser(name, bio) {
    return await api.post('/user/add', {"name": name, "bio": bio}).then(response => response.data);
  }

  // get the user's session (used for persistence)
  async getUserSession() {
    return await api.get('/user/getSession').then(response => response.data);
  }

  // ============= EXERCISE STUFF =============
  async addExercise(userCode, log) {
    return await api.post('/exercise/add', {"code": userCode, "description": log}).then(response => response.data);
  }


  // ==================== GROUP STUFF ======================
  // get the leaderboard, return an array
  async getLeaderboardOfGroup(groupCode) {
    return await api.post('/group/getLeaderboard', {"groupCode": groupCode}).then(response => response.data);
  }

  // create a group
  async createGroup(userCode, groupName, description) {

    return await api.post('/group/create', {"userCode": userCode, "groupName": groupName, "description": description}).then(response => response.data);
  }

  // join a group
  async joinGroup(userCode, groupCode) {
    return await api.post('/group/join', {"userCode": userCode, "groupCode": groupCode}).then(response => response.data);
  }

}

export default gymproductivityAPI;
