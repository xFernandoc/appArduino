import {getData} from '@/utils';

export const state = () =>({
  activeType : '',
  loader : false,
  dataList : [],
  users : [],
  loadingUsers : false,
  loadingCreateRegistro : false
})

export const mutations = {
  SET_TYPE(state,data){
    state.activeType = data
  },
  SET_LOADER (state,data){
    state.loader = data
  },
  SET_DATA(state,data){
    state.dataList = data
  },
  SET_LOADER_USERS(state,data){
    state.loadingUsers = data
  },
  SET_USERS(state,data){
    state.users = data
  },
  SET_LOADER_CREATED(state,data){
    state.loadingCreateRegistro = data
  }
}


export const actions = {
  async getRegisters({commit}){
    commit('SET_LOADER',true)
    const response = await getData(this.$axios,'register','GET')
    const dataResponse = response.data
    if(dataResponse.registros){
      commit('SET_DATA',dataResponse.registros)
    }
    commit('SET_LOADER',false)
  },
  async getUsers({commit}){
    commit('SET_LOADER_USERS',true)
    const response = await getData(this.$axios,'users','GET')
    const dataResponse = response.data
    if(dataResponse.usuarios){
      commit('SET_USERS',dataResponse.usuarios)
    }
    commit('SET_LOADER_USERS',false)
  },
  async sendRegistro({commit},data){
    commit('SET_LOADER_CREATED',true)
    await getData(this.$axios,'register/newRegister','POST',data)
    commit('SET_LOADER_CREATED',false)
  }
}