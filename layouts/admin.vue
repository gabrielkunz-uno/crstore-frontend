<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>CRStore Delivery App &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',

  data () {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Categorias',
          to: '/admin/categories'
        },
        {
          icon: 'mdi-account',
          title: 'Produtos',
          to: '/admin/items'
        },
        {
          icon: 'mdi-cart',
          title: 'Métodos de Pagamento',
          to: '/admin/payment-methods'
        },
        {
          icon: 'mdi-cart',
          title: 'Opções de Entrega',
          to: '/admin/shipping-options'
        },
        {
          icon: 'mdi-cart',
          title: 'Status de Pedido',
          to: '/admin/status'
        }
      ],
      title: 'CRStore - Admin'
    }
  },

  async created () {
    await this.validateLogin();
  },

  methods: {
    async validateLogin () {
      const token = localStorage.getItem('crstore-api-token') || '';
      let response = await this.$axios.$get('http://localhost:3333/users/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.type !== 'success' || response.data?.role !== 'admin') {
        this.$toast.info('Você não tem permissão para acessar esse recurso');
        return this.$router.push('/logout');
      } 
      this.items.push({
        icon: 'mdi-logout',
        title: 'Sair',
        to: '/logout'
      });
    }
  }
}
</script>
