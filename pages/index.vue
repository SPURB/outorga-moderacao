<template>
  <div class="indice">
    <template v-if="isReady">
      <h2>Selecione uma Operação Urbana</h2>
      <ul class="indice__list">
        <nuxt-link
          v-for="({ IdOperacaoUrbana, Nome }, index) in oucs"
          :key="index"
          :to="{
            path: '/quadro',
            query: {
              idopurbanasrc: IdOperacaoUrbana
            }
          }"
          class="indice__item"
          tag="li"
        >
          {{ Nome }}
        </nuxt-link>
      </ul>
    </template>
    <div v-else class="indice__preloader">
      <preloader-verticalizacao :stroke="'grey'" />
      <p class="indice__preloader-message">
        Aguarde... Carregando Operações Urbanas...
      </p>
    </div>
  </div>
</template>
<script>
import { PreloaderVerticalizacao } from '@spurb/componentes'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Indice',
  components: {
    PreloaderVerticalizacao
  },
  computed: {
    ...mapGetters('setores', ['oucs']),
    ...mapState('setores', ['fetching', 'error']),
    isReady () {
      return !this.fetching && !this.error
    }
  },
  created () {
    this.resetOuc()
    this.getSetores()
  },
  methods: {
    ...mapActions('setores', ['getSetores', 'resetOuc'])
  }
}
</script>
<style lang="scss" scoped>
.indice {
  padding: 1.75rem 3.25rem;
  line-height: 1.52;
  &__list {
    list-style: none;
    padding: 0;
  }
  &__item {
    background-color: grey;
    opacity: 0.9;
    padding: 1rem 0.5rem;
    margin: 1rem 0;
    border-radius: 8px;
    text-decoration: none;
    color: white;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  &__preloader {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 6;
  }
}
</style>
