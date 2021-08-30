<template>
  <div class="box_tb">
    <v-data-table
      :loading="loader"
      loading-text="Cargando registros..."
      :headers="headers"
      :items="data"
    >
      <!-- eslint-disable -->
      <template v-slot:item.fecha="{ item }">
        {{getFecha(item.fecha)}}
      </template>
      <template v-slot:item.hora="{ item }">
        {{getHora(item.fecha)}}
      </template>
      
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ListaSeleccionada',
  computed: {
    ...mapState({
      data: (state) => state.dataList,
      loader: (state) => state.loader,
      activeType: (state) => state.activeType,
    }),
    headers() {
      return [
        {
          text: 'N° de suministro',
          align: 'start',
          value: 'suministro',
          sortable: false,
        },
        { text: 'Fecha', align: 'start', value: 'fecha', sortable: false },
        { text: 'Hora', align: 'start', value: 'hora', sortable: false },
        {
          text: 'Lectura anterior',
          align: 'start',
          value: 'lectura_anterior',
          sortable: false,
        },
        {
          text: 'Lectura actual',
          align: 'start',
          value: 'lectura_actual',
          sortable: false,
        },
      ]
    },
  },
  methods: {
    getHora(val){
      if (val) {
        try {
          return new Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(new Date(val))
        } catch (error) {
          return '-'
        }
      }
      return '-'
    },
    getFecha(val = null) {
      if (val) {
        try {
          return new Intl.DateTimeFormat(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour12: true,
          }).format(new Date(val))
        } catch (error) {
          return '-'
        }
      }
      return '-'
    },
  },
}
</script>

<style>
.box_tb {
  margin: 20px 0px;
  background-color: white;
  padding: 10px;
  border-radius: 0.35rem;
  box-shadow: rgb(255 152 0 / 5%) 0px 6px 24px 0px,
    rgb(255 152 0 / 8%) 0px 0px 0px 1px;
  border: 1px solid rgba(255, 152, 0, 0.2);
}
</style>
