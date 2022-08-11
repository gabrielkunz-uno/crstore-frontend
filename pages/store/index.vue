<template>
  <v-container>
    <h1 
      @mouseenter="hover = !hover"
      @mouseleave="hover = !hover"
    >
      Pagina da Loja Aqui!
    </h1>
    <div v-if="hover">
      <v-btn>
        Carrinho
      </v-btn>
      <v-btn>
        LogOut
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'StoreIndexPage',

  data () {
    return {
      hover: false
    }
  }
}
</script>

<style>

</style>