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
            <td class="updated">
              <input id="inputInteressado" type="text" :value="fila.Interessado">
            </td>
          </tr>
          <tr>
            <td>Situação</td>
            <td>
              <input id="status1" type="radio" name="status" value="1" :checked="getStatus(fila.Status, 1)">
              <label for="status1">Checklist</label>
              <input id="status2" type="radio" name="status" value="2" :checked="getStatus(fila.Status, 2)">
              <label for="status2">Em análise</label>
              <input id="status3" type="radio" name="status" value="3" :checked="getStatus(fila.Status, 3)">
              <label for="status3">Indeferido</label>
              <input id="status4" type="radio" name="status" value="4" :checked="getStatus(fila.Status, 4)">
              <label for="status4">Aprovado</label>
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputEmail">E-mail</label>
            </td>
            <td>
              <input id="inputEmail" type="text" :value="fila.Email">
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputTelefone">Telefone</label>
            </td>
            <td>
              <input id="inputTelefone" type="text" :value="fila.Telefone">
            </td>
          </tr>
          <tr v-if="fila.Procurador">
            <td>
              <label for="inputProcurador">Procurador</label>
            </td>
            <td>
              <input id="inputProcurador" type="text" :value="fila.Procurador">
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputData">Data de criação</label>
            </td>
            <td>
              <input id="inputData" type="date" :value="fila.Data.substring(0, 10)">
              <input id="inputHora" type="time" :value="fila.Data.substring(11, 20)">
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputSei">SEI</label>
            </td>
            <td>
              <input id="inputSei" type="text" :value="fila.Sei">
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCertidao">Certidão</label>
            </td>
            <td>
              <input id="inputCertidao" type="text" :value="fila.Certidao">
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputLicenciamento">Licenciamento</label>
            </td>
            <td>
              <input id="inputLicenciamento" type="text" :value="fila.Licenciamento">
            </td>
          </tr>
          <tr>
            <td>Operação Urbana</td>
            <td>
              <input id="operacaoUrbana1" type="radio" name="operacaoUrbana" value="1" checked>
              <label for="operacaoUrbana1">Água Branca</label>
              <input id="operacaoUrbana2" type="radio" name="operacaoUrbana" value="2">
              <label for="operacaoUrbana2">Água Espraiada</label>
              <input id="operacaoUrbana3" type="radio" name="operacaoUrbana" value="3">
              <label for="operacaoUrbana3">Faria Lima</label>
              <input id="operacaoUrbana4" type="radio" name="operacaoUrbana" value="4">
              <label for="operacaoUrbana4">Centro</label>
            </td>
          </tr>
          <tr>
            <td>Setor</td>
            <td>lista de stores filtrada por operaçao</td>
          </tr>
          <tr>
            <td>Subsetor</td>
            <td>lista de substores filtrada por setor</td>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdResidencial">Área Adicional (residencial)</label>
            </td>
            <td>
              <input id="inputAreaAdResidencial" type="number" :value="fila.AreaAdResidencial" step="0.01" min="0">
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputAreaAdNaoResidencial">Área Adicional (não residencial)</label>
            </td>
            <td>
              <input id="inputAreaAdNaoResidencial" type="number" :value="fila.AreaAdNaoResidencial" step="0.01" min="0">
            </td>
          </tr>
          <tr>
            <td>CEPAC - Objeto</td>
            <td>
              validar tipo de dado
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCepacAreaAdicional">CEPAC - Área Adicional</label>
            </td>
            <td>
              <input id="inputCepacAreaAdicional" type="number" :value="fila.CepacAreaAdicional" step="0.01" min="0">
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputCepacModUso">CEPAC - Modo de uso</label>
            </td>
            <td>
              <input id="inputCepacModUso" type="number" :value="fila.CepacModUso" step="1" min="0">
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <footer>
      <button>Cancelar</button>
      <button>Salvar</button>
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
      fila: {}
    }
  },
  asyncData: ({ params }) => axios.get(`/filacepac/api/fila/${params.id}`)
    .then((res) => { return { fila: res.data } })
    .catch((e) => { return { error: e } }),
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
    }
  }
}
</script>
<style lang="scss">
div.cadastro {
  header {
    background-color: #005249;
    padding: 1rem 3.25rem;
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
              top: 50%;
              transform: translateY(-50%);
              color: #008375;
              font-size: 1.5rem;
              opacity: 0;
              transition: opacity ease-out .2s;
            }
            &.updated::before {
              opacity: 1;
            }
            input {
              font-family: inherit;
              font-size: 1.25rem;
              padding: 0.25rem 0 0.5rem 0;
              background-color: transparent;
              border: none;
              border-bottom: 1px solid rgba(0, 0, 0, .12);
              transition: all ease-out .2s;
              &:focus {
                border-bottom-color: rgba(0, 0, 0, .64);
              }
              &[type="text"] {
                width: 100%;
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
