<template>
  <div>
    <AddRegistro/>
    <Lista />
  </div>
</template>

<script>
import Lista from '@/components/Lista.vue';
import AddRegistro from '@/components/addRegistro.vue';
export default {
  name : 'IndexPage',
  components : {
    Lista,
    AddRegistro
  },
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