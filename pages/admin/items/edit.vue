<template>
  <v-container>
    <h1>Cadastro de Produtos</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="item.id"
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
              v-model="item.inactive"
              label="Inativar"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="item.description"
              placeholder="Descrição"
              label="Descrição"
              required
              :rules="rule"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="item.price"
              placeholder="Preço"
              label="Preço"
              required
              v-mask="['#.##', '##.##', '###.##', '####.##', '#####.##']"
              outlined
            />
          </v-col>
          <v-col
            cols="3"
          >
            <v-switch
              v-model="item.promotional"
              label="Em promoção"
            ></v-switch>
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field
              :disabled="!item.promotional"
              v-model="item.promotionalPrice"
              placeholder="Preço promocional"
              label="Preço promocional"
              required
              v-mask="['#.##', '##.##', '###.##', '####.##', '#####.##']"
              outlined
            />
          </v-col>
        </v-row>
      </v-container>
        // description,
        // additionalInfo,
        // price, --
        // promotional,
        // promotionalPrice,
        // imageURL,
        // stockAvailable,
        // inactive,
        // categoryId
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
        to="/admin/items"
      >
        Cancelar
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  
  name: 'itemsEditPage',

  data () {
    return {
      valid: false,
      item: {
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

        let item = {
          description: this.item.description,
          inactive: this.item.inactive
        };

        let id = this.item.id || '';
        await this.$api.post(`/items/persist/${id}`, item);
        this.$toast.success('Cadastro realizado com sucesso!');
        return this.$router.push('/admin/items');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },

    async getById (id) {
      this.item = await this.$api.get(`/items/${id}`).then(res => res.data);
    }
  }
}
</script>