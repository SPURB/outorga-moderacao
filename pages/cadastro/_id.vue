<template>
  <div class="cadastro">
    <header>
      <h2>Editando registro <span>{{ fila.Id }}</span></h2>
      <button @click="backToIndex">
        &#8624; Voltar
      </button>
    </header>
    <form action="">
      <table>
        <tbody>
          <tr>
            <td>
              <label for="inputInteressado">Interessado</label>
            </td>
            <td>
              <input id="inputInteressado" name="Interessado" type="text" :value="fila.Interessado" @blur="checkUpdate($event)">
            </td>
          </tr>
          <tr>
            <td>Situação</td>
            <td>
              <input
                id="Checklist"
                type="radio"
                name="IdStatus"
                value="1"
                :checked="getStatus(fila.Status, 1)"
                @click="checkStatusUpdate($event)"
              >
              <label for="Checklist">Checklist</label>
              <input
                id="EmAnalise"
                type="radio"
                name="IdStatus"
                value="2"
                :checked="getStatus(fila.Status, 2)"
                @click="checkStatusUpdate($event)"
              >
              <label for="EmAnalise">Em análise</label>
              <input
                id="Indeferido"
                type="radio"
                name="IdStatus"
                value="3"
                :checked="getStatus(fila.Status, 3)"
                @click="checkStatusUpdate($event)"
              >
              <label for="Indeferido">Indeferido</label>
              <input
                id="Aprovado"
                type="radio"
                name="IdStatus"
                value="4"
                :checked="getStatus(fila.Status, 4)"
                @click="checkStatusUpdate($event)"
              >
              <label for="Aprovado">Aprovado</label>
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputEmail">E-mail</label>
            </td>
            <td>
              <input
                id="inputEmail"
                name="Email"
                type="text"
                :value="fila.Email"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputTelefone">Telefone</label>
            </td>
            <td>
              <input
                id="inputTelefone"
                name="Telefone"
                type="text"
                :value="fila.Telefone"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputProcurador">Procurador</label>
            </td>
            <td>
              <input
                id="inputProcurador"
                name="Procurador"
                type="text"
                :value="fila.Procurador"
                @blur="checkUpdate($event)"
              >
            </td>
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
              <label for="inputSei">SEI</label>
            </td>
            <td>
              <textarea
                id="inputSei"
                name="Sei"
                rows="1"
                :value="fila.Sei"
                @blur="checkUpdate($event)"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCertidao">Certidão</label>
            </td>
            <td>
              <textarea
                id="inputCertidao"
                name="Certidao"
                rows="1"
                :value="fila.Certidao"
                @blur="checkUpdate($event)"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputLicenciamento">Licenciamento</label>
            </td>
            <td>
              <textarea
                id="inputLicenciamento"
                name="Licenciamento"
                rows="1"
                :value="fila.Licenciamento"
                @blur="checkUpdate($event)"
              />
            </td>
          </tr>
          <tr>
            <td>Operação Urbana</td>
            <td>
              <input
                id="AguaBranca"
                type="radio"
                name="IdOperacaoUrbana"
                value="1"
                :checked="getOU(fila.SetorObj, 1)"
                @click="checkOUUpdate($event)"
              >
              <label for="AguaBranca">Água Branca</label>
              <input
                id="FariaLima"
                type="radio"
                name="IdOperacaoUrbana"
                value="2"
                :checked="getOU(fila.SetorObj, 2)"
                @click="checkOUUpdate($event)"
              >
              <label for="FariaLima">Faria Lima</label>
              <input
                id="AguaEspraiada"
                type="radio"
                name="IdOperacaoUrbana"
                value="3"
                :checked="getOU(fila.SetorObj, 3)"
                @click="checkOUUpdate($event)"
              >
              <label for="AguaEspraiada">Água Espraiada</label>
              <input
                id="Centro"
                type="radio"
                name="IdOperacaoUrbana"
                value="4"
                :checked="getOU(fila.SetorObj, 4)"
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
                  type="radio"
                  name="IdSetor"
                  :value="Object.keys(setor)[0]"
                  :checked="getSetor(fila.SetorObj, Object.keys(setor)[0])"
                  @click="checkSetorUpdate($event)"
                  @update="checkSetorUpdate($event)"
                >
                <label :key="index" :for="'setor_' + Object.keys(setor)[0]">{{ Object.entries(setor)[0][1] }}</label>
              </template>
            </td>
          </tr>
          <tr>
            <td>Subsetor</td>
            <td>
              <input
                id="inputSubsetor"
                name="SubSetor"
                type="text"
                :value="fila.SubSetor"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>Endereço</td>
            <td>
              <textarea
                id="inputEndereco"
                name="Endereco"
                rows="1"
                :value="fila.Endereco"
                @blur="checkUpdate($event)"
              />
            </td>
          </tr>
          <tr>
            <td>Área do Terreno</td>
            <td>
              <input
                id="inputAreaTerreno"
                name="AreaTerreno"
                type="text"
                :value="fila.AreaTerreno"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>Zona</td>
            <td>
              <input
                id="inputZona"
                name="Zona"
                type="text"
                :value="fila.Zona"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>Uso</td>
            <td>
              <input
                id="inputUso"
                name="Uso"
                type="text"
                :value="fila.Uso"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>C.A. do Projeto</td>
            <td>
              <input
                id="inputCAProjeto"
                name="CAProjeto"
                type="text"
                :value="fila.CAProjeto"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdResidencial">Área Adicional (residencial)</label>
            </td>
            <td>
              <input
                id="inputAreaAdResidencial"
                name="AreaAdResidencial"
                type="number"
                :value="fila.AreaAdResidencial"
                @blur="checkUpdate($event)"
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
                name="AreaAdNaoResidencial"
                type="number"
                :value="fila.AreaAdNaoResidencial"
                step="0.01"
                min="0"
              >
            </td>
          </tr>
          <tr>
            <td>CEPAC - Objeto</td>
            <td>
              <input
                id="inputCepacObjeto"
                name="CepacObjeto"
                type="number"
                :value="fila.CepacObjeto"
                step="1"
                min="0"
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
                name="CepacAreaAdicional"
                type="number"
                :value="fila.CepacAreaAdicional"
                step="0.01"
                min="0"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCepacModUso">CEPAC - Modo de uso</label>
            </td>
            <td>
              <input
                id="inputCepacModUso"
                name="CepacModUso"
                type="number"
                :value="fila.CepacModUso"
                step="1"
                min="0"
              >
            </td>
          </tr>
          <tr>
            <td>Código da Proposta</td>
            <td>
              <input
                id="inputCodigoProposta"
                name="CodigoProposta"
                type="text"
                :value="fila.CodigoProposta"
                @blur="checkUpdate($event)"
              >
            </td>
          </tr>
          <tr>
            <td>Observações</td>
            <td>
              <textarea
                id="inputObs"
                name="Obs"
                type="text"
                :value="fila.Obs"
                rows="5"
                @blur="checkUpdate($event)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <footer>
      <button @click="backToIndex">
        Cancelar
      </button>
      <button>
        Salvar
      </button>
    </footer>
  </div>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  name: 'Cadastro',
  data () {
    return {
      isFetching: false,
      fila: {},
      filaTemp: [],
      updatedData: {},
      allSetores: [
        [{ '5': 'JABAQUARA' }, { '6': 'CHUCRI ZAIDAN' }, { '7': 'MARGINAL PINHEIROS' }, { '8': 'BERRINI' }, { '9': 'BROOKLIN' }],
        [{ '1': 'HÉLIO PELLEGRINO' }, { '2': 'FARIA LIMA' }, { '3': 'PINHEIROS' }, { '4': 'OLIMPÍADAS' }],
        [{ '11': 'A' }, { '12': 'B' }, { '13': 'C' }, { '14': 'D' }, { '15': 'E' }],
        [{ '10': 'CENTRO' }]
      ],
      Setores: undefined
    }
  },
  asyncData: ({ params }) => axios.get(`/cepacs/api/fila/${params.id}`) // apontar get para `/filacepac/api/fila/${params.id}`
    .then((res) => { return { fila: res.data } })
    .catch((e) => { return { error: e } }),
  mounted () {
    this.setFilaTemp(this.fila)
    this.setSetores(this.fila.SetorObj.IdOperacaoUrbana)
  },
  methods: {
    backToIndex () {
      this.$router.push({ path: `/` })
    },
    getStatus (statusObj, inputValue) {
      if (statusObj.Id === inputValue) {
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
    checkUpdate (event) {
      const el = event.target // DOM element
      const field = el.name // "name" attribute
      const index = this.filaTemp.indexOf(this.filaTemp.filter((el) => { return el[0] === field })[0]) // position of the data inside the whole object
      const filaData = Object.entries(this.filaTemp)[index][1] // ex. [ "Data", 2003-01-01T00:00:00" ]
      if (el.value.toString() !== filaData[1].toString()) {
        el.parentNode.classList.add('updated')
      }
      else {
        el.parentNode.classList.remove('updated')
      }
    },
    checkStatusUpdate (event) {
      const el = event.target // DOM element
      const field = el.name // "name" attribute
      const index = this.filaTemp.indexOf(this.filaTemp.filter((el) => { return el[0] === field })[0]) // position of the data inside the whole object
      const filaData = Object.entries(this.filaTemp)[index][1] // ex. [ "Data", 2003-01-01T00:00:00" ]
      const selected = document.querySelector(`input[name=${field}]:checked`)
      if (parseInt(selected.value) !== filaData[1]) {
        el.parentNode.classList.add('updated')
        const toUpdate = Object.entries(this.updatedData).filter((key) => { return key[0] === field })[0]
        toUpdate[1] = selected.value
      }
      else {
        el.parentNode.classList.remove('updated')
      }
    },
    checkOUUpdate (event) {
      const el = event.target // DOM element
      const field = el.name // "name" attribute
      const ouId = this.filaTemp.filter((el) => { return el[0] === 'SetorObj' })[0][1].IdOperacaoUrbana
      const selected = document.querySelector(`input[name=${field}]:checked`) // input value
      if (parseInt(selected.value) !== ouId) {
        el.parentNode.classList.add('updated')
      }
      else {
        el.parentNode.classList.remove('updated')
      }
      this.setSetores(selected.value)
    },
    checkSetorUpdate (event) {
      const el = event.target // DOM element
      const field = el.name // "name" attribute
      const setorId = this.filaTemp.filter((el) => { return el[0] === field })[0][1]
      const selected = document.querySelector(`input[name=${field}]:checked`)
      if (parseInt(selected.value) !== setorId) {
        el.parentNode.classList.add('updated')
      }
      else {
        el.parentNode.classList.remove('updated')
      }
    },
    setFilaTemp (obj) {
      Object.entries(obj).filter((el) => {
        if (el[1] === null) {
          this.filaTemp.push([el[0], ''])
        }
        else {
          this.filaTemp.push(el)
        }
      })
      this.updatedData = obj
    },
    setSetores (IdOu) {
      this.Setores = this.allSetores[IdOu - 1]
      return Object.entries(this.Setores)
    }
  }
}
</script>
<style lang="scss">
div.cadastro {
  header {
    background-color: #005249;
    padding: 1rem 3.25rem;
    position: sticky;
    top: 0;
    z-index: 1;
    h2 {
      white-space: nowrap;
      font-size: 1rem;
      font-weight: normal;
      color: #FFF;
      span {
        display: inline-block;
        background-color: rgba(0, 0, 0, .24);
        padding: 0 0.75rem;
        margin-left: 0.25rem;
        min-width: 3rem;
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        border-radius: 0.5rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .48);
        vertical-align: middle;
        position: relative;
      }
    }
    button {
      margin: 0;
      padding: 0;
      border: none;
      background-color: transparent;
      font-family: inherit;
      color: #FFF;
      font-size: 0.75rem;
      text-transform: uppercase;
      cursor: pointer;
      opacity: 0.4;
      transition: all ease-out .1s;
      &:hover {
        opacity: 1;
      }
    }
  }
  form {
    background-color: #FFF;
    width: 100%;
    table {
      width: 100%;
      border-collapse: collapse;
      tbody tr {
        &:nth-child(2n) td {
          background-color: #F5F5F5;
        }
        td {
          padding: 1rem;
          position: relative;
          &:first-child {
            width: 12rem;
            padding-left: 3.25rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            color: #777;
            user-select: none;
            -moz-user-select: none;
          }
          &:nth-child(2) {
            padding-right: 3.25rem;
            &::before {
              content: '↻';
              position: absolute;
              left: -1rem;
              top: 49%;
              transform: translateY(-100%);
              color: #008375;
              font-size: 1.5rem;
              opacity: 0;
              transition: all ease-out .2s;
            }
            &.updated::before {
              opacity: 1;
              transform: translateY(-50%);
            }
            input, textarea {
              font-family: inherit;
              font-size: 1.25rem;
              padding: 0.25rem 0 0.5rem 0;
              background-color: transparent;
              border: none;
              border-bottom: 1px solid rgba(0, 0, 0, .12);
              transition: all ease-out .2s;
              &:focus {
                border-color: rgba(0, 0, 0, .64);
              }
              &[type="text"] {
                width: 100%;
                white-space: pre-line;
              }
              &[type="date"], &[type="time"] {
                margin: 0 1rem 0 0;
              }
              &[type="radio"] {
                display: none;
                & + label {
                  font-size: 1.25rem;
                  margin-right: 1rem;
                  color: #BDBDBD;
                  transition: color ease-out .1s;
                  cursor: pointer;
                }
                &:checked + label {
                  @keyframes blink {
                    0% { color: #008375; }
                    20% { color: #BDBDBD; }
                    40% { color: #008375; }
                    60% { color: #BDBDBD; }
                    80% { color: #000; }
                  }
                  color: #000;
                  animation: blink ease-in-out 0.75s;
                }
              }
            }
            textarea {
              border: 1px solid rgba(0, 0, 0, .12);
              padding: 0.25rem 0.75rem;
              line-height: 1.6;
              background-color: rgba(255, 255, 255, .4);
              border-radius: 0.25rem;
              width: 100%;
              height: 4.2rem;
              &#inputObs {
                height: unset;
              }
              resize: none;
            }
          }
          span.noEdit {
            font-size: 1.25rem;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  footer {
    background-color: #005249;
    padding: 1.75rem 3.25rem;
    text-align: center;
    button {
      &:first-child {
        margin-right: 3.25rem;
      }
      border: 0;
      padding: 1.25rem 1.5rem;
      background-color: rgba(255, 255, 255, .04);
      border-radius: 0.5rem;
      font-family: inherit;
      color: #FFF;
      font-size: initial;
      cursor: pointer;
      transition: all ease-out .2s;
      &:hover {
        background-color: #008375;
      }
    }
  }
}
</style>
