<template>
  <div class="container">
    <header>
      <section class="header__top">
        <router-link to="/">
          <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
        </router-link>
        <user-profile />
      </section>
      <h1>Controle Outorgas</h1>
    </header>
    <nuxt id="main" />
  </div>
</template>

<script>
import LogoSpurb from '~/components/icons/LogoSpurb'
import UserProfile from '~/components/UserProfile'

export default {
  name: 'OutorgaModeracao',
  components: {
    LogoSpurb,
    UserProfile
  },
  head () {
    return {
      title: 'SP Urbanismo | Moderção de CEPAC',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  }
}
</script>
<style lang="scss" scoped>
.header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  .logo {
    width: 151px;
  }
}
</style>
