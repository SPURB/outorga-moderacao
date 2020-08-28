<template>
  <div class="indice">
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
        >
          {{ Nome }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Indice',
  computed: {
    ...mapGetters('setores', [ 'oucs' ])
  },
  created () {
    this.getSetores()
  },
  methods: {
    ...mapActions('setores', [ 'getSetores' ])
  }
}
</script>
