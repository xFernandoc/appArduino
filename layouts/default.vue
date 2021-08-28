<template>
  <div v-if="!carga">
    <v-app dark >
      <v-app-bar fixed app color="orange">
        <v-container>
          <h1 style="color: #37392e" class="text-center white--text">
            Registros de lecturas 
          </h1>
        </v-container>
      </v-app-bar>
      <v-main>
          <v-container>
            <Nuxt />
          </v-container>
      </v-main>
      <v-footer :absolute="true" app color="orange">
        <span style="color: white"
          >Arduino &copy; {{ new Date().getFullYear() }}</span
        >
      </v-footer>
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
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.todo {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: white;
      flex-direction: column;
}

.clock-loader {
  --clock-color: orange;
  --clock-width: 4rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border-radius: 50%;
  margin: 0px auto;

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: calc(var(--clock-radius) * 0.25);
    width: var(--clock-thickness);
    background: var(--clock-color);
    border-radius: 10px;
    transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
    animation: spin infinite linear;
  }

  &::before {
    height: var(--clock-minute-length);
    animation-duration: 2s;
  }

  &::after {
    top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
    height: var(--clock-hour-length);
    animation-duration: 15s;
  }
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
