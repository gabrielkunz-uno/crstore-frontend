<template>
  <v-container>
    <h1>Cadastro de Métodos de Pagamento</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="paymentMethod.id"
              placeholder="Código"
              label="Código"
              disabled
              outlined
            />
          </v-col>
          <v-col
            cols="3"
          >
             <v-switch
              v-model="paymentMethod.inactive"
              label="Inativar"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="paymentMethod.description"
              placeholder="Descrição"
              label="Descrição"
              required
              :rules="rule"
              outlined
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container>
      <v-btn
        color="success"
        style="float: right;"
        large
        @click="persist"
      >
        Salvar
      </v-btn>
      <v-btn
        color="error"
        large
        to="/admin/payment-methods"
      >
        Cancelar
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  
  name: 'PaymentMethodsEditPage',

  data () {
    return {
      valid: false,
      paymentMethod: {
        id: null,
        description: null,
        inactive: false
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ]
    }
  },

  created () {
    if (this.$route?.params?.id) {
      this.getById(this.$route.params.id)
    }
  },

  methods: {
    async persist () {
      try {
        if (!this.valid) {
          return this.$toast.warning('Preencha todos os campos obrigatórios')
        }

        let paymentMethod = {
          description: this.paymentMethod.description,
          inactive: this.paymentMethod.inactive
        };

        let id = this.paymentMethod.id || '';
        let response = await this.$api.post(`/payment-methods/persist/${id}`, paymentMethod);
        if (response.type !== 'success') {
          return this.$toast.error(response.message);
        }
        this.$toast.success(response.message)
        return this.$router.push('/admin/payment-methods');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },

    async getById (id) {
      this.paymentMethod = await this.$api.get(`/payment-methods/${id}`).then(res => res.data);
    }
  }
}
</script>