<template>
  <div class="index">
    <div v-if="isFetching" class="preloader">
      <h2>carregando...</h2>
    </div>
    <div v-if="displayError" class="error">
      <h3>{{ error }}</h3>
      <button @click="reloadApp">
        Tentar novamente
      </button>
    </div>
    <vue-good-table
      v-else
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
        placeholder: 'Procure por qualquer valor ou clique no rótulo para ordenar',
      }"
      :sort-options="{
        enabled: true,
        initialSortBy: [
          { field: 'Id', type: 'desc' },
          { field: 'Data', type: 'desc' }
        ]
      }"
      style-class="vgt-table striped condensed"
      @on-cell-click="onCellClick"
      @on-row-mouseenter="onRowMouseover"
      @on-row-mouseleave="onRowMouseleave"
    />
  </div>
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
          label: 'Interessado',
          field: 'Interessado',
          type: 'string'
        },
        {
          label: 'Data de criação',
          field: 'Data',
          type: 'string',
          formatFn: this.formatFmData
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
          label: 'SEI',
          field: 'Sei',
          type: 'string'
        },
        {
          label: 'Certidão',
          field: 'Certidao',
          type: 'string'
        },
        {
          label: 'Licenciamento',
          field: 'Licenciamento',
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
        },
        {
          label: 'Área Adicional Residencial',
          field: 'AreaAdResidencial',
          type: 'number'
        },
        {
          label: 'Área Adicional Não Residencial',
          field: 'AreaAdNaoResidencial',
          type: 'number'
        },
        {
          label: 'CEPAC Área Adicional',
          field: 'CEPAC Área Adicional',
          type: 'number'
        },
        {
          label: 'CEPAC Modo Uso',
          field: 'CepacModUso',
          type: 'number'
        },
        {
          label: 'Operacão Urbana',
          field: 'Operacao Urbana',
          type: 'string'
        },
        {
          label: 'CEPAC Objeto',
          field: 'CepacObjeto',
          type: 'string'
        },
        {
          label: 'Situação',
          field: 'Status',
          type: 'string',
          formatFn: this.formatStatus,
          sortable: false
        }
      ],
      isFetching: false,
      status: [],
      rows: [],
      error: ''
    }
  },
  computed: {
    displayError () { return this.error !== '' }
  },
  asyncData () {
    return axios.get('/filacepac/api/fila')
      .then((res) => {
        return { rows: res.data }
      })
      .catch((e) => {
        return { error: 'Erro' }
      })
  },
  methods: {
    reloadApp () { window.location.reload(true) },
    formatStatus (statusObj) { return statusObj.Nome },
    formatFmData (str) { return str.replace('T', ' ') },
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
      // title: 'SP Urbanismo | Moderção de CEPAC',
      // meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  }
}
</script>
<style lang="scss">
</style>
