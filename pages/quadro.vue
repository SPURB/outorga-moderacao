<template>
  <div class="index">
    <voltar class="voltar" to="/" />
    <div :class="{ faded: !isFetching }" class="preloader">
      <h2>Carregando</h2>
    </div>
    <div v-if="displayError" class="error">
      <h2>Erro</h2>
      <p>{{ error }}</p>
      <button @click="reloadApp">
        <span>&#8635;</span>
        Tentar novamente
      </button>
    </div>
    <div v-else class="tabela">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true,
          placeholder:
            'Digite e aperte Enter. Para reiniciar deixe em branco e aperte enter',
          trigger: 'enter'
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: [
            { field: 'Id', type: 'asc' },
            { field: 'Data', type: 'asc' }
          ]
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          nextLabel: 'Próximo',
          prevLabel: 'Anterior',
          rowsPerPageLabel: 'Mostrar',
          ofLabel: 'de',
          allLabel: 'Todos'
        }"
        @on-cell-click="onCellClick"
      />

      <footer class="actions">
        <button @click.prevent="$router.push('cadastro/criar')">
          <span>+</span> Criar novo registro
        </button>
        <button
          @click.prevent="
            saveTable(addDateToFileName('outorga-ouc-faria-lima.json'), rows)
          "
        >
          <span style="font-size: 0.8rem">{ }</span>
          Salvar como .json
        </button>
        <button
          @click.prevent="
            saveTable(addDateToFileName('outorga-ouc-faria-lima.csv'), rows)
          "
        >
          <span style="font-size: 0.8rem">&boxplus;</span>
          Salvar como .csv
        </button>
      </footer>
      <user-auth v-if="requestAuth" />
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import FileSaver from 'file-saver'
import { mapGetters } from 'vuex'
import UserAuth from '~/components/UserAuth'
import { formApi } from '~/plugins/axios'
import Voltar from '~/components/Voltar'

