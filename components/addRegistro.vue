<template>
  <div class="button_add">
    <v-btn class="red darken-2 mr-2 white--text" :disabled='refreshLoading' @click="refrescar"> <v-icon>mdi-refresh</v-icon> Refrescar</v-btn>
    <v-btn class="blue white--text darken-3 mr-2" :disabled='excelLoading' @click="createXLS">
      <v-icon>mdi-file-excel</v-icon> Generar excel</v-btn
    >
    <v-btn class="green white--text" :disabled="loadingUsers" @click="openModal"
      ><v-icon class="mr-2">mdi-plus-circle</v-icon> Agregar registro</v-btn
    >
    <v-dialog v-model="active" max-width="900" persistent>
      <div class="modal_default">
        <h2 class="green--text text-center">Agregar registro</h2>
        <v-divider />
        <v-form ref="form" class="frmRegistro">
          <v-container>
            <v-row>
              <v-col md="6" cols="12">
                <v-radio-group v-model="selectUser">
                  <v-radio label="Suministro nuevo" value="1" />
                  <v-radio label="Suministro ya creado" value="2" />
                </v-radio-group>
              </v-col>
              <v-col md="6" cols="12">
                <template v-if="selectUser == '2'">
                  <v-autocomplete
                    v-model="suministro"
                    no-data-text="No encontrado"
                    :items="suministros"
                    placeholder="Seleccione un suministro"
                    dense
                    filled
                    required
                    :rules="[required('suministro')]"
                  />
                </template>
                <template v-else>
                  <v-text-field
                    v-model="suministro"
                    autocomplete="new-suministro"
                    dense
                    outlined
                    placeholder="Ingrese el suministro"
                    required
                    :rules="[required('suministro')]"
                  />
                </template>
              </v-col>
              <v-col md="6" cols="12">
                <label for="">Lectura anterior</label>
                <v-text-field
                  type="number"
                  min="0"
                  required
                  :rules="[required('lectura anterior')]"
                  inputmode="numeric"
                  dense
                  outlined
                  placeholder="Ingrese la lectura"
                  v-model="anterior"
                  autocomplete="new-lectura"
                />
              </v-col>
              <v-col md="6" cols="12">
                <label for="">Lectura actual</label>
                <v-text-field
                  type="number"
                  min="0"
                  required
                  :rules="[required('lectura actual')]"
                  inputmode="numeric"
                  dense
                  outlined
                  placeholder="Ingrese la lectura"
                  v-model="actual"
                  autocomplete="new-lectura"
                />
              </v-col>
              <v-col cols="12" class="text-center">
                <v-btn
                  :disabled="loadingCreated"
                  class="red darken-3 white--text"
                  @click="closeModal"
                  >Cancelar</v-btn
                >
                <v-btn
                  :disabled="loadingCreated"
                  class="green white--text"
                  @click="saveRegister"
                  >Guardar</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ title }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddRegistro',
  data: () => ({
    active: false,
    loading: false,
    suministro: '',
    selectUser: '1',
    actual: '',
    anterior: '',
    snackbar: false,
    title: '',
    excelLoading : false,
    refreshLoading : false
  }),
  computed: {
    ...mapState({
      loadingUsers: (state) => state.loadingUsers,
      users: (state) => state.users,
      loadingCreated: (state) => state.loadingCreateRegistro,
      suministroStore : (state) => state.suministroSearch,
      dateInit : (state) => state.dateInit,
      dateFinish : (state) => state.dateFinish,
    }),
    suministros() {
      return this.users.map((user) => user.suministro)
    },
  },
  methods: {
    async openModal() {
      this.title = 'Cargando usuarios'
      this.snackbar = true
      await this.$store.dispatch('getUsers')
      this.active = true
      this.snackbar = false
    },
    closeModal() {
      this.active = false
      this.suministro = ''
      this.actual = ''
      this.anterior = ''
      this.$refs.form.resetValidation()
    },
    required(name, string = true) {
      if (string) {
        return (value) => !!value || 'Debes ingresar un(a) ' + name + '.'
      }
      return (value) => value !== '' || 'Debes ingresar un(a) ' + name + '.'
    },
    async saveRegister() {
      if (this.$refs.form.validate()) {
        const data = {
          suministro: this.suministro,
          actual: parseFloat(this.actual),
          anterior: parseFloat(this.anterior),
        }
        try {
          await this.$store.dispatch('sendRegistro', data)
          this.snackbar = true
          this.active = false
          await this.$store.dispatch('getRegisters')
          this.title = 'Registro creado'
        } catch (error) {
          console.log('Error')
        }
      }
    },
    async refrescar(){
      this.refreshLoading = true
      try {
        await this.$store.dispatch('getRegisters')
        this.snackbar = true
        this.title = 'Registros actualizados'
      } catch (error) {
        console.log(error);
      }
      this.refreshLoading = false
    },
    async createXLS(){
      this.excelLoading = true
      try {
        const dataExcel = await this.$axios.$get(`register/createReport?suministro=${this.suministroStore}&dateInit=${this.dateInit}&dateFinish=${this.dateFinish}`)
        if(dataExcel.excel){
          window.open(dataExcel.excel,'_top')
        }
      } catch (error) {
        console.log(error);
      }
      this.excelLoading = false
    }
  },
}
</script>

<style lang="scss">
button {
  & span {
    text-transform: capitalize !important;
  }
}
.button_add {
  margin: 20px 0px;
  display: flex;
  justify-content: flex-end;
  @media(max-width : 600px){
    flex-direction: column;
    & button{
      width: 100%;
      margin: 4px 0px;
    }
  }
}

.frmRegistro label {
  font-weight: bold;
  color: darkblue;
}
</style>
