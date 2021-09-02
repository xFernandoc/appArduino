<template>
  <div>
    <AddRegistro/>
    <Filtro/>
    <Lista />
  </div>
</template>

<script>
import Lista from '@/components/Lista.vue';
import AddRegistro from '@/components/addRegistro.vue';
import Filtro from '@/components/Filtro.vue';
export default {
  name : 'IndexPage',
  components : {
    Lista,
    AddRegistro,
    Filtro
  },
  auth : true,
  async mounted(){
    try {
      await this.$store.dispatch('getRegisters')
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style>

</style>