export default {
  name: 'Index',
  components: {
    VueGoodTable,
    UserAuth,
    Voltar
  },
  data () {
    return {
      columns: [
        {
          label: 'ID',
          field: 'Id',
          type: 'number'
        },
        {
          label: 'Interessado',
          field: 'Interessado',
          type: 'string'
        },
        {
          label: 'Tipo de pedido',
          field: 'TipoPedido',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'Situação',
          field: 'Status',
          type: 'string',
          formatFn: this.formatStatus,
          sortable: false,
          globalSearchDisabled: true
        },
        {
          label: 'Id Status',
          field: 'IdStatus',
          type: 'number',
          hidden: true,
          globalSearchDisabled: true
        },
        {
          label: 'E-mail',
          field: 'Email',
          type: 'string'
        },
        {
          label: 'Telefone',
          field: 'Telefone',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'Data de criação',
          field: 'Data',
          type: 'string',
          formatFn: this.formatFmData,
          globalSearchDisabled: true
        },
        {
          label: 'PA/SEI',
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
          label: 'Operacão Urbana',
          field: 'SetorObj',
          type: 'string',
          formatFn: this.formatOperacaoUrbana,
          globalSearchDisabled: true
        },
        {
          label: 'Setor',
          field: 'SetorObj',
          type: 'string',
          formatFn: this.formatSetor,
          globalSearchDisabled: true
        },
        {
          label: 'Subsetor',
          field: 'SubSetor',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'Endereço',
          field: 'Endereco',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'Área Real do Terreno',
          field: 'AreaTerreno',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'Área de Registro do Terreno',
          field: 'AreaRegistro',
          type: 'number',
          globalSearchDisabled: true
        },
        {
          label: 'Zona',
          field: 'Zona',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'Uso',
          field: 'Uso',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'C.A. do Projeto',
          field: 'CAProjeto',
          type: 'string',
          globalSearchDisabled: true
        },
        {
          label: 'Área adicional (residencial)',
          field: 'AreaAdResidencial',
          type: 'number',
          globalSearchDisabled: true
        },
        {
          label: 'Área adicional (não residencial)',
          field: 'AreaAdNaoResidencial',
          type: 'number',
          globalSearchDisabled: true
        },
        {
          label: 'CEPAC - Área adicional',
          field: 'CepacAreaAdicional',
          type: 'number',
          globalSearchDisabled: true
        },
        {
          label: 'CEPAC - Parâmetros',
          field: 'CepacModUso',
          type: 'number',
          globalSearchDisabled: true
        },
        {
          label: 'Código da Proposta',
          field: 'CodigoProposta',
          type: 'String',
          globalSearchDisabled: true
        },
        {
          label: 'Observações',
          field: 'Obs',
          type: 'String',
          globalSearchDisabled: true
        }
      ],
      isFetching: false,
      status: [],
      rows: [],
      error: ''
    }
  },
  computed: {
    ...mapGetters(['requestAuth']),
    displayError () {
      return this.error !== ''
    }
  },
  created () {
    const { idopurbanasrc } = this.$route.query
    const oucFilter = idopurbanasrc ? `idopurbanasrc=${idopurbanasrc}` : ''
    const filters = this.fetchFilterString(this.$route.query, this.columns)

    filters
      ? this.fetchData(`fila${filters}&${oucFilter}`)
      : this.fetchData(`fila?${oucFilter}`)
  },
  methods: {
    addDateToFileName (name) {
      const nameSplit = name.split('.') // ['name', 'extension']
      const d = new Date()
      const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}_${d.getHours()}h${d.getMinutes()}`
      nameSplit.splice(nameSplit.length - 1, 0, dateStr)
      return nameSplit.join('.')
    },
    saveTable (name, content) {
      const nameSplit = name.split('.')
      const type = nameSplit[nameSplit.length - 1] // 'json' ou 'csv'
      if (type === 'json') {
        const jsonBlob = new Blob([JSON.stringify(content)], {
          type: 'text/json; charset=utf-8'
        })
        FileSaver.saveAs(jsonBlob, name)
      } else if (type === 'csv') {
        const csvBlob = new Blob([this.convertToCSV(content)], {
          type: 'text/csv; charset=utf-8'
        })
        FileSaver.saveAs(csvBlob, name)
      } else {
        throw new Error(`${type} não é um formato válido para conversão`)
      }
    },
    convertToCSV (objArray) {
      const array =
        typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
      let str = `${Object.keys(objArray[0]).join(',')}\r\n` // header vem do primeiro objeto

      array.forEach(obj => {
        let line = ''
        for (const key in obj) {
          if (line !== '') {
            line += ','
          }
          line += obj[key]
        }
        str += `${line}\r\n`
      })
      return str
    },
    fetchData (path) {
      this.isFetching = true
      formApi
        .get(path)
        .then(res => {
          const resIsArray =
            Object.prototype.toString.call(res.data) === '[object Array]'
          if (resIsArray) {
            this.rows = res.data
          } else {
            this.rows.push(res.data)
          }
        })
        .catch(e => {
          this.error = e
        })
        .then(() => {
          this.isFetching = false
        })
    },
    fetchFilterString (queries, columns) {
      if (Object.keys(queries).length === 0) {
        return false
      } // no queries
      const filters = []
      const isValidQuery = (queryKey, columns) => {
        return columns.map(column => column.field).includes(queryKey)
      }
      for (const key in queries) {
        if (isValidQuery(key, columns)) {
          const concat = `${key}=${queries[key]}`
          filters.push(concat)
        }
      }
      if (filters.length) {
        return `?${filters.join('/')}` // algo como -> ?Id=1/SubSetor=99
      } else {
        return false
      }
    },
    reloadApp () {
      window.location.reload(true)
    },
    formatStatus (statusObj) {
      return statusObj.Nome
    },
    formatSetor (setorObj) {
      return setorObj.Nome
    },
    formatOperacaoUrbana (setorObj) {
      return setorObj.OperacaoUrbana.Nome
    },
    formatFmData (str) {
      return str.replace('T', ', ')
    },
    onCellClick (params) {
      if (params.column.field === 'Id') {
        const id = params.row.Id
        const idopurbanasrc = this.$route.query.idopurbanasrc

        this.$router.push({
          path: `/cadastro/${id}`,
          query: {
            idopurbanasrc
          }
        })
      } else if (
        !window.getSelection().toString() &&
        params.event.target.nodeName === 'SPAN'
      ) {
        const tip = document.createElement('span')
        tip.classList.add('tip')
        tip.textContent = params.column.label
        tip.style.top = params.event.pageY + 'px'
        tip.style.left = params.event.pageX + 'px'
        document.getElementById('main').appendChild(tip)
      }
    }
  }
}
</script>
<style lang="scss">
.index {
  .voltar {
    width: 100%;
  }
  .preloader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background-color: #008375;
    color: #fff;
    transition: all ease-in 0.25s 0.15s;
    h2 {
      font-size: 1rem;
      font-weight: normal;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.36);
      transition: all ease-out 0.4s;
      user-select: none;
    }
    &.faded {
      opacity: 0.5;
      max-height: 0;
      h2 {
        opacity: 0;
      }
    }
  }
  .error {
    padding: 2rem 3.25rem;
    h2 {
      color: #eb5757;
      font-size: 1.5rem;
    }
    p {
      font-size: small;
      color: #bdbdbd;
    }
    button {
      margin: 2rem 0 0;
      padding: 1.5rem 1.75rem 1.6rem;
      background-color: #005249;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.25rem;
      font-family: inherit;
      font-size: 1rem;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.36);
      cursor: pointer;
      transition: all ease-out 0.1s;
      span {
        font-size: 1.25rem;
        line-height: 1.6rem;
      }
      &:hover {
        background-color: #008375;
      }
    }
  }
  div.tabela {
    .vgt-global-search {
      padding: 2rem 3.25rem;
      background-color: #005249;
      z-index: 1;
      &::before {
        content: '⌕';
        font-size: 1.5rem;
        position: absolute;
        line-height: 1.75rem;
        color: #fff;
      }
      input {
        font-family: inherit;
        font-size: 1rem;
        width: 100%;
        padding: 0 0 0.5rem 1.5rem;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background-color: transparent;
        color: #fff;
        transition: border ease-in 0.2s;
        &:focus {
          border-bottom-color: #fff;
        }
        &::-webkit-input-placeholder {
          opacity: 1;
        }
        &::-moz-placeholder {
          opacity: 1;
        }
        &:-moz-placeholder {
          opacity: 1;
        }
        &:-ms-input-placeholder {
          opacity: 1;
        }
      }
    }
    .vgt-responsive {
      width: calc(100% - 3.25rem);
      overflow-x: scroll;
      overflow-y: visible;
      margin-left: 3.25rem;
      table {
        border-collapse: separate;
        border-spacing: 0;
        @media (min-width: 1200px) {
          tbody:hover td {
            color: #bdbdbd;
          }
          tr:hover td {
            color: initial;
          }
        }
        thead tr th:first-child:not([colspan]),
        tbody tr td:first-child:not([colspan]) {
          position: absolute;
          left: 0;
          width: 3.25rem !important;
          text-align: center;
        }
        tbody tr td:first-child:not([colspan]) {
          padding: 0.5rem;
          span {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            padding: calc(0.25rem - 2px) calc(0.5rem - 2px);
            background-color: #005249;
            border-radius: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.48);
            line-height: calc(16px * 1.6);
            font-size: 0.7rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.48);
            transition: all ease-out 0.1s;
            &::after {
              position: absolute;
              width: 100%;
              left: 0;
              top: calc(50% - 2px);
              transform: translateY(-50%) scale(0.75, 1.25);
              content: '→';
              letter-spacing: -13px;
              opacity: 0;
              font-size: 1.25rem;
              transition: all ease-out 0.2s;
            }
            &:hover {
              background-color: #008375;
              color: transparent;
              text-shadow: none;
              &::after {
                letter-spacing: 0;
                opacity: 1;
                color: #fff;
              }
            }
          }
        }
        thead tr th:nth-child(2):not([colspan]),
        tbody tr td:nth-child(2):not([colspan]) {
          padding-left: 0;
        }
        thead tr th:last-child:not([colspan]),
        tbody tr td:last-child:not([colspan]) {
          padding-right: 3.25rem;
        }
        thead tr th {
          background-color: #d5d5d5;
          text-align: left;
          user-select: none;
          -moz-user-select: none;
          &:hover {
            cursor: pointer;
          }
          span::after {
            content: '↓';
            color: transparent;
            font-size: 0;
            vertical-align: 2px;
            font-weight: normal;
            margin-left: 0;
            transition: all ease-out 0.2s;
          }
          &.sorting {
            span::after {
              color: #000;
              font-size: 0.75rem;
              margin-left: 0.125rem;
            }
            &.sorting-desc {
              span::after {
                content: '↑';
              }
            }
          }
        }
        tbody tr:nth-child(2n) td {
          background: #f5f5f5;
        }
        tbody tr td:last-child span {
          display: block;
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        th,
        td {
          white-space: nowrap;
          padding: 0 1rem;
          transition: all ease-in-out 0.1s;
          span {
            display: inline-block;
            padding: 0.75rem 0;
          }
          &[colspan] {
            padding: 1rem 0;
            @keyframes slideup {
              0% {
                transform: translateY(2rem) translateX(-50%);
                opacity: 0;
              }
              10% {
                transform: translateY(0rem) translateX(-50%);
                opacity: 1;
              }
              80% {
                transform: translateY(0rem) translateX(-50%);
                opacity: 1;
              }
              100% {
                transform: translateY(2rem) translateX(-50%);
                opacity: 0;
              }
            }
            div {
              position: absolute;
              bottom: 2rem;
              left: 50%;
              transform: translateY(2rem) translateX(-50%);
              padding: 1rem 1.5rem 1rem 1rem;
              color: #fff;
              font-size: 1.5rem;
              text-align: center;
              display: inline-block;
              background-color: #008375;
              border-radius: 0.5rem;
              opacity: 0;
              animation: slideup ease-in-out 4s;
              &:before {
                content: '⊘';
              }
            }
          }
        }
      }
    }
    .vgt-wrap__footer {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 3.25rem 0;
      background-color: #005249;
      .footer__row-count {
        line-height: 1.2;
        padding: 1rem 1.25rem;
        background-color: rgba(255, 255, 255, 0.04);
        border-radius: 0.25rem;
        color: #fff;
        order: 2;
        select {
          font-family: inherit;
          font-size: inherit;
          color: #005249;
          border: 0;
          background-color: #fff;
          margin-left: 0.75rem;
        }
      }
      .footer__navigation {
        order: 1;
        white-space: nowrap;
        box-sizing: border-box;
        color: #fff;
        a.footer__navigation__page-btn {
          display: inline-block;
          padding: 1rem 1.25rem;
          background-color: rgba(255, 255, 255, 0.04);
          border-radius: 0.25rem;
          text-decoration: none;
          text-align: center;
          transition: all ease-out 0.1s;
          color: inherit;
          font-size: 1rem;
          line-height: 1.2;
          user-select: none;
          -moz-user-select: none;
          &:first-child {
            margin-right: 0.5rem;
          }
          &:last-child {
            margin-left: 0.5rem;
          }
          &:hover {
            background-color: #008375;
          }
          &.disabled {
            background-color: transparent;
            color: transparent;
            max-width: 0;
            cursor: default;
            padding: 0;
            margin: 0;
          }
        }
        .footer__navigation__info {
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.08);
          padding: 1rem 1.25rem;
          line-height: 1.2;
          border-radius: 0.25rem;
        }
      }
    }
  }
  footer {
    background-color: #005249;
    padding: 2rem 3.25rem 0;
    button {
      margin: 0 2rem 2rem 0;
      &:last-child {
        margin-right: 0;
      }
      border: 0;
      padding: 1rem 1.25rem;
      background-color: rgba(255, 255, 255, 0.04);
      border-radius: 0.25rem;
      font-family: inherit;
      color: #fff;
      font-size: initial;
      cursor: pointer;
      transition: all ease-out 0.2s;
      &:hover {
        background-color: #008375;
      }
      span {
        display: inline-block;
        width: 1.2rem;
        line-height: 1.2rem;
        border-radius: 1.2rem;
        background-color: rgba(255, 255, 255, 0.2);
        margin: 0 0.25rem 0 0;
      }
    }
  }
  span.tip {
    position: absolute;
    font-size: small;
    line-height: 1;
    padding: 0.25rem 0.3rem;
    background-color: #fff;
    border: 1px solid #ddd;
    opacity: 0;
    user-select: none;
    -moz-user-select: none;
    z-index: -1;
    @keyframes displayTip {
      0% {
        opacity: 0;
        z-index: -1;
      }
      10% {
        opacity: 1;
        z-index: 2;
      }
      90% {
        opacity: 1;
        z-index: 2;
      }
      100% {
        opacity: 0;
        z-index: -1;
      }
    }
    animation: displayTip ease-in-out 2s;
  }
}
@media (max-width: 760px) {
  .index {
    .tabela {
      .vgt-wrap {
        .vgt-inner-wrap {
          .vgt-global-search {
            padding: 1rem;
            .vgt-global-search__input .vgt-input {
              padding: 0 0 0 2.25rem;
              border-bottom: none;
            }
          }
          .vgt-wrap__footer {
            flex-flow: column nowrap;
            padding: 1rem;
            .footer__navigation {
              margin-bottom: 1rem;
              .footer__navigation__info,
              .footer__navigation__page-btn {
                padding: 0.25rem 0.5rem;
                &.disabled {
                  padding: 0;
                }
              }
            }
            .footer__row-count {
              padding: 0.25rem 0.5rem;
            }
          }
        }
      }
    }
    footer.actions {
      padding: 0 1rem 1rem 1rem;
      text-align: center;
      button {
        padding: 0.25rem 0.5rem;
        margin: 0 1rem 1rem 0;
      }
    }
  }
}
</style>
