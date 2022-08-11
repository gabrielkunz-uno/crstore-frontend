<template>
  <v-container>
    <h1>Consulta de Status do Pedido</h1>
    <hr>
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            large
            color="primary"
            @click="getStatus"
          >
            Pesquisar
            <v-icon style="margin-left: 5%">
              mdi-magnify
            </v-icon>
          </v-btn>
          <v-btn
            large
            color="success"
            to="status/edit"
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
        :items="status"
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

  name: 'StatusIndexPage',

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
      status: []
    }
  },

  created () {
    this.getStatus()
  },

  methods: {
    async getStatus () {
      this.status = await this.$api.get('/status').then(res => res.data);
    },

    async destroy (status) {
      try {
        if (confirm(`Deseja deletar o registro id ${status.id} - ${status.description}?`)) {
          let response = await this.$api.post('status/destroy', { id: status.id });
          this.$toast.success(response.message)
          this.getStatus();
        }
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async edit (status) {
      this.$router.push({
        name: 'admin-status-edit',
        params: { id: status.id }
      });
    }
  }
}
</script>