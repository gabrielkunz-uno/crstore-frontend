<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col v-for="item in items" :key="item.id" cols="12">
          <v-card>
            <v-card-text>
              <v-img :src="item.item.imageURL" width="150" height="150"></v-img>
              <h1 class="mt-5">{{ item.item.description }}</h1>
              <h2 class="mt-2">{{ item.item.promotional ? `R$ ${item.item.promotionalPrice}` : `R$ ${item.item.price}` }}</h2>
              <h2 class="mt-2">{{ item.amount }}</h2>
              <span v-if="Number(item.item.stockAvailable) < Number(item.amount)" style="color: red">Não temos tudo isso ai!</span>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      v-model="item.removeAmount"
                      solo
                      v-mask="['#.####', '##.####', '###.####', '####.####', '#####.####']"
                      label="Quantidade"
                    />
                  </v-col>
                  <v-col>
                    <v-btn
                      @click="removeFromCart(item)"
                    >
                      Remove
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
  name: "CartPage",

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
        this.items = await this.$api.get('/cart').then(resp => resp.data)
      } catch (error) {
        return this.$toast.error(error.message)
      }
    },

    async removeFromCart (item) {
      try {
        let response = await this.$api.post('/cart/remove', {
          itemId: item.item.id,
          amount: item.removeAmount
        });
        if (response.type !== 'success') {
          return this.$toast.error(response.message);
        }
        this.$toast.success(response.message);
        this.getItems();
      } catch (error) {
        return this.$toast.error(error.message);
      }
    }
  }
}
</script>

<style>

</style>