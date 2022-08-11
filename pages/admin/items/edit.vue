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
          <v-col
            cols="3"
          >
            <v-switch
              v-model="item.promotional"
              label="Em promoção"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="item.stockAvailable"
              placeholder="Estoque"
              label="Estoque"
              required
              v-mask="['#.####', '##.####', '###.####', '####.####', '#####.####']"
              outlined
            />
          </v-col>
          <v-col
            cols="3"
          >
            <v-autocomplete
              v-model="item.categoryId"
              placeholder="Categoria"
              label="Categoria"
              required
              :items="categories"
              item-text="description"
              item-value="id"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="item.additionalInfo"
              placeholder="Observações"
              label="Observações"
              required
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-img 
              :src="item.imageURL"
              style="height: 300px; width: 300px; border: 1px solid white; border-radius: 5px;"
              alt="Imagem do Produto"
            ></v-img>
          </v-col>
          <v-col>
            <v-text-field
              v-model="item.imageURL"
              placeholder="URL Imagem"
              label="URL Imagem"
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
        inactive: false,
        price: null,
        promotional: false,
        promotionalPrice: null,
        stockAvailable: null,
        additionalInfo: null,
        imageURL: null,
        categoryId: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      categories: []
    }
  },

  created () {
    this.getCategories();
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
          inactive: this.item.inactive,
          price: this.item.price,
          promotional: this.item.promotional,
          promotionalPrice: this.item.promotionalPrice,
          stockAvailable: this.item.stockAvailable,
          additionalInfo: this.item.additionalInfo,
          imageURL: this.item.imageURL,
          categoryId: this.item.categoryId
        };

        let id = this.item.id || '';
        let response = await this.$api.post(`/items/persist/${id}`, item);
        if (response.type !== 'success') {
          return this.$toast.error(response.message);
        }
        this.$toast.success(response.message)
        return this.$router.push('/admin/items');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },

    async getById (id) {
      this.item = await this.$api.get(`/items/${id}`).then(res => res.data);
    },

    async getCategories() {
      this.categories = await this.$api.get('/categories').then(res => res.data)
    }
  }
}
</script>