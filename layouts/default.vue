<template>
  <div class="container">
    <header>
      <section class="header__top">
        <router-link to="/">
          <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
        </router-link>
        <p v-if="ouc">
          {{ ouc.Nome }}
        </p>
        <user-profile />
      </section>
      <h1>Controle Outorgas</h1>
    </header>
    <nuxt id="main" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoSpurb from '~/components/icons/LogoSpurb'
import UserProfile from '~/components/UserProfile'

export default {
  name: 'Default',
  components: {
    LogoSpurb,
    UserProfile
  },
  computed: {
    ...mapGetters('setores', ['oucs']),
    ouc () {
      if (!this.oucs.length) { return {} }
      const { idopurbanasrc } = this.$route.query
      return this.oucs.find(({ IdOperacaoUrbana }) => parseInt(IdOperacaoUrbana) === parseInt(idopurbanasrc))
    }
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
