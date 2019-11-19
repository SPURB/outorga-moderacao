<template>
  <ValidationObserver v-slot="{ valid, errors }" tag="div" :class="'criar'">
    <header>
      <h2>Criar novo registro</h2>
      <button @click="$router.push('/')">
        &#8624; Voltar
      </button>
    </header>
    <form>
      <table>
        <tbody>
          <tr>
            <td>
              <label for="inputInteressado">Interessado</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min:1|max:1500" tag="td">
              <input
                id="inputInteressado"
                v-model="Interessado"
                name="Interessado"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Situação</td>
            <ValidationProvider v-slot="{ errors }" :rules="{ required: { allowFalse: false } }" tag="td">
              <input
                id="Checklist"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="1"
              >
              <label for="Checklist">Checklist</label>
              <input
                id="EmAnalise"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="2"
              >
              <label for="EmAnalise">Em análise</label>
              <input
                id="Indeferido"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="3"
              >
              <label for="Indeferido">Indeferido</label>
              <input
                id="Aprovado"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="4"
              >
              <label for="Aprovado">Aprovado</label>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputEmail">E-mail</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|email" tag="td">
              <input
                id="inputEmail"
                v-model="Email"
                name="Email"
                type="email"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputTelefone">Telefone</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="numeric|min:8|max:15" tag="td">
              <input
                id="inputTelefone"
                v-model="Telefone"
                name="Telefone"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputProcurador">Procurador</label>
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:120" tag="td">
              <input
                id="inputProcurador"
                v-model="Procurador"
                name="Procurador"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputSei">PA/SEI</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:1200" tag="td">
              <textarea
                id="inputSei"
                v-model="Sei"
                name="Sei"
                rows="1"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCertidao">Certidão</label>
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:300" tag="td">
              <textarea
                id="inputCertidao"
                v-model="Certidao"
                name="Certidao"
                rows="1"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputLicenciamento">Licenciamento</label>
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:300" tag="td">
              <textarea
                id="inputLicenciamento"
                v-model="Licenciamento"
                name="Licenciamento"
                rows="1"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Operação Urbana</td>
            <ValidationProvider v-slot="{ errors }" :rules="{ required: { allowFalse: false } }" tag="td">
              <input
                id="AguaBranca"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucab"
              >
              <label for="AguaBranca">Água Branca</label>
              <input
                id="FariaLima"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucfl"
              >
              <label for="FariaLima">Faria Lima</label>
              <input
                id="AguaEspraiada"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucae"
              >
              <label for="AguaEspraiada">Água Espraiada</label>
              <input
                id="Centro"
                v-model="ouc"
                type="radio"
                name="IdOperacaoUrbana"
                value="oucc"
              >
              <label for="Centro">Centro</label>
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr v-if="ouc!==''">
            <td>Setor</td>
            <td>
              <template v-for="(setor, index) in Setores">
                <input
                  :id="`setor_${setor.id}`"
                  :key="index + 1000"
                  v-model="IdSetor"
                  :value="setor.id"
                  :name="setor.nome"
                  type="radio"
                >
                <label :key="index + 100" :for="`setor_${setor.id}`">{{ setor.nome }}</label>
              </template>
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputSubSetor">SubSetor</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:1|max:100" tag="td">
              <input
                id="inputSubSetor"
                v-model="SubSetor"
                name="SubSetor"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputEndereco">Endereço</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:300" tag="td">
              <textarea
                id="inputEndereco"
                v-model="Endereco"
                name="Endereco"
                rows="1"
              />
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaTerreno">Área do Terreno (m²)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min_value:0.01" tag="td">
              <input
                id="inputAreaTerreno"
                v-model="AreaTerreno"
                name="AreaTerreno"
                type="number"
                step="0.01"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputZona">Zona</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:100" tag="td">
              <input
                id="inputZona"
                v-model="Zona"
                name="Zona"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputUso">Uso</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2|max:50" tag="td">
              <input
                id="inputUso"
                v-model="Uso"
                name="Uso"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Contribuintes (SQL)</td>
            <td>
              <ul class="sqls">
                <ValidationProvider
                  v-for="sql in sqls"
                  :key="sql.id"
                  v-slot="{ errors }"
                  :rules="{ regex: /([0-9]{3}.){2}([0-9]{4})-[0-9]{1}/ }"
                  tag="li"
                  class="sqls__item"
                >
                  <input
                    v-model="sql.content"
                    name="sql"
                    type="text"
                  >
                  <button v-if="sql.id !== 1" class="remove" @click.prevent="removeSql(sql)">
                    Remover este
                  </button>
                  <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </ul>
              <button class="add" @click.prevent="addSql">
                Adicionar SQL
              </button>
            </td>
          </tr>
          <tr>
            <td>C.A. do Projeto</td>
            <ValidationProvider v-slot="{ errors }" rules="numeric" tag="td">
              <input
                id="inputCAProjeto"
                v-model="CAProjeto"
                name="CAProjeto"
                type="number"
              >
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdResidencial">Área Adicional (residencial)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="numeric" tag="td">
              <input
                id="inputAreaAdResidencial"
                v-model="AreaAdResidencial"
                name="AreaAdResidencial"
                type="number"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdNaoResidencial">Área Adicional (não residencial)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min_value:0" tag="td">
              <input
                id="inputAreaAdNaoResidencial"
                v-model="AreaAdNaoResidencial"
                name="AreaAdNaoResidencial"
                type="number"
                step="0.01"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCepacAreaAdicional">CEPAC - Área Adicional</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min_value:0" tag="td">
              <input
                id="inputCepacAreaAdicional"
                v-model="CepacAreaAdicional"
                name="CepacAreaAdicional"
                type="number"
                step="0.01"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCepacModUso">CEPAC - Parâmetros</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="numeric" tag="td">
              <input
                id="inputCepacModUso"
                v-model="CepacModUso"
                name="CepacModUso"
                type="number"
                step="1"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCodigoProposta">Código da Proposta</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:1|max:100" tag="td">
              <input
                id="inputCodigoProposta"
                v-model="CodigoProposta"
                name="CodigoProposta"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputObs">Observações</label>
              <span class="opt">Opcional</span>
            </td>
            <td>
              <textarea
                id="inputObs"
                v-model="Obs"
                name="Obs"
                type="text"
                rows="5"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <Message
      v-if="showModal"
      :message="form.message"
      :error="form.error"
      :is-fetching="form.isFetching"
      @close="showModal = false"
    />
    <footer>
      <button @click.prevent="$router.push('/')">
        Cancelar
      </button>
      <button id="salvar" @click.prevent="novaFila(valid, errors)">
        Salvar
      </button>
    </footer>
  </ValidationObserver>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Message from '~/components/Message'
