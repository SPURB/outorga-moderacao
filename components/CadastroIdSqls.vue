<template>
  <div class="cadastro-id-sqls modal">
    <button @click="cancel">
      Cancelar
    </button>
    <div class="cadastro-id-sqls-container">
      {{ sqls }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'CadastroIdSqls',
  props: {
    sqls: {
      type: Array,
      required: true
    }
  },
  methods: {
    cancel () {
      this.$emit('fechar')
    }
  }
}
</script>
<style scss scoped>
.cadastro-id-sqls-container {
  background-color: #fff;
  max-width: 90vw
}
</style>
