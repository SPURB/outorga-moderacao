<template>
  <!-- <div class="container"> -->
    <div v-if="isFetching" class="preloader"><h2>carregando...</h2></div>
    <vue-good-table
      v-else
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
        placeholder: 'Procure por qualquer valor ou clique no rótulo para ordenar',
      }"
      styleClass="vgt-table striped"
      @on-cell-click="onCellClick"
      @on-row-mouseenter="onRowMouseover"
      @on-row-mouseleave="onRowMouseleave"
    />
  <!-- </div> -->
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import axios from '~/plugins/axios'

export default {
  name: 'Index',
  components: {
    VueGoodTable
  },
  data () {
    return {
      columns: [
        {
          label: 'Id',
          field: 'Id',
          type: 'number'
        },
        {
          label: 'Status',
          field: 'IdStatus',
          type: 'number',
          formatFn: this.formatFnStatus
        },
        {
          label: 'Empresa',
          field: 'Empresa',
          type: 'string',
          thClass: 'width-restricted'
        },
        {
          label: 'Email',
          field: 'Email',
          type: 'string'
        },
        {
          label: 'Telefone',
          field: 'Telefone',
          type: 'string'
        },
        {
          label: 'Ar-nR¹',
          field: 'AreaAdNaoResidencial',
          type: 'number'
        },
        {
          label: 'Ar-R²',
          field: 'AreaAdResidencial',
          type: 'number'
        },
        {
          label: 'CEPACa-ad³',
          field: 'AreaAdResidencial',
          type: 'number'
        },
        {
          label: 'CEPAC-mu³',
          field: 'CepacModUso',
          type: 'number'
        },
        {
          label: 'Certidão',
          field: 'Certidao',
          type: 'string'
        },
        {
          label: 'Lic',
          field: 'Licenciamento',
          type: 'string'
        },
        {
          label: 'SEI',
          field: 'Sei',
          type: 'string'
        },
        {
          label: 'Setor',
          field: 'Setor',
          type: 'string'
        },
        {
          label: 'Sub setor',
          field: 'SubSetor',
          type: 'string'
        }
      ],
      isFetching: false,
      status: [],
      rows: []
    }
  },
  created () {
    this.apiGet('/filacepac/api/fila', 'rows')
    this.apiGet('/filacepac/api/status', 'status')
  },
  methods: {
    apiGet (path, dataKey) {
      this.isFetching = true
      axios.get(path)
        .then((res) => {
          this[dataKey] = res.data
        })
        .catch(err => console.log(err))
        .finally(() => { this.isFetching = false })
    },
    formatFnStatus (value) {
      if (!this.status) { return }
      const status = this.status.find(stat => stat.Id === value)
      return status.Nome
    },
    onCellClick (params) {
      // params.row - row object
      // params.column - column object
      // params.rowIndex - index of this row on the current page.
      // params.event - click event
      const id = this.rows[params.rowIndex].Id
      this.$router.push({ path: `/cadastro/${id}` })
    },
    onRowMouseover (params) {
      // params.row - row object
      // params.pageIndex - index of this row on the current page.
      document.body.style.cursor = 'pointer'
    },
    onRowMouseleave (row, pageIndex) {
      // row - row object
      // pageIndex - index of this row on the current page.
      document.body.style.cursor = 'default'
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
<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    max-width: 60px;
    max-height: 60px;
  }
}
td {
  max-width: 250px;
}
</style>
