<template>
  <v-container>
    <h1>Consulta de Produtos</h1>
    <hr>
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            large
            color="primary"
            @click="getItems"
          >
            Pesquisar
            <v-icon style="margin-left: 5%">
              mdi-magnify
            </v-icon>
          </v-btn>
          <v-btn
            large
            color="success"
            to="items/edit"
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
        :items="items"
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
        <template v-slot:item.price="{ item }">
          {{ item.promotional ? item.promotionalPrice : item.price }}
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',

  name: 'ItemsIndexPage',

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
        {
          text: 'Preço',
          align: 'center',
          sortable: false,
          value: 'price'
        },
        { text: "", value: "actions" }
      ],
      items: []
    }
  },

  created () {
    this.getItems()
  },

  methods: {
    async getItems () {
      this.items = await this.$api.get('/items').then(res => res.data);
    },

    async destroy (item) {
      try {
        if (confirm(`Deseja deletar o registro id ${item.id} - ${item.description}?`)) {
          let response = await this.$api.post('items/destroy', { id: item.id });
          this.$toast.success(response.message)
          this.getItems();
        }
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async edit (item) {
      this.$router.push({
        name: 'admin-items-edit',
        params: { id: item.id }
      });
    }
  }
}
</script>