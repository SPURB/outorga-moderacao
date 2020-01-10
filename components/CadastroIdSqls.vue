<template>
  <div class="cadastro-id-sqls modal">
    <div class="cadastro-id-sqls-container">
      <form id="cadastro-sqls" @submit.prevent="update">
        <ul>
          <li
            v-for="(sql, index) in sqls"
            :key="index"
            tag="li"
            class="sqls__item"
          >
            <the-mask
              v-model="sql.NumeroSql"
              :mask="['###.###.####-#']"
              masked="masked"
              name="SQL"
              class="item__input"
              type="input"
              placeholder="000.000.0000-0"
            />
            <button v-if="sql.id !== 1" class="remove" @click.prevent="removeSql(sql)">
              Remover
            </button>
          </li>
        </ul>
        <ul v-if="responses.length" class="responses">
          <li v-for="(response, index) in responses" :key="index" :class="{ error: response.error }">
            {{ response.response }}
          </li>
        </ul>
        <button @click.prevent="addSql">
          Adicionar item
        </button>
        <button @click.prevent="cancel">
          Cancelar
        </button>
        <button type="submit" value="Submit">
          Atualizar
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { TheMask } from 'vue-the-mask'
import { formApi } from '~/plugins/axios'

export default {
  name: 'CadastroIdSqls',
  components: {
    TheMask
  },
  props: {
    sqls: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fetching: false,
      responses: [],
      toRemove: []
    }
  },
  computed: {
    UsuarioAlteracao () { return this.$store.state.userInfo.NM_PRODAM }
  },
  methods: {
    cancel () {
      this.$emit('fechar')
    },
    removeSql (sql) {
      const indexSql = this.sqls.indexOf(sql)
      if (this.sqls[indexSql].Id) { this.toRemove.push(this.sqls[indexSql].Id) }
      this.sqls.splice(indexSql, 1)
    },
    addSql () {
      this.sqls.push({
        NumeroSql: '',
        IdFilaCepac: this.$route.params.id
      })
    },
    async update () {
      formApi.defaults.headers.common.Authorization = this.UsuarioAlteracao
      const toPostItems = this.sqls
        .filter(sql => !sql.Id)
        .map((sql) => {
          formApi.post('/sqls', {
            NumeroSql: sql.NumeroSql,
            IdFilaCepac: this.$route.params.id
          })
            .catch((error) => {
              this.responses.push({ error: true, response: error })
            })
        })

      // const checkPutItem = nsql => this.sqls.includes(sql => sql.NumeroSql === nsql)

      const toPutItems = this.sqls
        .filter((sql, index) => sql.Id)
        .map((sql) => {
          formApi.put(`/sqls/${sql.Id}`, {
            NumeroSql: sql.NumeroSql
          })
            .catch((error) => {
              this.responses.push({ error: true, response: error })
            })
        })

      const toDeleteItems = this.toRemove.map((id) => {
        formApi.delete(`/sqls/${id}`)
          .catch((error) => {
            this.responses.push({ error: true, response: error })
          })
      })

      const postPuts = toPostItems.concat(toPutItems)
      const postPutDeletes = postPuts.concat(toDeleteItems)

      await Promise.all(postPutDeletes)
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
