import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import fs from './fs'
import { RootState } from './types'
import { UserAPI } from '@/interface'

Vue.use(Vuex)

const state: RootState = {
  user: null,
  cats: null
}

const mutations: MutationTree<RootState> = {
  /**
   * 修改用户资料
   */
  CHANGE_USER_PROFILE(state, data: UserAPI | null) {
    state.user = data
  },
  /**
   * 修改分类 
   */
  CHANGE_CATS(state, data: any) {
    state.cats = data
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {

  },
  plugins: [
    fs()
  ]
})