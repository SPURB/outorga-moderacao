<template>
  <div class="cadastro">
    <p>olar cadastro de id {{idCadastro}}</p>
  </div>
</template>
<script>
export default {
  name: 'Cadastro',
  computed: {
    idCadastro () { return parseInt(this.$route.params.id) }
  }
}
</script>
