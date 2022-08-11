<template>
  <v-container>
    <h1>Cadastro de Opções de Entrega</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="shippingOption.id"
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
              v-model="shippingOption.inactive"
              label="Inativar"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="shippingOption.description"
              placeholder="Descrição"
              label="Descrição"
              required
              :rules="rule"
              outlined
            />
          </v-col>
          <v-col>
            <v-select
              v-model="shippingOption.type"
              placeholder="Tipo"
              label="Tipo"
              required
              outlined
              :items="types"
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
        to="/admin/shipping-options"
      >
        Cancelar
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  
  name: 'shippingOptionsEditPage',

  data () {
    return {
      valid: false,
      shippingOption: {
        id: null,
        description: null,
        type: 'delivery',
        inactive: false
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      types: [
        { text: 'Entrega', value: 'delivery' },
        { text: 'Retirar na Loja', value: 'pickup' }
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

        let shippingOption = {
          description: this.shippingOption.description,
          inactive: this.shippingOption.inactive
        };

        let id = this.shippingOption.id || '';
        let response = await this.$api.post(`/shipping-options/persist/${id}`, shippingOption);
        if (response.type !== 'success') {
          return this.$toast.error(response.message);
        }
        this.$toast.success(response.message)
        return this.$router.push('/admin/shipping-options');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },

    async getById (id) {
      this.shippingOption = await this.$api.get(`/shipping-options/${id}`).then(res => res.data);
    }
  }
}
</script>