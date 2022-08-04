<template>
  <v-container style="margin: auto;">
    <v-container style="padding: 15%; padding-left: 25%; padding-right: 25%;">
      <v-form v-model="valid">    
        <v-card
          elevation="2"
          outlined
          shaped
        >
          <v-card-title>
            Login
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="email"
                outlined
                label="E-mail"
                :rules="[rules.required, rules.email]"
              />
              <v-text-field
                v-model="password"
                outlined
                label="Senha"
                :rules="[rules.required]"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="toggleShowPassword"
              />
            </v-container>
          </v-card-text>
          <v-container style="text-align: center">
            <p>
              Ainda não tem uma conta? 
              <span 
                style="font-weight: bold; cursor: pointer;"
                @click="$router.push('/register')" 
              >
                Registre-se
              </span>
            </p>
            <v-btn
              outlined
              color="primary"
              x-large
              @click="login"
            >
              Login
            </v-btn>
          </v-container>
        </v-card>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'login',
  
  name: 'LoginPage',

  data () {
    return {
      valid: false,
      showPassword: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Esse campo é obrigatório',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'O e-mail não é válido'
        },
      }
    }
  },

  methods: {
    async login () {
      if (!this.valid) {
        return this.$toast.info('Informe seus dados para fazer login')
      }
      let user = {
        email: this.email,
        password: this.password
      };
      let response = await this.$api.post('/users/login', user)
      if (response.type !== 'success') {
        return this.$toast.error(response.message)
      }
      this.$toast.success(response.message)
      localStorage.setItem('crstore-api-token', response.token) 
    },

    toggleShowPassword () {
      this.showPassword = !this.showPassword
    },
  }
}
</script>

<style>

</style>