import axios from '~/plugins/axios'
import { fila as filaNiceName } from '~/utils/glossario'

export default {
  name: 'Criar',
  components: {
    ValidationProvider,
    ValidationObserver,
    Message
  },
  data () {
    return {
      SubSetor: '',
      Certidao: '',
      Interessado: '',
      Licenciamento: '',
      Sei: '',
      AreaAdResidencial: 0,
      AreaAdNaoResidencial: 0,
      CepacAreaAdicional: 0,
      CepacModUso: 0,
      Email: '',
      Telefone: '',
      Procurador: '',
      CepacObjeto: 0,
      Endereco: '',
      AreaTerreno: '',
      Zona: '',
      Uso: '',
      CAProjeto: '',
      Obs: '',
      CodigoProposta: '',
      UsuarioAlteracao: '',
      IdStatus: 0,
      IdSetor: 0,
      mapSetores: {
        '1': 'HÉLIO PELLEGRINO',
        '2': 'FARIA LIMA',
        '3': 'PINHEIROS',
        '4': 'OLIMPÍADAS',
        '5': 'JABAQUARA',
        '6': 'CHUCRI ZAIDAN',
        '7': 'MARGINAL PINHEIROS',
        '8': 'BERRINI',
        '9': 'BROOKLIN',
        '10': 'CENTRO',
        '11': 'A',
        '12': 'B',
        '13': 'C',
        '14': 'D',
        '15': 'E'
      },
      mapOucSetores: {
        oucfl: [ '1', '2', '3', '4' ],
        oucae: [ '5', '6', '7', '8', '9' ],
        oucc: [ '10' ],
        oucab: [ '11', '12', '13', '14', '15' ]
      },
      filaNiceName,
      ouc: '',
      Setores: [],
      sqls: [],
      showModal: false,
      form: {
        isFetching: false,
        error: false,
        message: ''
      }
    }
  },
  computed: {
    sqlsToSend () { return this.sqls.map(sql => sql.content) }
  },
  watch: {
    ouc (key) {
      this.Setores = this.mapOucSetores[key].map((id) => {
        return {
          id,
          nome: this.mapSetores[id]
        }
      })
    },
    showModal (state) {
      if (state) {
        document.body.style.overflow = 'hidden'
      }
      else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  methods: {
    removeSql (sql) {
      const indexSql = this.sqls.indexOf(sql)
      this.sqls.splice(indexSql, 1)
    },
    addSql () {
      if (this.sqls.length) {
        const biggerId = this.sqls
          .map(sql => sql.id)
          .reduce((a, b) => a > b ? a : b)

        this.sqls.push({
          id: biggerId + 1,
          content: ''
        })
      }
      else {
        this.sqls.push({
          id: 1,
          content: ''
        })
      }
    },
    reloadApp () { window.location.reload(true) },
    novaFila (isValid, errors) {
      this.showModal = true
      if (!isValid) {
        this.form.isFetching = false
        this.form.error = true
        this.form.message = 'Erro no formulário'
      }
      else {
        this.form.isFetching = true
        this.form.error = false
        this.form.message = 'Criando cadastro no banco de dados'

        axios.post('fila', {
          Certidao: this.Certidao,
          Interessado: this.Interessado,
          Licenciamento: this.Licenciamento,
          Sei: this.Sei,
          AreaAdResidencial: parseInt(this.AreaAdResidencial),
          AreaAdNaoResidencial: parseInt(this.AreaAdNaoResidencial),
          CepacAreaAdicional: parseInt(this.CepacAreaAdicional),
          CepacModUso: parseInt(this.CepacModUso),
          Email: this.Email,
          Telefone: this.Telefone,
          Procurador: this.Procurador,
          CepacObjeto: parseInt(this.CepacObjeto),
          Endereco: this.Endereco,
          AreaTerreno: parseInt(this.AreaTerreno),
          Zona: this.Zona,
          Uso: this.Uso,
          CAProjeto: parseInt(this.CAProjeto),
          Obs: this.Obs,
          CodigoProposta: this.CodigoProposta,
          IdStatus: parseInt(this.IdStatus),
          IdSetor: parseInt(this.IdSetor)
        })
          .then((res) => {
            const IdFilaCepac = res.data.Id
            const errors = []
            this.sqlsToSend.forEach((sql) => {
              axios.post('sqls', {
                NumeroSql: sql,
                IdFilaCepac
              })
            })
            return IdFilaCepac
          })
          .then((res) => {
            this.form.isFetching = false
            this.form.error = false
            this.form.message = 'Registro gerado com sucesso'
            this.form.idCadastro = res
          })
          .catch((err) => {
            console.error(err)
            this.form.isFetching = false
            this.form.error = true
            this.form.message = err.message
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/formCadastro.scss';

</style>
