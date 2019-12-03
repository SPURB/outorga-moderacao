<template>
  <ValidationObserver :class="'cadastro'" tag="div">
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
            <td>Tipo do pedido</td>
            <ValidationProvider :rules="{ required: { allowFalse: false } }" tag="td">
              <input
                id="pedidoVinculacao"
                type="radio"
                name="TipoPedido"
                value="Certidão de vinculação"
                :checked="getTipo(fila.TipoPedido, 'Certidão de vinculação')"
                v-model="fila.TipoPedido"
                @click="checkTipoUpdate($event, 'TipoPedido')"
              >
              <label for="pedidoVinculacao">Certidão de vinculação</label>
              <input
                id="pedidoAlteracao"
                type="radio"
                name="TipoPedido"
                value="Alteração de certidão"
                :checked="getTipo(fila.TipoPedido, 'Alteração de certidão')"
                v-model="fila.TipoPedido"
                @click="checkTipoUpdate($event, 'TipoPedido')"
              >
              <label for="pedidoAlteracao">Alteração de certidão</label>
              <input
                id="pedidoDesvinculacao"
                type="radio"
                name="TipoPedido"
                value="Desvinculação de CEPACs"
                :checked="getTipo(fila.TipoPedido, 'Desvinculação de CEPACs')"
                v-model="fila.TipoPedido"
                @click="checkTipoUpdate($event, 'TipoPedido')"
              >
              <label for="pedidoDesvinculacao">Desvinculação de CEPACs</label>
            </ValidationProvider>
          </tr>
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
            <ValidationProvider :rules="{ required: { allowFalse: false } }" tag="td">
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
              <input
                id="Cancelado"
                :checked="getStatus(fila.Status, 5)"
                type="radio"
                name="IdStatus"
                value="5"
                @click="checkUpdateById($event, 'IdStatus', 5)"
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
                v-model="fila.Email"
                name="Email"
                @keyup="checkInput($event, 'Email', errors)"
                type="text"
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
                v-model="fila.Telefone"
                :mask="['(##) ####-####', '(##) #####-####']"
                masked="masked"
                name="Telefone"
                @keyup.native="checkInput($event, 'Telefone', errors)"
                type="tel"
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
                v-model="fila.Procurador"
                name="Procurador"
                @keyup="checkInput($event, 'Procurador', errors)"
                type="text"
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
              <the-mask
                id="inputSei"
                v-model="fila.Sei"
                @keyup.native="checkInput($event, 'Sei', errors)"
                :mask="['####.####/#######-#']"
                masked="masked"
                name="Sei"
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
              <input
                id="inputCertidao"
                v-model="fila.Certidao"
                @keyup="checkInput($event, 'Certidao', errors)"
                type="text"
                name="Certidao"
              >
            </ValidationProvider>
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
                @keyup="checkInput($event, 'Licenciamento')"
                name="Licenciamento"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td>Operação Urbana</td>
            <td>
              <input
                id="AguaEspraiada"
                @click="checkOUUpdate($event)"
                :checked="getOU(fila.SetorObj, 1)"
                type="radio"
                name="IdOperacaoUrbana"
                value="1"
              >
              <label for="AguaEspraiada">Água Espraiada</label>
              <input
                id="FariaLima"
                @click="checkOUUpdate($event)"
                :checked="getOU(fila.SetorObj, 2)"
                type="radio"
                name="IdOperacaoUrbana"
                value="2"
              >
              <label for="FariaLima">Faria Lima</label>
              <input
                id="Centro"
                @click="checkOUUpdate($event)"
                :checked="getOU(fila.SetorObj, 3)"
                type="radio"
                name="IdOperacaoUrbana"
                value="3"
              >
              <label for="Centro">Centro</label>
              <input
                id="AguaBranca"
                @click="checkOUUpdate($event)"
                :checked="getOU(fila.SetorObj, 4)"
                type="radio"
                name="IdOperacaoUrbana"
                value="4"
              >
              <label for="AguaBranca">Água Branca</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Setor</label>
            </td>
            <td ref="setoresRow">
              <template v-for="(setor, index) in everySetor = Setores">
                <input
                  :id="'setor_' + Object.keys(setor)[0]"
                  @click="checkSetorUpdate($event, Object.keys(setor)[0])"
                  :key="'input' + index.toString()"
                  :value="Object.keys(setor)[0]"
                  :checked="getSetor(filaUntouched.SetorObj, Object.keys(setor)[0])"
                  type="radio"
                  name="IdSetor"
                >
                <label :key="index" :for="'setor_' + Object.keys(setor)[0]">{{ Object.entries(setor)[0][1] }}</label>
              </template>
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputSubSetor">Subsetor</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="alpha_num" tag="td">
              <input
                id="inputSubSetor"
                v-model="fila.SubSetor"
                @keyup="checkInput($event, 'SubSetor', errors)"
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
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <textarea
                id="inputEndereco"
                v-model="fila.Endereco"
                @keyup="checkInput($event, 'Endereco')"
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
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <input
                id="inputAreaTerreno"
                v-model.number="fila.AreaTerreno"
                @keyup="checkInput($event, 'AreaTerreno')"
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
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <input
                id="inputAreaRegistro"
                v-model.number="fila.AreaRegistro"
                @keyup="checkInput($event, 'AreaRegistro')"
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
            <ValidationProvider v-slot="{ errors }" rules="alpha_num" tag="td">
              <input
                id="inputZona"
                v-model="fila.Zona"
                @keyup="checkInput($event, 'Zona')"
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
                v-model="fila.Uso"
                @keyup="checkInput($event, 'Uso')"
                name="Uso"
                type="text"
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
          </tr>
          <tr>
            <td>
              <label for="inputCAProjeto">C.A. do Projeto</label>
            </td>
            <ValidationProvider v-slot="{ errors }" rules="required|min_value:0" tag="td">
              <input
                id="inputCAProjeto"
                v-model.number="fila.CAProjeto"
                @keyup="checkInput($event, 'CAProjeto', errors)"
                name="CAProjeto"
                type="number"
                step="0.01"
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
                v-model.number="fila.AreaAdResidencial"
                @keyup="checkInput($event, 'AreaAdResidencial')"
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
                v-model.number="fila.AreaAdNaoResidencial"
                @keyup="checkInput($event, 'AreaAdNaoResidencial')"
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
                v-model.number="fila.CepacAreaAdicional"
                @keyup="checkInput($event, 'CepacAreaAdicional')"
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
                v-model.number="fila.CepacModUso"
                @keyup="checkInput($event, 'CepacModUso')"
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
            <ValidationProvider v-slot="{ errors }" rules="required" tag="td">
              <the-mask
                id="inputCodigoProposta"
                v-model="fila.CodigoProposta"
                @keyup.native="checkInput($event, 'CodigoProposta', errors)"
                :mask="['XX-XXX/XX','XX-XXXX/XX', 'XXX-XXX/XX', 'XXX-XXXX/XXX']"
                masked="masked"
                type="text"
                name="CodigoProposta"
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
                v-model="fila.Obs"
                @keyup="checkInput($event, 'Obs')"
                name="Obs"
                type="text"
                rows="5"
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
      <button :disabled="saveBtnDisableState" @click.prevent="purge(filaUntouched, fila)">
        Salvar
      </button>
    </footer>
    <div id="confirmModal" :class="{ hasChanged: toConfirm.state, hasntChanged: !toConfirm.state }">
      <main :class="{ review: putResponse.pending === undefined, fetching: putResponse.pending === true, response: putResponse.data }">
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
                    <span>{{ diffDisplay(toConfirm.old[key], key) }}</span>
                  </td>
                  <td class="arrow">
                    <span>&rarr;</span>
                  </td>
                  <td class="newValue">
                    <span>{{ diffDisplay(changedValue, key) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="action">
            <button @click="backToForm" class="esc">
              Cancelar e voltar
            </button>
            <button @click="put" class="confirm">
              Confirmar e registrar
            </button>
          </div>
        </template>
        <div :class="{ active: putResponse.pending }" class="fetcher">
          Registrando
        </div>
        <div :class="{ success: putResponse.success, error: putResponse.error }" class="response">
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
import { TheMask } from 'vue-the-mask'
import axios from '~/plugins/axios'
import { fila as filaNiceName } from '~/utils/glossario'
import { setores as setoresLabels } from '~/utils/setoresLabels'

export default {
  name: 'Cadastro',
  components: {
    ValidationProvider,
    ValidationObserver,
    TheMask
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
        [{ '10': 'CENTRO' }],
        [{ '11': 'A' }, { '12': 'B' }, { '13': 'C' }, { '14': 'D' }, { '15': 'E' }]
      ],
      Setores: undefined,
      toConfirm: {
        state: false,
        changed: {},
        old: {}
      },
      putResponse: {
        pending: undefined,
        success: undefined,
        error: undefined,
        data: undefined,
        reset () { // para zerar a request
          this.pending = undefined
          this.success = undefined
          this.error = undefined
          this.data = undefined
        }
      },
      filaNiceName,
      saveBtnDisableState: true
    }
  },
  async asyncData ({ params }) {
    const fila = await axios.get(`fila/${params.id}`)
    const sqls = await axios.get(`sqls?IdFilaCepac=${params.id}`)
    return { fila: fila.data, sqls: sqls.data }
  },
  mounted () {
    this.setSetores(this.fila.SetorObj.IdOperacaoUrbana)
    this.normFila(this.fila)
    this.sqlsUntouched = this.sqls
  },
  methods: {
    purge (oldFila, newFila) {
      const changedFila = {}
      for (const key in oldFila) {
        if (newFila[key] !== oldFila[key]) {
          if (key === 'CAProjeto' || key === 'AreaTerreno') {
            newFila[key] = newFila[key].toString()
          }
          changedFila[key] = newFila[key]
        }
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
    diffDisplay (attribute, key) {
      let out = ''
      if (key === 'IdStatus') {
        switch (attribute) {
          case 1: out = 'Checklist'; break
          case 2: out = 'Em análise'; break
          case 3: out = 'Indeferido'; break
          case 4: out = 'Aprovado'; break
          case 5: out = 'Cancelado'; break
        }
      }
      else if (key === 'IdSetor') {
        out = setoresLabels[attribute]
      }
      else {
        out = attribute
      }
      return out
    },
    getTipo (pedidoObj, inputValue) {
      if (pedidoObj === inputValue) {
        return 'checked'
      }
      else {
        return 'false'
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
      // console.log(this.fila[filaKey], this.filaUntouched[filaKey], this.fila[filaKey] === this.filaUntouched[filaKey])
      if (isTouchedAndNew) {
        el.parentNode.classList.add('updated')
        this.saveBtnDisableState = false
      }
      else {
        el.parentNode.classList.remove('updated')
        this.saveBtnDisableState = true
      }
      // if (this.filaUntouched[filaKey]) {
      //   if (isTouchedAndNew && !errorsObj[0]) { el.parentNode.classList.add('updated') }
      //   else { el.parentNode.classList.remove('updated') }
      // }
      // else if (this.filaUntouched[filaKey] === null) {
      //   if (this.fila[filaKey] && !errorsObj[0]) { el.parentNode.classList.add('updated') }
      //   else { el.parentNode.classList.remove('updated') }
      // }
    },
    checkUpdateById (event, key, id) {
      const el = event.target
      const isEqualtoOriginal = this.filaUntouched[key] === id
      if (!isEqualtoOriginal) {
        el.parentNode.classList.add('updated')
        this.saveBtnDisableState = false
        this.fila[key] = id
      }
      else {
        el.parentNode.classList.remove('updated')
        this.saveBtnDisableState = true
      }
    },
    checkOUUpdate (event) {
      const el = event.target // DOM element
      const field = el.name // "name" attribute
      const ouId = this.fila.SetorObj.IdOperacaoUrbana
      const selected = document.querySelector(`input[name=${field}]:checked`) // input value
      if (parseInt(selected.value) !== ouId) {
        el.parentNode.classList.add('updated')
        this.saveBtnDisableState = false
      }
      else if (parseInt(selected.value) === ouId) {
        el.parentNode.classList.remove('updated')
        this.saveBtnDisableState = true
      }
      this.setSetores(selected.value)
    },
    checkSetorUpdate (event, idStr) {
      const td = event.target.parentNode
      const id = parseInt(idStr)
      if (id !== this.filaUntouched.IdSetor) {
        td.classList.add('updated')
        this.saveBtnDisableState = false
        this.fila.IdSetor = id
      }
      else {
        td.classList.remove('updated')
        this.saveBtnDisableState = true
      }
    },
    checkTipoUpdate (event, filaKey) {
      const td = event.target.parentNode
      const val = event.target.value
      if (val !== this.filaUntouched[filaKey]) {
        td.classList.add('updated')
        this.saveBtnDisableState = false
      }
      else {
        td.classList.remove('updated')
        this.saveBtnDisableState = true
      }
    },
    setSetores (IdOu) {
      this.Setores = this.allSetores[IdOu - 1]
      this.$refs.setoresRow.classList.remove('updated')
      return Object.entries(this.Setores)
    },
    normFila (filaObj) {
      for (const key in filaObj) { // precisa do for aqui para evitar que a instância vue não entender valores de 'fila' como um valor imutável
        if (key === 'CAProjeto' || key === 'AreaTerreno') {
          filaObj[key] = parseFloat(filaObj[key])
        }
        this.filaUntouched[key] = filaObj[key]
        if (filaObj[key] === null) {
          this.filaUntouched[key] = ''
          filaObj[key] = ''
        }
      }
    },
    backToForm () {
      this.toConfirm.state = false
      this.putResponse.reset()
      document.body.style.overflow = 'auto'
    },
    put () {
      this.putResponse.pending = true
      axios.put(`fila/${this.$route.params.id}`, this.toConfirm.changed)
        .then((res) => {
          this.putResponse.pending = false
          this.putResponse.success = true
          this.putResponse.data = res
        })
        .catch((e) => {
          this.putResponse.pending = false
          this.putResponse.error = true
          this.putResponse.data = e
        })
    },
    reload () {
      window.location.reload()
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
