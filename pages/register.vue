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
            Registrar
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="user.email"
                outlined
                label="E-mail"
                prepend-inner-icon="mdi-email"
                :rules="[rules.required, rules.email]"
              />
              <v-text-field
                v-model="user.name"
                outlined
                label="Nome"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="user.phone"
                outlined
                label="Telefone"
                prepend-inner-icon="mdi-phone"
                v-mask="['(##) ####-####', '(##) #####-####']"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="user.password"
                outlined
                label="Senha"
                :rules="[rules.required]"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="toggleShowPassword"
              />
              <v-text-field
                v-model="user.confirmPassword"
                outlined
                label="Confirmação da Senha"
                :rules="[rules.required, rules.passwordMatch]"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="toggleShowPassword"
              />
            </v-container>
          </v-card-text>
          <v-container style="text-align: center">
            <p>
              Já tem uma conta?
              <span 
                style="font-weight: bold; cursor: pointer;"
                @click="$router.push('/')" 
              >
                Fazer login
              </span>
            </p>
            <v-btn
              outlined
              color="primary"
              x-large
              @click="register"
            >
              Registrar
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
      showPassword: false,
      valid: false,
      user: {
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        name: ''
      },
      rules: {
        required: value => !!value || 'Esse campo é obrigatório',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'O e-mail não é válido'
        },
        passwordMatch: value => value === this.user.password || 'As senhas devem ser iguais'
      }
    }
  },

  methods: {
    async register () {
      if (!this.valid) {
        return this.$toast.info('Informe seus dados para fazer criar a conta')
      }
      let user = {
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        phone: this.user.phone
      };
      let response = await this.$api.post('/users/register', user)
      if (response.type !== 'success') {
        return this.$toast.error(response.message)
      }
      this.$toast.success(response.message)
      this.$router.push('/');
    },

    toggleShowPassword () {
      this.showPassword = !this.showPassword
    },
  }
}
</script>

<style>

</style>