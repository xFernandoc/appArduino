<template>
  <div v-if="!carga">
    <v-app dark>
      <v-app-bar fixed app color="orange">
        <v-container style="position: relative">
          <h1 style="color: #37392e" class="white--text title_dash">
            Registros de lecturas
          </h1>
          <div class="btn_logout">
            <v-btn
              class="green darken-3 white--text mr-2"
              @click="modalUserCreated"
              ><v-icon>mdi-plus-circle</v-icon>
              <span class="txt_btn">Agregar usuario</span></v-btn
            >
            <v-btn
              class="white--text blue darken-3"
              :disabled="cargaLogout"
              @click="logout"
            >
              <v-icon>mdi-logout</v-icon>
              <span class="txt_btn"> Cerrar sesión</span></v-btn
            >
          </div>
          <v-dialog v-model="active" max-width="500" persistent>
            <div class="modal_default">
              <h2 class="green--text text-center">Agregar usuario</h2>
              <v-divider class="mt-2 mb-4" />
              <v-form ref="formUser" class="frmRegistroUser">
                <v-text-field
                  dense
                  outlined
                  label="Correo electrónico"
                  type="email"
                  :rules="[required('correo'), validateCorreo]"
                  @keyup="kE"
                  autocomplete="username"
                  v-model="email"
                />
                <v-text-field
                  dense
                  outlined
                  label="Clave"
                  :rules="[required('clave')]"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  @keyup="kE"
                  autocomplete="current-password"
                  v-model="password"
                />
              </v-form>
              <div class="text-center">
                <v-btn
                  @click="active = false"
                  class="blue darken-5 white--text"
                  :disabled="registerLoader"
                  >Cerrar</v-btn
                >
                <v-btn
                  @click="saveUser"
                  class="green white--text"
                  :disabled="registerLoader"
                  >Guardar</v-btn
                >
              </div>
            </div>
          </v-dialog>
        </v-container>
      </v-app-bar>
      <v-snackbar v-model="snackbar" :timeout="2000">
        {{ title }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
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
    <h3 style="margin-top: 10px">Cargando...</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carga: true,
      cargaLogout: false,
      active: false,
      email: '',
      show1: true,
      password: '',
      registerLoader: false,
      snackbar: false,
      title: '',
    }
  },
  mounted() {
    setTimeout(() => {
      this.carga = false
    }, 1000)
  },
  methods: {
    async logout() {
      this.cargaLogout = true
      await this.$auth.logout()
    },
    modalUserCreated() {
      this.active = true
    },

    async saveUser() {
      this.registerLoader = true
      try {
        if (this.$refs.formUser.validate()) {
          const data = {
            email: this.email,
            password: this.password,
          }
          await this.$axios.$post('users/register', data)
          this.password = ''
          this.email = ''
          this.$refs.formUser.resetValidation()
          this.snackbar = true
          this.title = 'Usuario registrado'
          this.active = false
        }
      } catch (error) {
        const respuesta = error.response.data
        this.snackbar = true
        this.title = respuesta?.message || 'Ocurrio un error'
      }
      this.registerLoader = false
    },

    kE(e) {
      if (e.keyCode === 13) {
        this.saveUser()
      }
    },
    validateCorreo(v) {
      /* eslint-disable */
      let regex =
        /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/
      //return regex.test(v) || "Correo inválido.";
      return regex.test(v) || 'Correo inválido.'
    },
    required(name, string = true) {
      if (string) {
        return (value) => !!value || 'Debes ingresar un(a) ' + name + '.'
      }
      return (value) => value !== '' || 'Debes ingresar un(a) ' + name + '.'
    },
  },
}
</script>
<style lang="scss">
.title_dash {
  text-align: center;
  @media (max-width: 700px) {
    text-align: left !important;
  }
  @media (max-width: 450px) {
    font-size: 1.5em;
  }
}
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

.btn_logout {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 700px) {
    & .txt_btn {
      display: none;
    }
  }
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
.modal_default {
  background: white;
  padding: 10px;
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;
}
</style>
