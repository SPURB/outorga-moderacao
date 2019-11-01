<template>
  <div class="container">
    <header>
      <img src="~/assets/spurbanismo-logo_color.png" alt="">
      <h1>Controle Outorgas</h1>
    </header>
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
