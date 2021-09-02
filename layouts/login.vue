<template>
  <div v-if="!carga">
    <v-app dark >
      <v-main>
        <Nuxt />
      </v-main>
      
    </v-app>
  </div>
  <div v-else class="todo">
    <div class="clock-loader"></div>
    <h3 style="margin-top : 10px">Cargando...</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carga: true,
    }
  },
  mounted(){
    setTimeout(() => {
      this.carga = false
    }, 1000);
  }
}
</script>