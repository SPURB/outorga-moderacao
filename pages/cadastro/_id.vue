<template>
  <ValidationObserver v-slot="{ valid, errors }" tag="div" :class="'cadastro'">
    <header>
      <h2>Editando registro <span>{{ fila.Id }}</span></h2>
      <button @click.prevent="$router.push('/')">
        &#8624; Voltar
      </button>
      <span class="lastEdit">&middot; Editado pela última vez em {{ dateDisplay(fila.DataAlteracao) }}</span>
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
                v-model="fila.Interessado"
                name="Interessado"
                type="text"
                @keyup="checkInput($event, 'Interessado', errors)"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Situação</td>
            <ValidationProvider v-slot="{ errors }" :rules="{ required: { allowFalse: false } }" tag="td">
              <input
                id="Checklist"
                :checked="getStatus(fila.Status, 1)"
                type="radio"
                name="IdStatus"
                value="1"
                @click="checkUpdateById($event, 'IdStatus', 1)"
              >
              <label for="Checklist">Checklist</label>
              <input
                id="EmAnalise"
                :checked="getStatus(fila.Status, 2)"
                type="radio"
                name="IdStatus"
                value="2"
                @click="checkUpdateById($event, 'IdStatus', 2)"
              >
              <label for="EmAnalise">Em análise</label>
              <input
                id="Indeferido"
                :checked="getStatus(fila.Status, 3)"
                type="radio"
                name="IdStatus"
                value="3"
                @click="checkUpdateById($event, 'IdStatus', 3)"
              >
              <label for="Indeferido">Indeferido</label>
              <input
                id="Aprovado"
                :checked="getStatus(fila.Status, 4)"
                type="radio"
                name="IdStatus"
                value="4"
                @click="checkUpdateById($event, 'IdStatus', 4)"
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
                v-model="fila.Email"
                name="Email"
                type="text"
                @keyup="checkInput($event, 'Email', errors)"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputTelefone">Telefone</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min:8|max:13" tag="td">
              <input
                id="inputTelefone"
                v-model="fila.Telefone"
                name="Telefone"
                type="text"
                @keyup="checkInput($event, 'Telefone', errors)"
              >
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
                v-model="fila.Procurador"
                name="Procurador"
                type="text"
                @keyup="checkInput($event, 'Procurador', errors)"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputData">Data de criação</label>
            </td>
            <td>
              <span class="noEdit">
                {{ fila.Data.substring(0, 10) }}, {{ fila.Data.substring(11, 19) }}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputSei">PA/SEI</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <textarea
                id="inputSei"
                v-model="fila.Sei"
                name="Sei"
                rows="1"
                @keyup="checkInput($event, 'Sei', errors)"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputCertidao">Certidão</label>
              <span class="opt">Opcional</span>
            </td>
            <td>
              <textarea
                id="inputCertidao"
                v-model="fila.Certidao"
                name="Certidao"
                rows="1"
                @keyup="checkInput($event, 'Certidao', errors)"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputLicenciamento">Licenciamento</label>
              <span class="opt">Opcional</span>
            </td>
            <td>
              <textarea
                id="inputLicenciamento"
                v-model="fila.Licenciamento"
                name="Licenciamento"
                rows="1"
                @blur="checkInput($event, 'Licenciamento')"
              />
            </td>
          </tr>
          <tr>
            <td>Operação Urbana</td>
            <td>
              <input
                id="AguaBranca"
                :checked="getOU(fila.SetorObj, 1)"
                type="radio"
                name="IdOperacaoUrbana"
                value="1"
                @click="checkOUUpdate($event)"
              >
              <label for="AguaBranca">Água Branca</label>
              <input
                id="FariaLima"
                :checked="getOU(fila.SetorObj, 2)"
                type="radio"
                name="IdOperacaoUrbana"
                value="2"
                @click="checkOUUpdate($event)"
              >
              <label for="FariaLima">Faria Lima</label>
              <input
                id="AguaEspraiada"
                :checked="getOU(fila.SetorObj, 3)"
                type="radio"
                name="IdOperacaoUrbana"
                value="3"
                @click="checkOUUpdate($event)"
              >
              <label for="AguaEspraiada">Água Espraiada</label>
              <input
                id="Centro"
                :checked="getOU(fila.SetorObj, 4)"
                type="radio"
                name="IdOperacaoUrbana"
                value="4"
                @click="checkOUUpdate($event)"
              >
              <label for="Centro">Centro</label>
            </td>
          </tr>
          <tr>
            <td>Setor</td>
            <td>
              <template v-for="(setor, index) in everySetor = Setores">
                <input
                  :id="'setor_' + Object.keys(setor)[0]"
                  :key="'input' + index.toString()"
                  :value="Object.keys(setor)[0]"
                  :checked="getSetor(fila.SetorObj, Object.keys(setor)[0])"
                  type="radio"
                  name="IdSetor"
                  @click="checkSetorUpdate($event, Object.keys(setor)[0])"
                >
                <label :key="index" :for="'setor_' + Object.keys(setor)[0]">{{ Object.entries(setor)[0][1] }}</label>
              </template>
            </td>
          </tr>
          <tr>
            <td>Subsetor</td>
            <ValidationProvider v-slot="{ errors }" rules="required|alpha_num" tag="td">
              <input
                id="inputSubSetor"
                v-model="fila.SubSetor"
                name="SubSetor"
                type="text"
                @keyup="checkInput($event, 'SubSetor', errors)"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Endereço</td>
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <textarea
                id="inputEndereco"
                v-model="fila.Endereco"
                name="Endereco"
                rows="1"
                @keyup="checkInput($event, 'Endereco')"
              />
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Área do Terreno (m²)</td>
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <input
                id="inputAreaTerreno"
                v-model="fila.AreaTerreno"
                name="AreaTerreno"
                type="text"
                @keyup="checkInput($event, 'AreaTerreno')"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Zona</td>
            <ValidationProvider v-slot="{ errors }" rules="required|alpha_num" tag="td">
              <input
                id="inputZona"
                v-model="fila.Zona"
                name="Zona"
                type="text"
                @keyup="checkInput($event, 'Zona')"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Uso</td>
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <input
                id="inputUso"
                v-model="fila.Uso"
                name="Uso"
                type="text"
                @keyup="checkInput($event, 'Uso')"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>Contribuintes (SQL)</td>
            <td>
              <span v-for="sql in sqls" :key="sqls.indexOf(sql)" class="noEdit sql">
                {{ sql.NumeroSql }}
              </span>
            </td>
            <!-- <td class="sql">
              <main class="inputWrap">
                <ValidationProvider
                  v-for="sql in sqls"
                  :key="sql.Id"
                  v-slot="{ errors }"
                  class="outer"
                  :rules="{ regex: /([0-9]{3}.){2}([0-9]{4})-[0-9]{1}/ }"
                  tag="div"
                >
                  <input v-model="sql.NumeroSql">
                  <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
                  <a class="remove" @click="removeSql($event)">&Cross;</a>
                </ValidationProvider><div class="outer include">
                  <input type="text" placeholder="Insira outro SQL aqui" pattern="([0-9]{3}.){2}([0-9]{4})-[0-9]{1}">
                  <a class="remove" @click="pushSql($event)">+</a>
                </div>
              </main>
            </td> -->
          </tr>
          <tr>
            <td>C.A. do Projeto</td>
            <ValidationProvider v-slot="{ errors }" rules="required|numeric" tag="td">
              <input
                id="inputCAProjeto"
                v-model="fila.CAProjeto"
                name="CAProjeto"
                type="text"
                @keyup="checkInput($event, 'CAProjeto', errors)"
              >
              <span :class="{ active: errors[0] }" class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdResidencial">Área Adicional (residencial)</label>
            </td>
            <td>
              <input
                id="inputAreaAdResidencial"
                v-model="fila.AreaAdResidencial"
                name="AreaAdResidencial"
                type="number"
                @keyup="checkInput($event, 'AreaAdResidencial')"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdNaoResidencial">Área Adicional (não residencial)</label>
            </td>
            <td>
              <input
                id="inputAreaAdNaoResidencial"
                v-model="fila.AreaAdNaoResidencial"
                name="AreaAdNaoResidencial"
                type="number"
                step="0.01"
                min="0"
                @keyup="checkInput($event, 'AreaAdNaoResidencial')"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCepacAreaAdicional">CEPAC - Área Adicional</label>
            </td>
            <td>
              <input
                id="inputCepacAreaAdicional"
                v-model="fila.CepacAreaAdicional"
                name="CepacAreaAdicional"
                type="number"
                step="0.01"
                min="0"
                @keyup="checkInput($event, 'CepacAreaAdicional')"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCepacModUso">CEPAC - Parâmetros</label>
            </td>
            <td>
              <input
                id="inputCepacModUso"
                v-model="fila.CepacModUso"
                name="CepacModUso"
                type="number"
                step="1"
                min="0"
                @keyup="checkInput($event, 'CepacModUso')"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCodigoProposta">Código da Proposta</label>
            </td>
            <td>
              <input
                id="inputCodigoProposta"
                v-model="fila.CodigoProposta"
                name="CodigoProposta"
                type="text"
                @keyup="checkInput($event, 'CodigoProposta')"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputObs">Observações</label>
              <span class="opt">Opcional</span>
            </td>
            <td>
              <textarea
                id="inputObs"
                v-model="fila.Obs"
                name="Obs"
                type="text"
                rows="5"
                @keyup="checkInput($event, 'Obs')"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <footer>
      <button @click.prevent="$router.push('/')">
        Cancelar
      </button>
      <!-- <button :disabled="{ 'true': errors[0] }" @click.prevent="purge(filaUntouched, fila)"> -->
      <button @click.prevent="purge(filaUntouched, fila)">
        Salvar
      </button>
    </footer>
    <div id="confirmModal" :class="{ hasChanged: toConfirm.state, hasntChanged: !toConfirm.state }">
      <main :class="{ review: putResponse.pending, response: putResponse.data }">
        <template v-if="toConfirm.state">
          <h3>Revise as alterações que você fez</h3>
          <div class="tableWrap">
            <table>
              <tbody>
                <tr v-for="(changedValue, key) in toConfirm.changed" :key="key">
                  <td class="label">
                    <span>{{ filaNiceName[key] }}</span>
                  </td>
                  <td class="oldValue">
                    <span>{{ toConfirm.old[key] }}</span>
                  </td>
                  <td class="arrow">
                    <span>&rarr;</span>
                  </td>
                  <td class="newValue">
                    <span>{{ changedValue }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="action">
            <button class="esc" @click="backToForm">
              Cancelar e voltar
            </button>
            <button class="confirm" @click="put">
              Confirmar e registrar
            </button>
          </div>
        </template>
        <div class="response" :class="{ success: putResponse.success, error: putResponse.error }">
          <template v-if="putResponse.success">
            <h4>Sucesso</h4>
            <p>Suas alterações foram gravadas</p>
            <button @click="reload">
              Fechar e voltar para a ficha
            </button>
          </template>
          <template v-if="putResponse.error">
            <h4>Erro</h4>
            <p>Ocorreu um ero ao gravar suas alterações</p>
            <p class="errorMsg">
              {{ putResponse.data }}
            </p>
            <button @click="backToForm">
              Fechar e voltar para a ficha
            </button>
            <button @click="put">
              Tentar novamente
            </button>
          </template>
        </div>
      </main>
    </div>
  </ValidationObserver>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from '~/plugins/axios'
import { fila as filaNiceName } from '~/utils/glossario'

export default {
  name: 'Cadastro',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      isFetching: false,
      fila: [],
      sqls: [],
      filaUntouched: {},
      sqlsUntouched: {},
      allSetores: [
        [{ '5': 'JABAQUARA' }, { '6': 'CHUCRI ZAIDAN' }, { '7': 'MARGINAL PINHEIROS' }, { '8': 'BERRINI' }, { '9': 'BROOKLIN' }],
        [{ '1': 'HÉLIO PELLEGRINO' }, { '2': 'FARIA LIMA' }, { '3': 'PINHEIROS' }, { '4': 'OLIMPÍADAS' }],
        [{ '11': 'A' }, { '12': 'B' }, { '13': 'C' }, { '14': 'D' }, { '15': 'E' }],
        [{ '10': 'CENTRO' }]
      ],
      Setores: undefined,
      toConfirm: {
        state: false,
        changed: {},
        old: {}
      },
      putResponse: {
        pending: true,
        success: undefined,
        error: undefined,
        data: undefined
      },
      filaNiceName
    }
  },
  async asyncData ({ params }) {
    const fila = await axios.get(`fila/${params.id}`)
    const sqls = await axios.get(`sqls?IdFilaCepac=${params.id}`)
    return { fila: fila.data, sqls: sqls.data }
  },
  mounted () {
    this.setSetores(this.fila.SetorObj.IdOperacaoUrbana)
    for (const key in this.fila) { // precisa do for aqui para evitar que a instância vue não entender valores de 'fila' como um valor imutável
      this.filaUntouched[key] = this.fila[key]
    }
    this.sqlsUntouched = this.sqls
  },
  methods: {
    purge (oldFila, newFila) {
      const changedFila = {}
      for (const key in oldFila) {
        if (newFila[key] !== oldFila[key]) { changedFila[key] = newFila[key] }
      }
      const haveChanges = Object.keys(changedFila).length >= 1
      if (haveChanges) {
        this.toConfirm.changed = changedFila
        for (const key in changedFila) {
          this.toConfirm.old[key] = this.filaUntouched[key]
        }
        document.body.style.overflow = 'hidden'
        document.getElementById('confirmModal').setAttribute('style', `top: ${Math.abs(document.body.getBoundingClientRect().top)}px`)
        this.toConfirm.state = true
      }
      else {
        this.toConfirm.changed = null
        this.toConfirm.state = false
      }
    },
    getStatus (statusObj, inputValue) {
      if (statusObj.Id === parseInt(inputValue)) {
        return true
      }
      else {
        return false
      }
    },
    getOU (setorObj, inputValue) {
      if (setorObj.IdOperacaoUrbana === inputValue) {
        return true
      }
      else {
        return false
      }
    },
    getSetor (setorObj, inputValue) {
      if (setorObj.Id === parseInt(inputValue)) {
        return true
      }
      else {
        return false
      }
    },
    checkInput (event, filaKey, errorsObj = []) {
      const el = event.target
      const isTouchedAndNew = this.fila[filaKey] !== this.filaUntouched[filaKey]
      if (this.filaUntouched[filaKey]) {
        if (isTouchedAndNew && !errorsObj[0]) { el.parentNode.classList.add('updated') }
        else { el.parentNode.classList.remove('updated') }
      }
      else if (this.filaUntouched[filaKey] === null) {
        if (this.fila[filaKey] && !errorsObj[0]) { el.parentNode.classList.add('updated') }
        else { el.parentNode.classList.remove('updated') }
      }
    },
    checkUpdateById (event, key, id) {
      const el = event.target
      const isEqualtoOriginal = this.filaUntouched[key] === id
      if (!isEqualtoOriginal) {
        el.parentNode.classList.add('updated')
        this.fila[key] = id
      }
      else {
        el.parentNode.classList.remove('updated')
      }
    },
    checkOUUpdate (event) {
      const el = event.target // DOM element
      const field = el.name // "name" attribute
      const ouId = this.fila.SetorObj.IdOperacaoUrbana
      const selected = document.querySelector(`input[name=${field}]:checked`) // input value
      if (parseInt(selected.value) !== ouId) {
        el.parentNode.classList.add('updated')
      }
      else if (parseInt(selected.value) === ouId) {
        el.parentNode.classList.remove('updated')
      }
      this.setSetores(selected.value)
    },
    checkSetorUpdate (event, id) {
      const el = event.target
      const idSubSetor = parseInt(id)
      if (this.filaUntouched.idSubsetor !== idSubSetor) {
        el.parentNode.classList.add('updated')
        this.fila.IdSetor = idSubSetor
      }
      else {
        el.parentNode.classList.remove('updated')
      }
    },
    setSetores (IdOu) {
      this.Setores = this.allSetores[IdOu - 1]
      return Object.entries(this.Setores)
    },
    backToForm () {
      this.toConfirm.state = false
      document.body.style.overflow = 'auto'
    },
    put () {
      axios.put(`fila/${this.$route.params.id}`, this.toConfirm.changed)
        .then((res) => {
          this.putResponse.pending = false
          this.putResponse.success = true
          this.putResponse.data = res
          // location.reload()
        })
        .catch((e) => {
          this.putResponse.pending = false
          this.putResponse.error = true
          this.putResponse.data = e
        })
    },
    reload () {
      location.reload()
      window.scrollTo(0, 0)
    },
    dateDisplay (dateStr) {
      return dateStr.replace('T', ', às ').substring(0, 20) + 'h'
    },
    pushSql (event) {
      const input = event.target.parentNode.firstElementChild
      let isRepeated
      if (input.value) {
        this.sqls.filter((sqlObj) => {
          if (sqlObj.NumeroSql === input.value) {
            isRepeated = true
          }
          else {
            isRepeated = false
          }
        })
        if (!isRepeated) {
          this.sqls.push({ 'NumeroSql': input.value })
          input.value = ''
        }
      }
      // inserir a seguinte logica no metodo put()
      // 1. comparar sqls com sqlsUntouched
      // 2. put nas alterações
      // 3. post nas inserções
      // observar issue #1 do repositorio
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/formCadastro.scss';
</style>
