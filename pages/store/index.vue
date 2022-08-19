<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col v-for="item in items" :key="item.id" cols="4">
          <v-card>
            <v-card-text>
              <v-img :src="item.imageURL" width="150" height="150"></v-img>
              <h1 class="mt-5">{{ item.description }}</h1>
              <h2 class="mt-2" v-if="item.promotional">
                <span style="text-decoration: line-through;">{{ `de R$ ${item.price}` }}</span> por R$ {{ item.promotionalPrice }}
              </h2>
              <h2 class="mt-2" v-if="!item.promotional">
                <span>{{ `R$ ${item.price}` }}</span>
              </h2>
              <h3> Quantidade disponível: {{ item.stockAvailable }}</h3>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="item.cartAmount"
                      solo
                      v-mask="['#.####', '##.####', '###.####', '####.####', '#####.####']"
                      label="Quantidade"
                    />
                  </v-col>
                  <v-col>
                    <v-btn
                      fab
                      @click="addToCart(item)"
                    >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "StoreIndexPage",

  data() {
    return {
      items: []
    };
  },

  created() {
    this.getItems()
  },

  methods: {
    async getItems() {
      try {
        this.items = await this.$api.get('/items').then(resp => resp.data)
      } catch (error) {
        return this.$toast.error(error.message)
      }
    },

    async addToCart(item) {
      try {
        if (!item.cartAmount || item.cartAmount == 0) {
          return this.$toast.info('Informe a quantidade')
        }

        if (Number(item.stockAvailable) < Number(item.cartAmount)) {
          return this.$toast.warning('Tá na fartura')
        }

        try {
        let response = await this.$api.post('/cart/add', {
          itemId: item.id,
          amount: item.cartAmount
        });
        if (response.type !== 'success') {
          return this.$toast.error(response.message);
        }
        this.$toast.success(response.message);
        this.getItems();
      } catch (error) {
        return this.$toast.error(error.message);
      }
      } catch (error) {
        return this.$toast.error(error.message)
      }
    }
  }
};
</script>

<style>
</style>