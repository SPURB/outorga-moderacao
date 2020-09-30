<template>
  <div class="indice">
    <template v-if="isReady">
      <h2>Selecione uma Operação Urbana</h2>
      <ul class="indice__list">
        <li v-for="({ IdOperacaoUrbana, Nome }, index) in oucs" :key="index">
          <nuxt-link
            :to="{
              path: '/quadro',
              query: {
                idopurbanasrc: IdOperacaoUrbana
              }
            }"
            tag="a"
            class="indice__item"
          >
            {{ Nome }}
          </nuxt-link>
        </li>
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
import PreloaderVerticalizacao from '~/components/PreloaderVerticalizacao'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Indice',
  components: {
    PreloaderVerticalizacao
  },
  computed: {
    ...mapGetters('setores', [ 'oucs' ]),
    ...mapState('setores', [ 'fetching', 'error' ]),
    isReady () {
      return !this.fetching && !this.error
    }
  },
  created () {
    this.getSetores()
  },
  methods: {
    ...mapActions('setores', [ 'getSetores' ])
  }
}
</script>
<style lang="scss">
.indice {
  padding: 1.75rem 3.25rem;
  line-height: 1.52;
  &__list {
    list-style: none;
    padding: 0
  }
  &__preloader {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 6;
  }
}
</style>
