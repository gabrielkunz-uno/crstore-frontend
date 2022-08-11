<template>
  
</template>

<script>
export default {
  name: 'LogoutPage',

  layout: 'login',

  data () {
    return {

    }
  },

  created () {
    localStorage.removeItem('crstore-api-token');
    this.$router.push('/');
    this.$toast.success('Logout realizado com sucesso')
  }
}
</script>

<style>

</style>