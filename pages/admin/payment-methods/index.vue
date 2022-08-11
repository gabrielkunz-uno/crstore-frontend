<template>
  <v-container>
    <h1>Consulta de Métodos de Pagamento</h1>
    <hr>
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            large
            color="primary"
            @click="getPaymentMethods"
          >
            Pesquisar
            <v-icon style="margin-left: 5%">
              mdi-magnify
            </v-icon>
          </v-btn>
          <v-btn
            large
            color="success"
            to="payment-methods/edit"
          >
            Cadastrar
            <v-icon style="margin-left: 5%">
              mdi-plus-circle-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="paymentMethods"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="edit(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="destroy(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',

  name: 'PaymentMethodsIndexPage',

  data () {
    return {
      headers: [
        {
          text: 'Código',
          align: 'center',
          sortable: true,
          value: 'id',
        },
        {
          text: 'Descrição',
          align: 'center',
          sortable: false,
          value: 'description',
        },
        { text: "", value: "actions" }
      ],
      paymentMethods: []
    }
  },

  created () {
    this.getPaymentMethods()
  },

  methods: {
    async getPaymentMethods () {
      this.paymentMethods = await this.$api.get('/payment-methods').then(res => res.data);
    },

    async destroy (paymentMethod) {
      try {
        if (confirm(`Deseja deletar o registro id ${paymentMethod.id} - ${paymentMethod.description}?`)) {
          let response = await this.$api.post('payment-methods/destroy', { id: paymentMethod.id });
          this.$toast.success(response.message)
          this.getPaymentMethods();
        }
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async edit (paymentMethod) {
      this.$router.push({
        name: 'admin-payment-methods-edit',
        params: { id: paymentMethod.id }
      });
    }
  }
}
</script>