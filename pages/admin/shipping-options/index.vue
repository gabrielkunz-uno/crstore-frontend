<template>
  <v-container>
    <h1>Consulta de Opções de Entrega</h1>
    <hr>
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            large
            color="primary"
            @click="getShippingOptions"
          >
            Pesquisar
            <v-icon style="margin-left: 5%">
              mdi-magnify
            </v-icon>
          </v-btn>
          <v-btn
            large
            color="success"
            to="shipping-options/edit"
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
        :items="shippingOptions"
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

  name: 'ShippingOptionsIndexPage',

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
      shippingOptions: []
    }
  },

  created () {
    this.getShippingOptions()
  },

  methods: {
    async getShippingOptions () {
      this.shippingOptions = await this.$api.get('/shipping-options').then(res => res.data);
    },

    async destroy (shippingOption) {
      try {
        if (confirm(`Deseja deletar o registro id ${shippingOption.id} - ${shippingOption.description}?`)) {
          let response = await this.$api.post('shipping-options/destroy', { id: shippingOption.id });
          this.$toast.success(response.message)
          this.getShippingOptions();
        }
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async edit (shippingOption) {
      this.$router.push({
        name: 'admin-shipping-options-edit',
        params: { id: shippingOption.id }
      });
    }
  }
}
</script>