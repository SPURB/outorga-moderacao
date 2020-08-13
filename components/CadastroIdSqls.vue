<template>
  <div class="cadastro-id-sqls modal">
    <div class="cadastro-id-sqls-container">
      <form id="cadastro-sqls" @submit.prevent="update">
        <ul class="sqls">
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
            <button v-if="sql.id !== 1" @click.prevent="removeSql(sql)" class="btn remove">
              Remover
            </button>
          </li>
        </ul>
        <button @click.prevent="addSql" class="btn add">
          Adicionar item
        </button>
        <ul v-if="responses.length" class="responses">
          <li v-for="(response, index) in responses" :key="index" :class="{ error: response.error }">
            {{ response.response }}
          </li>
        </ul>
        <div class="sqls__nav-group">
          <button @click.prevent="cancel" class="btn cancel">
            Cancelar
          </button>
          <button type="submit" value="Submit" class="btn cancel">
            Atualizar
          </button>
        </div>
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
            .then((response) => {
              this.responses.push({
                error: false,
                response: `${sql.NumeroSql} foi criado`
              })
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
            .then((response) => {
              this.responses.push({ error: false, response: `${sql.Id} foi alterado` })
            })
            .catch((error) => {
              this.responses.push({ error: true, response: error })
            })
        })

      const toDeleteItems = this.toRemove.map((id) => {
        formApi.delete(`/sqls/${id}`)
          .then((response) => {
            this.responses.push({ error: false, response: `${id} foi deletado` })
          })
          .catch((error) => {
            this.responses.push({ error: true, response: error })
          })
      })

      const postPuts = toPostItems.concat(toPutItems)
      const postPutDeletes = postPuts.concat(toDeleteItems)

      await Promise.all(postPutDeletes)
        .then(res => this.cancel())
        .catch(err => console.log(err, 'error'))
    }
  }
}
</script>
<style scss scoped>
#cadastro-sqls > ul:nth-child(1) {
  padding: 0;
}

.cadastro-id-sqls-container {
  background-color: #fff;
  max-width: 90vw
}

#cadastro-sqls {
  padding: 1rem;
}

.cadastro-id-sqls-container {
  border-radius: 20px;
}

#cadastro-sqls {
  border-radius: 10px;
  border-radius: 15px;
}

.sqls__item {
  display: flex;
  margin: auto;
  list-style: none;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.btn.add {
  width: 100%;
}

.sqls__nav-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.btn.remove {
  margin: 0.auto;
}

.item__input {
  width: -moz-available;
  margin-right: 0.5rem;
  margin-bottom: 0.auto;
}

</style>
