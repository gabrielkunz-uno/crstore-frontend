<template>
  <v-container>
    <h1>Cadastro de Status do Pedido</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="status.id"
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
              v-model="status.inactive"
              label="Inativar"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="status.description"
              placeholder="Descrição"
              label="Descrição"
              required
              :rules="rule"
              outlined
            />
          </v-col>
          <v-col>
            <input
              type="color"
              v-model="status.color"
              required
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
        to="/admin/status"
      >
        Cancelar
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  
  name: 'StatusEditPage',

  data () {
    return {
      valid: false,
      status: {
        id: null,
        description: null,
        color: null,
        inactive: false
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
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

        let status = {
          description: this.status.description,
          inactive: this.status.inactive,
          color: this.status.color
        };

        let id = this.status.id || '';
        let response = await this.$api.post(`/status/persist/${id}`, status);
        if (response.type !== 'success') {
          return this.$toast.error(response.message);
        }
        this.$toast.success(response.message)
        return this.$router.push('/admin/status');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },

    async getById (id) {
      this.status = await this.$api.get(`/status/${id}`).then(res => res.data);
    }
  }
}
</script>