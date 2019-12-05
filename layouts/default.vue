<template>
  <div class="container">
    <header>
      <router-link to="/">
        <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
      </router-link>
      <h1>Controle Outorgas</h1>
    </header>
    <nuxt id="main" />
  </div>
</template>

<script>
import LogoSpurb from '~/components/icons/LogoSpurb'
export default {
  name: 'OutorgaModeracao',
  components: { LogoSpurb },
  head () {
    return {
      title: 'SP Urbanismo | Moderção de CEPAC',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  .logo {
    width: 151px;
    margin-left: 22px
  }
}
</style>
