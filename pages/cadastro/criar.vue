<template>
  <ValidationObserver ref="form" v-slot="{ valid, errors }" :class="'criar'" tag="div">
    <header>
      <h2>Criar novo registro</h2>
      <button @click="$router.push('/')">
        &#8624; Voltar
      </button>
    </header>
    <user-auth v-if="!logged" />
    <form id="createForm">
      <table>
        <tbody>
          <tr>
            <td>Tipo do pedido</td>
            <td>
              <input
                id="pedidoVinculacao"
                v-model="TipoPedido"
                name="TipoPedido"
                type="radio"
                checked="false"
                value="Certidão de vinculação"
              >
              <label for="pedidoVinculacao">Certidão de vinculação</label>
              <input
                id="pedidoAlteracao"
                v-model="TipoPedido"
                name="TipoPedido"
                type="radio"
                checked="false"
                value="Alteração de certidão"
              >
              <label for="pedidoAlteracao">Alteração de certidão</label>
              <input
                id="pedidoDesvinculacao"
                v-model="TipoPedido"
                name="TipoPedido"
                type="radio"
                checked="false"
                value="Desvinculação de CEPACs"
              >
              <label for="pedidoDesvinculacao">Desvinculação de CEPACs</label>
            </td>
          </tr>
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
            <ValidationProvider :rules="{ required: { allowFalse: false } }" tag="td">
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
              <input
                id="Cancelado"
                v-model="IdStatus"
                checked="false"
                type="radio"
                name="IdStatus"
                value="5"
              >
              <label for="Cancelado">Cancelado</label>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputEmail">E-mail</label>
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="email" tag="td">
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
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="" tag="td">
              <the-mask
                id="inputTelefone"
                v-model="Telefone"
                :mask="['(##) ####-####', '(##) #####-####']"
                masked="masked"
                name="Telefone"
                type="tel"
                placeholder="(00) 0000-0000"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputProcurador">Procurador</label>
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="alpha_spaces" tag="td">
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
              <label for="dataInclusao">Data de registro</label>
            </td>
            <td>
              <date-pick
                id="dataInclusao"
                v-model="Data"
                :format="'YYYY-MM-DD'"
                :weekdays="['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']"
                :months="['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']"
                next-month-caption="Próximo mês"
                prev-month-caption="Mês anterior"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputSei">PA/SEI</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <the-mask
                id="inputSei"
                v-model="Sei"
                :mask="['####.####/#######-#']"
                masked="masked"
                name="SEI"
                rows="1"
                placeholder="0000.0000/0000000-0"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCertidao">Certidão</label>
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:9" tag="td">
              <the-mask
                id="inputCertidao"
                v-model="Certidao"
                :mask="['SS-###/#### - ##/##/####']"
                masked="masked"
                name="Certidão"
                rows="1"
                placeholder="FL-000/2020 - dd/mm/aaaa"
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
          <tr v-if="ouc !== ''">
            <td>Setor</td>
            <ValidationProvider v-slot="{ errors }" tag="td">
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
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputSubSetor">SubSetor</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <input
                id="inputSubSetor"
                v-model="SubSetor"
                name="Sub setor"
                type="text"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputEndereco">Endereço</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min:2" tag="td">
              <textarea
                id="inputEndereco"
                v-model="Endereco"
                name="Endereco"
                rows="1"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaTerreno">Área Real do Terreno (m²)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0.01" tag="td">
              <input
                id="inputAreaTerreno"
                v-model="AreaTerreno"
                name="AreaTerreno"
                type="number"
                step="0.01"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaTerreno">Área de Registro do Terreno (m²)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0.01" tag="td">
              <input
                id="inputAreaRegistro"
                v-model="AreaRegistro"
                name="AreaRegistro"
                type="number"
                step="0.01"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputZona">Zona</label>
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="min:2" tag="td">
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
              <span class="opt">Opcional</span>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="" tag="td">
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
                  tag="li"
                  class="sqls__item"
                >
                  <the-mask
                    v-model="sql.content"
                    :mask="['###.###.####-#']"
                    masked="masked"
                    name="SQL"
                    type="text"
                    placeholder="000.000.0000-0"
                  />
                  <button v-if="sql.id !== 1" @click.prevent="removeSql(sql)" class="remove">
                    Remover este
                  </button>
                </ValidationProvider>
              </ul>
              <button @click.prevent="addSql" class="add">
                Adicionar SQL
              </button>
            </td>
          </tr>
          <tr>
            <td>C.A. do Projeto</td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0" tag="td">
              <input
                id="inputCAProjeto"
                v-model="CAProjeto"
                name="CAProjeto"
                type="number"
                step="any"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdResidencial">Área Adicional (residencial)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0" tag="td">
              <input
                id="inputAreaAdResidencial"
                v-model="AreaAdResidencial"
                name="AreaAdResidencial"
                type="number"
                step="any"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdNaoResidencial">Área Adicional (não residencial)</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0" tag="td">
              <input
                id="inputAreaAdNaoResidencial"
                v-model="AreaAdNaoResidencial"
                name="AreaAdNaoResidencial"
                type="number"
                step="any"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCepacAreaAdicional">CEPAC - Área Adicional</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0" tag="td">
              <input
                id="inputCepacAreaAdicional"
                v-model="CepacAreaAdicional"
                name="CepacAreaAdicional"
                type="number"
                step="any"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCepacModUso">CEPAC - Parâmetros</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0" tag="td">
              <input
                id="inputCepacModUso"
                v-model="CepacModUso"
                name="CepacModUso"
                type="number"
                step="any"
                min="0"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCodigoProposta">Código da Proposta</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min:1|max:10" tag="td">
              <the-mask
                id="inputCodigoProposta"
                v-model="CodigoProposta"
                :mask="['XX-XXX/XX','XX-XXXX/XX', 'XXX-XXX/XX', 'XXX-XXXX/XXX']"
                masked="masked"
                placeholder="FL-000/00"
                name="CodigoProposta"
                type="text"
              />
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
      :id-cadastro="form.idCadastro"
      @close="showModal = false"
    />
    <footer v-if="logged">
      <button @click.prevent="$router.push('/')">
        Cancelar
      </button>
      <button v-if="logged" @click.prevent="novaFila(valid, errors)">
        Salvar
      </button>
    </footer>
  </ValidationObserver>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { TheMask } from 'vue-the-mask'
