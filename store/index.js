import {getData} from '@/utils';

export const state = () =>({
  activeType : '',
  loader : false,
  dataList : [],
  users : [],
  loadingUsers : false,
  loadingCreateRegistro : false,
  suministroSearch : '',
  dateInit : '',
  dateFinish : ''
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
  },
  SET_SUMINISTRO_SEARCH(state,data){
    state.suministroSearch = data
  },
  SET_DATE_INIT_SEARCH(state,data){
    state.dateInit = data
  },
  SET_DATE_FINISH_SEARCH(state,data){
    state.dateFinish = data
  },
}


export const actions = {
  setSuministro({commit},data){
    commit('SET_SUMINISTRO_SEARCH',data)
  },
  setFechaInit({commit},data){
    commit('SET_DATE_INIT_SEARCH',data)
  },
  setFechaFinish({commit},data){
    commit('SET_DATE_FINISH_SEARCH',data)
  },
  async getRegisters({commit,state}){
    commit('SET_LOADER',true)
    const response = await getData(this.$axios,`register?suministro=${state.suministroSearch}&initDate=${state.dateInit}&finishDate=${state.dateFinish}`,'GET')
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