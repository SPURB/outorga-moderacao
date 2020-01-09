<template>
  <div class="cadastro-id-sqls modal">
    <div class="cadastro-id-sqls-container">
      <form>
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
              type="text"
              placeholder="000.000.0000-0"
            />
            <button v-if="sql.id !== 1" class="remove" @click.prevent="removeSql(sql)">
              Remover
            </button>
          </li>
        </ul>
        <button @click.prevent="addSql">
          Adicionar item
        </button>
        <button @click.prevent="cancel">
          Cancelar
        </button>
        <button @click.prevent="update">
          Atualizar
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { TheMask } from 'vue-the-mask'

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
  methods: {
    cancel () {
      this.$emit('fechar')
    },
    removeSql (sql) {
      const indexSql = this.sqls.indexOf(sql)
      this.sqls.splice(indexSql, 1)
    },
    addSql () {
      if (this.sqls.length) {
        this.sqls.push({
          NumeroSql: '',
          IdFilaCepac: this.$route.params.id
        })
      }
      else {
        this.sqls.push({
          Id: 1,
          NumeroSql: '',
          IdFilaCepac: this.$route.params.id
        })
      }
    },
    update () {
      console.log(this.sqls)
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
