<template>
  <div class="indice">
    <h2>Selecione uma Operação Urbana</h2>
    <ul v-if="isReady" class="indice__list">
      <li v-for="({ IdOperacaoUrbana, Nome }, index) in oucs" :key="index">
        <nuxt-link
          :to="{
            path: '/quadro',
            query: {
              idopurbanasrc: IdOperacaoUrbana
            }
          }"
          tag="a"
        >
          {{ Nome }}
        </nuxt-link>
      </li>
    </ul>
    <p v-else-if="fetching">Carregando Operações Urbanas...</p>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Indice',
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
