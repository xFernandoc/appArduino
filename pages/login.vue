<template>
  <div class="login_container">
    <div class="box_login">
      <h2 class="text-center">INICIO DE SESIÓN</h2>
      <v-form class="mt-4 frm_login" ref="form_login">
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
        >
        </v-text-field>
        <div class="text-center button_login">
          <v-btn class="white--text" :disabled='cargaLogin' @click="login">Ingresar</v-btn>
        </div>
      </v-form>
    </div>
    
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
export default {
  auth: 'guest',
  name: 'LoginPage',
  layout(context) {
    return 'login'
  },
  data: () => ({
    show1: false,
    email: '',
    password: '',
    snackbar : false,
    title : '',
    cargaLogin : false
  }),
  methods: {
    kE(e) {
      if (e.keyCode === 13) {
        this.login()
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
    async login() {
      this.cargaLogin = true
      if (this.$refs.form_login.validate()) {
        try {
          //login
          const loginAuth = await this.$auth.loginWith('local', { data: {
            email : this.email,
            password : this.password
          } })
          this.snackbar = true
          try {
            if (!loginAuth.data.token) {
              this.title = 'Credenciales incorrectas'
            }else{
              this.title = 'Bienvenido'
            }
          } catch (e) {
            this.title = 'Ocurrio un error'
          }
        } catch (e) {
          this.snackbar = true
          this.title= 'Ocurrio un error'
        }
      }
      this.cargaLogin = false
    },
  },
  mounted (){
    console.log(this.$auth);
  }
}
</script>

<style lang="scss">
.login_container {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgb(164 245 206) 0%,
    rgb(158 224 238) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  & .box_login {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    min-width: 40%;
    margin: auto;
    box-shadow: rgb(147 207 218) 0px 5px 15px;
    & h2 {
      color: #3d6369;
    }
    & .frm_login {
      width: 80%;
      margin: auto;
    }
    & .button_login {
      & button {
        box-shadow: none !important;
        background-color: #4c7c86;
        padding: 20px 30px;
        & span {
          text-transform: capitalize;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
