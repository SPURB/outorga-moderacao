<template>
  <div class="cadastro">
    <p>{{ fila }}</p>
  </div>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  name: 'Cadastro',
  data () {
    return {
      isFetching: false,
      fila: {}
    }
  },
  asyncData: ({ params }) => axios.get(`/filacepac/api/fila/${params.id}`)
    .then((res) => { return { fila: res.data } })
    .catch((e) => { return { error: e } })
}
</script>
