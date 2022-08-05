<template>
  <v-container>
    <h1>Consulta de Categorias</h1>
    <hr>
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            large
            color="primary"
            @click="getCategories"
          >
            Pesquisar
            <v-icon style="margin-left: 5%">
              mdi-magnify
            </v-icon>
          </v-btn>
          <v-btn
            large
            color="success"
            to="categories/edit"
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
        :items="categories"
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

  name: 'CategoriesIndexPage',

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
      categories: []
    }
  },

  created () {
    this.getCategories()
  },

  methods: {
    async getCategories () {
      this.categories = await this.$api.get('/categories').then(res => res.data);
    },

    async destroy (categorie) {
      try {
        if (confirm(`Deseja deletar o registro id ${categorie.id} - ${categorie.description}?`)) {
          let response = await this.$api.post('categories/destroy', { id: categorie.id });
          this.$toast.success(response.message)
          this.getCategories();
        }
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async edit (categorie) {
      this.$router.push({
        name: 'admin-categories-edit',
        params: { id: categorie.id }
      });
    }
  }
}
</script>