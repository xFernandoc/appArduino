<template>
  <v-form class="box_filtros box_tb" ref="form_filtros">
    <h3><v-icon>mdi-filter</v-icon> Filtrar por:</h3>
    <v-container>
      <v-row class="list_filtros">
        <v-col offset-md="2" cols="12" md="4" class="by_suministro">
          <label for="" class="title_filtro">Suministro</label>
          <v-text-field
            dense
            outlined
            placeholder="N° de suministro"
            inputmode="numeric"
            v-model="suministro"
            class="mt-2"
          />
        </v-col>
        <v-col cols="12" md="4" class="by_fechas">
          <label for="" class="title_filtro"
            >Rango de fechas
            <span
              @click="resetDates"
              class="clearFiltro red--text text--darken-4"
              >X</span
            >
          </label>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="dateInit"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateInit"
                label="Ingrese la fecha inicial"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                outlined
                class="mt-2"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateInit" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancelar
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(dateInit)">
                Guardar
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <v-dialog
            ref="dialog2"
            v-model="modal2"
            :return-value.sync="dateFinish"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFinish"
                label="Ingrese la fecha final"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                outlined
                class="mt-2"
                :disabled="dateInit === ''"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateFinish" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false">
                Cancelar
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog2.save(dateFinish)"
              >
                Guardar
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" offset-md="2" md="8" class="buttons">
          <v-btn :disabled="!isActive" @click="getData" class="blue darken-3 white--text"
            ><strong>Buscar</strong></v-btn
          >
          <v-btn class="red darken-3 white--text" @click="borrarFiltros"
            ><strong>Borrar filtros</strong></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Filtros',
  data: () => ({
    suministro: '',
    dateInit: '',
    modal: false,
    modal2: false,
    dateFinish: '',
  }),
  computed: {
    isActive() {
      return (
        this.suministro !== '' || this.dateInit !== '' || this.dateFinish !== ''
      )
    },
  },
  methods: {
    required(name, string = true) {
      if (string) {
        return (value) => !!value || 'Debes ingresar un(a) ' + name + '.'
      }
      return (value) => value !== '' || 'Debes ingresar un(a) ' + name + '.'
    },
    async borrarFiltros(){
      this.suministro = '';
      this.dateInit = '';
      this.dateFinish = '';
      await this.getData()
    }, 
    async getData() {
      this.$store.dispatch('setSuministro', this.suministro)
      this.$store.dispatch('setFechaInit', this.dateInit)
      this.$store.dispatch('setFechaFinish', this.dateFinish)
      try {
        await this.$store.dispatch('getRegisters')
      } catch (error) {
        console.log(error)
      }
    },
    resetDates() {
      this.dateInit = ''
      this.dateFinish = ''
    },
  },
}
</script>

<style lang="scss">
.box_filtros {
  & .title_filtro {
    font-weight: bold;
    color: darkblue;
  }
  & .v-text-field__details {
    display: none;
  }
  & .clearFiltro {
    cursor: pointer;
    font-weight: bold;
  }
  & .buttons {
    display: flex;
    justify-content: space-evenly;
    & button {
      width: 30%;
      @media (max-width: 600px) {
        width: 40%;
      }
      @media (max-width: 420px) {
        width: 100%;
        margin: 4px 0px;
      }
    }

    @media (max-width: 420px) {
      flex-direction: column;
    }
  }
}
</style>
