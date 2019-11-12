<template>
  <div class="criar">
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
            <td>
              <input
                id="inputInteressado"
                v-model="Interessado"
                name="Interessado"
                type="text"
              >
            </td>
          </tr>
          <tr>
            <td>Situação</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputEmail">E-mail</label>
            </td>
            <td>
              <input
                id="inputEmail"
                v-model="Email"
                name="Email"
                type="email"
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
                v-model="Telefone"
                name="Telefone"
                type="text"
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
                v-model="Procurador"
                name="Procurador"
                type="text"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="inputSei">SEI</label>
            </td>
            <td>
              <textarea
                id="inputSei"
                v-model="Sei"
                name="Sei"
                rows="1"
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
                v-model="Certidao"
                name="Certidao"
                rows="1"
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
                v-model="Licenciamento"
                name="Licenciamento"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td>Operação Urbana</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td v-if="ouc!==''">
              Setor
            </td>
            <td>
              <template v-for="(setor, index) in Setores">
                <input
                  :id="`setor_${setor.id}`"
                  :value="setor.id"
                  :name="setor.nome"
                  :key="index + 1000"
                  v-model="IdSetor"
                  type="radio"
                >
                <label :for="`setor_${setor.id}`" :key="index + 100">{{ setor.nome }}</label>
              </template>
            </td>
          </tr>
          <tr>
            <td>SubSetor</td>
            <td>
              <input
                id="inputSubSetor"
                v-model="SubSetor"
                name="SubSetor"
                type="text"
              >
            </td>
          </tr>
          <tr>
            <td>Endereço</td>
            <td>
              <textarea
                id="inputEndereco"
                v-model="Endereco"
                name="Endereco"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td>Área do Terreno</td>
            <td>
              <input
                id="inputAreaTerreno"
                v-model="AreaTerreno"
                name="AreaTerreno"
                type="text"
              >
            </td>
          </tr>
          <tr>
            <td>Zona</td>
            <td>
              <input
                id="inputZona"
                v-model="Zona"
                name="Zona"
                type="text"
              >
            </td>
          </tr>
          <tr>
            <td>Uso</td>
            <td>
              <input
                id="inputUso"
                v-model="Uso"
                name="Uso"
                type="text"
              >
            </td>
          </tr>
          <tr>
            <td>C.A. do Projeto</td>
            <td>
              <input
                id="inputCAProjeto"
                v-model="CAProjeto"
                name="CAProjeto"
                type="text"
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
                v-model="AreaAdResidencial"
                name="AreaAdResidencial"
                type="number"
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
                v-model="AreaAdNaoResidencial"
                name="AreaAdNaoResidencial"
                type="number"
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
                v-model="CepacObjeto"
                name="CepacObjeto"
                type="number"
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
                v-model="CepacAreaAdicional"
                name="CepacAreaAdicional"
                type="number"
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
                v-model="CepacModUso"
                name="CepacModUso"
                type="number"
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
                v-model="CodigoProposta"
                name="CodigoProposta"
                type="text"
              >
            </td>
          </tr>
          <tr>
            <td>Observações</td>
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
    <footer>
      <button @click.prevent="$router.push('/')">
        Cancelar
      </button>
      <button @click.prevent="novaFila">
        Salvar
      </button>
    </footer>
  </div>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  name: 'Criar',
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
        '1': 'Setor um',
        '2': 'Setor dois',
        '3': 'Setor três',
        '4': 'Setor quatro',
        '5': 'Setor cinco',
        '6': 'Setor seis',
        '7': 'Setor sete',
        '8': 'Setor Oito'
      },
      mapOucSetores: {
        oucab: [ '1', '2' ],
        oucfl: [ '3', '4' ],
        oucae: [ '5', '6', '7' ],
        oucc: [ '8' ]
      },
      ouc: '',
      Setores: []
    }
  },
  watch: {
    ouc (key) {
      this.Setores = this.mapOucSetores[key].map((id) => {
        return {
          id,
          nome: this.mapSetores[id]
        }
      })
    }
  },
  methods: {
    novaFila () {
      axios.post('fila', {
        AreaAdNaoResidencial: this.AreaAdNaoResidencial,
        CepacAreaAdicional: this.CepacAreaAdicional,
        CepacModUso: this.CepacModUso,
        Email: this.Email,
        Telefone: this.Telefone,
        Procurador: this.Procurador,
        CepacObjeto: this.CepacObjeto,
        Endereco: this.Endereco,
        AreaTerreno: this.AreaTerreno,
        Zona: this.Zona,
        Uso: this.Uso,
        CAProjeto: this.CAProjeto,
        Obs: this.Obs,
        CodigoProposta: this.CodigoProposta,
        UsuarioAlteracao: this.UsuarioAlteracao,
        IdStatus: this.IdStatus,
        IdSetor: this.IdSetor
      })
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/formCadastro.scss';
</style>