import DatePick from 'vue-date-pick'
import Message from '~/components/Message'
import UserAuth from '~/components/UserAuth'
import { formApi } from '~/plugins/axios'
import { fila as filaNiceName } from '~/utils/glossario'

export default {
  name: 'Criar',
  components: {
    ValidationProvider,
    ValidationObserver,
    TheMask,
    Message,
    UserAuth,
    DatePick
  },
  data () {
    return {
      Data: '',
      TipoPedido: '',
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
      AreaRegistro: 0,
      Zona: '',
      Uso: '',
      CAProjeto: '',
      Obs: '',
      CodigoProposta: '',
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
        oucae: [ '11', '12', '13', '14', '15' ],
        oucc: [ '10' ],
        oucab: [ '5', '6', '7', '8', '9' ]
      },
      filaNiceName,
      ouc: '',
      Setores: [],
      sqls: [],
      showModal: false,
      form: {
        isFetching: false,
        error: false,
        message: '',
        idCadastro: 0
      }
    }
  },
  computed: {
    sqlsToSend () { return this.sqls.map(sql => sql.content) },
    UsuarioAlteracao () { return this.$store.state.userInfo.NM_PRODAM },
    logged () { return this.$store.state.logged }
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
  created () {
    const date = new Date((Date.now() - (new Date()).getTimezoneOffset() * 60000))
    this.Data = date.toISOString().slice(0, 10)
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (vm.logged) { vm.$router.push({ query: { user: vm.$store.state.userInfo.NM_PRODAM, isAdmin: true } }) }
    })
  },
  methods: {
    onSubmit () { console.log('submited') },
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
        console.error(errors)
      }

      this.form.isFetching = true
      this.form.error = false
      this.form.message = 'Criando cadastro no banco de dados'

      formApi.defaults.headers.common.Authorization = this.UsuarioAlteracao

      formApi.post('fila', {
        TipoPedido: this.TipoPedido,
        Certidao: this.Certidao,
        Interessado: this.Interessado,
        Licenciamento: this.Licenciamento,
        Sei: this.Sei,
        AreaAdResidencial: parseFloat(this.AreaAdResidencial.toString().replace(',', '.')),
        AreaAdNaoResidencial: parseFloat(this.AreaAdNaoResidencial.toString().replace(',', '.')),
        CepacAreaAdicional: parseFloat(this.CepacAreaAdicional.toString().replace(',', '.')),
        CepacModUso: parseInt(this.CepacModUso),
        Email: this.Email,
        Telefone: this.Telefone,
        Procurador: this.Procurador,
        CepacObjeto: parseFloat(this.CepacObjeto.toString().replace(',', '.')),
        Endereco: this.Endereco,
        AreaTerreno: parseFloat(this.AreaTerreno.toString().replace(',', '.')),
        AreaRegistro: parseFloat(this.AreaTerreno.toString().replace(',', '.')),
        Zona: this.Zona,
        Uso: this.Uso,
        CAProjeto: parseFloat(this.CAProjeto.toString().replace(',', '.')),
        Obs: this.Obs,
        CodigoProposta: this.CodigoProposta,
        IdStatus: parseInt(this.IdStatus),
        IdSetor: parseInt(this.IdSetor),
        SubSetor: this.SubSetor,
        Data: `${this.Data}T00:00:00`,
        UsuarioAlteracao: this.UsuarioAlteracao
      })
        .then((res) => {
          const IdFilaCepac = res.data.Id
          this.sqlsToSend.forEach((sql) => {
            formApi.post('sqls', {
              NumeroSql: sql,
              IdFilaCepac
            })
          })
          return IdFilaCepac
        })
        .then((id) => {
          this.form.isFetching = false
          this.form.error = false
          this.form.message = 'Registro gerado com sucesso'
          this.form.idCadastro = id
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
</script>
