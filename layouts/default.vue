<template>
  <div class="container">
    <nuxt id="main" />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'SP Urbanismo | Moderção de CEPAC',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  }
}
</script>
